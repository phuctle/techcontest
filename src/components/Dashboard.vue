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
                <v-text-field
                  v-model="state.newEvent.Title"
                  label="Event title"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Promotion message"
                  persistent-hint
                  required
                  v-model="state.newEvent.PromotionMessage"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div>Start Date</div>
                <input
                  type="datetime-local"
                  v-model="state.newEvent.StartDateTime"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div>Start End</div>
                <input
                  type="datetime-local"
                  v-model="state.newEvent.EndDateTime"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div>Registration Start Date Time</div>
                <input
                  type="datetime-local"
                  v-model="state.newEvent.RegistrationStartDateTime"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div>Registration End Date Time</div>
                <input
                  type="datetime-local"
                  v-model="state.newEvent.RegistrationEndDateTime"
                />
              </v-col>

              <v-col cols="12"> List Item </v-col>
              <template v-for="item in state.newEvent.items">
                <v-col cols="12" sm="6" md="4">
                  <p>{{ item.description }}</p>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <img width="100px" :src="item.imageURL" />
                </v-col>
              </template>
              <v-col cols="12">
                <v-dialog v-model="dialog2" persistent width="1024">
                  <template v-slot:activator="{ props }">
                    <v-btn color="primary" class="dialog__open" v-bind="props">
                      Add Event
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Add Item</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="state.description"
                              label="Descriptions"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="state.imageURL"
                              label="Image URL"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="dialog2 = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="addItem"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="submit">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <!-- <v-col cols="12" sm="6">
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
  </v-col> -->

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
    PromotionMessage: "",
    StartDateTime: "",
    EndDateTime: "",
    RegistrationStartDateTime: "",
    RegistrationEndDateTime: "",
    items: [],
  },
  description: "",
  imageURL:
    "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
};

const dialog = ref(false);
const dialog2 = ref(false);

const state = reactive({
  ...initialState,
});

const save = (payload) => store.dispatch("createEventsAPI", payload);
const fetchEvents = () => store.dispatch("fetchEvents");

async function submit() {
  dialog.value = false;
  await save(state.newEvent);
  fetchEvents();
}

function addItem() {
  dialog2.value = false;
  state.newEvent.items.push({
    description: state.description,
    imageURL: state.imageURL,
  });
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
