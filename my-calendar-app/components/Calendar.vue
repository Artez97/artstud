<template>
    <div class="calendar">
        <button @click="prevMonth" class="nav-button">Prev</button>
        <h1>{{ formattedMonth }}</h1>
        <button @click="nextMonth" class="nav-button">Next</button>

        <!-- Calendar days -->
        <transition-group name="fade" tag="div" class="calendar-days">
            <!-- Loop through days of the month -->
            <div v-for="day in daysInMonth" :key="day" class="calendar-day">
                {{ day }}
                <!-- Display events for the day -->
                <ul>
                    <li v-for="(event, index) in getEventsForDay(day)" :key="index" class="event-item">
                        {{ event.title }}
                        <button @click="removeEvent(day, index)" class="remove-button">Remove</button>
                    </li>
                </ul>
                <!-- Form for adding new event -->
                <EventForm :day="day" />
            </div>
        </transition-group>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useEventsStore } from '~/store/events';
import EventForm from '~/components/EventForm.vue';

const eventsStore = useEventsStore();

const currentMonth = new Date();
const daysInMonth = getDaysInMonth(currentMonth);

function getDaysInMonth(date) {
    const days = [];
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
        days.push(i);
    }
    return days;
}

function getEventsForDay(day) {
    return eventsStore.events.filter(event => event.day === day);
}

function prevMonth() {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
}

function nextMonth() {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
}

</script>

<style scoped>
.calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.nav-button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.nav-button:hover {
    background-color: #45a049;
}

.calendar-days {
    display: flex;
    flex-wrap: wrap;
}

.calendar-day {
    width: 120px;
    height: 120px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    margin: 5px;
}

.event-item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.remove-button {
    background-color: #f44336;
    border: none;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.3s;
}

.remove-button:hover {
    background-color: #d32f2f;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>