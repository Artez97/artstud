<template>
    <form @submit.prevent="addEvent" class="event-form">
        <input type="text" v-model="title" placeholder="Title" required>
        <input type="text" v-model="description" placeholder="Description">
        <button type="submit" class="add-button">Add Event</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useEventsStore } from '~/store/events';

const title = ref('');
const description = ref('');
const eventsStore = useEventsStore();

const addEvent = () => {
    eventsStore.addEvent({ title: title.value, description: description.value, day: props.day });
    title.value = '';
    description.value = '';
};
</script>

<style scoped>
.add-button {
    background-color: #2196F3;
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

.add-button:hover {
    background-color: #0b7dda;
}

.event-form {
    margin-top: 10px;
}
</style>