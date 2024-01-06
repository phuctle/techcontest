<template>
  <!-- <input type="text" v-model="state.event" /> -->
  <p>
    Would you like to register for the AppOurs event this time? Your credit
    score will be deducted if you register but do not attend.
  </p>
  <v-btn color="blue-darken-1" variant="text" @click="submit"> Submit </v-btn>
</template>

<script setup>
import { computed, reactive } from "vue";

import { useStore } from "vuex";

const store = useStore();
const events = computed(() => store.getters["events"]);
const pushRegistrationAPI = (payload) =>
  store.dispatch("pushRegistrationAPI", payload);

console.log("events", events);
const initialState = {
  event: "",
};

const state = reactive({
  ...initialState,
});

function submit() {
  console.log("submit");
  pushRegistrationAPI({ email: "user1@appyours.com", id: "1" });
}
</script>

<style lang="scss" scoped></style>
