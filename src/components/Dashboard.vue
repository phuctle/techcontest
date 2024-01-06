<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" class="dialog__open" v-bind="props">
          Add Event
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Events</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Event title"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Promotion message"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div>Start Date</div>
                <input type="date" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div>Start End</div>
                <input type="date" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div>Registration Start Date Time</div>
                <input type="date" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div>Registration End Date Time</div>
                <input type="date" />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Add item"
                  persistent-hint
                  required
                ></v-text-field>
                <v-btn color="blue-darken-1" variant="text" @click="addItem">
                  Add item
                </v-btn>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Number of serving items"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump',
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <div class="list-events">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Event title</th>
          <th class="text-left">Promotion Message</th>
          <th class="text-left">Registration Start Date Time</th>
          <th class="text-left">Registration End Date Time</th>
          <th class="text-left">Start Date Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in events" :key="item.name">
          <td>{{ item.Title }}</td>
          <td>{{ item.PromotionMessage }}</td>
          <td>
            {{
              moment(item.RegistrationStartDateTime).format("MM/DD/YYYY HH:mm")
            }}
          </td>
          <td>
            {{
              moment(item.RegistrationEndDateTime).format("MM/DD/YYYY HH:mm")
            }}
          </td>
          <td>{{ moment(item.StartDateTime).format("MM/DD/YYYY HH:mm") }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script setup>
import moment from "moment";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const events = computed(() => store.getters.events);

const initialState = {
  name: "",
  email: "",
  select: null,
  checkbox: null,
  dialog: false,
  newEvent: {
    Title: "",
  },
};

const dialog = ref(false);

const state = reactive({
  ...initialState,
});

const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
const desserts = [
  {
    name: "Frozen Yogurt",
    calories: 159,
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
  },
  {
    name: "Eclair",
    calories: 262,
  },
  {
    name: "Cupcake",
    calories: 305,
  },
  {
    name: "Gingerbread",
    calories: 356,
  },
  {
    name: "Jelly bean",
    calories: 375,
  },
  {
    name: "Lollipop",
    calories: 392,
  },
  {
    name: "Honeycomb",
    calories: 408,
  },
  {
    name: "Donut",
    calories: 452,
  },
  {
    name: "KitKat",
    calories: 518,
  },
];

function clear() {
  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}

function submit() {
  console.log("submit");
}
</script>

<style lang="scss" scoped>
.dialog {
  &__open {
    margin-top: 10px;
  }
}

.list-events {
  margin-top: 30px;
}
</style>
