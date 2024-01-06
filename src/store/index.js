import { fetchEventsAPI } from "@/api/index.js";
import { createStore } from "vuex";

export default createStore({
  state: {
    events: [],
  },
  mutations: {
    // Mutations are responsible for changing the state
    getEvents(event) {},
    setEvents(events) {
      this.events = events;
    },
  },
  actions: {
    async fetchEvents({ commit }) {
      try {
        const events = await fetchEventsAPI();
        commit("setUsers", events);
      } catch (error) {
        console.error(error);
        commit("setError", "Error fetching users");
      }
    },
  },
  getters: {
    /**
     * Retrieves a copy of the users from the state and sets the existTime property to 3 for each user.
     *
     * @param {object} state - The state object containing the users.
     * @return {array} An array of user objects with the existTime property set to 3.
     */
    getUsers: (state) => {
      let users = state.users.map((user) => ({ ...user }));
      users.forEach((user) => {
        user.existTime = 3;
      });

      return users;
    },
    getError: (state) => state.error,
  },
  modules: {
    // your modules here
  },
});
