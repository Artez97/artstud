import { defineStore } from "pinia";

export const useEventsStore = defineStore({
    id: "events",
    state: () => ({
        events: [],
    }),
    actions: {
        addEvent(event) {
            this.events.push(event);
        },
        removeEvent(index) {
            this.events.splice(index, 1);
        },
    },
});