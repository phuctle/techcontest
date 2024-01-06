<template>
  <Dashboard />
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Dashboard from "@/components/Dashboard.vue";
export default {
  name: "DashboardView",
  components: {
    Dashboard,
  },
  methods: {
    ...mapActions(["fetchEvents"]),
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>
