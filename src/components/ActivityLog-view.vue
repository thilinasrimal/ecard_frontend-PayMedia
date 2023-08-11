<template>
  <div class="container" style="display: flex; flex-direction: column">
    <div class="table-container">
      <div class="header" style="display: flex; margin-bottom: 20px">
        <h2>List of Activities</h2>

        <div class="datepicker">
          <b-field label="Select a Date Range" class="field">

            <b-datepicker
              placeholder="YYYY/MM/DD-YYYY/MM/DD"
              v-model="dates"
              range>
            </b-datepicker>
          </b-field>
          <b-button class="btn-outline-dark" @click="clearDateRange" >RESET</b-button>
        </div>

      </div>

      <div class="table-container">
        <table class="table table-striped" style="align-content: center" >
          <thead>
          <tr>
            <th scope="col" >Description</th>
            <th scope="col" >Company</th>
            <th scope="col" >User</th>
            <th scope="col" >Timestamp</th>
          </tr>
          </thead>
          <tbody style="font-size: small">
          <tr v-for="activity in filteredActivity" :key="activity.id" >

            <td>{{ activity.description }}</td>
            <td>{{ activity.company_active }}</td>
            <td>{{ activity.user }}</td>
            <td>{{ activity.timeStamp }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ActivityLog from "../utils/ActivityLog";
import axios from "axios";
import {appSettings} from "../appsettings";
import en from "vue-upload-component/docs/i18n/en";
export default {

  name: "ActivityLog-view",
  data() {
    return {
      value: '',
      dates: [],
      activities:[],

    }
  },

  computed: {
    filteredActivity: function() {
      if (this.dates.length === 0) {
        return this.activities;
      }

      return this.activities.filter(activity => {
        const activityDate = new Date(activity.timeStamp);
        const startDate = new Date(this.dates[0]);
        const endDate = new Date(this.dates[1]);

        return activityDate >= startDate && activityDate <= endDate;
      });
    }
  },

  methods: {
    loadData: function () {
      axios.get(appSettings.$api_url + '/api/Activity/list')
        .then((response) => {
          // console.log('activities',response)
          if (response.status === 200) {
            this.activities = response.data.data.activities
          }
        })
    },

    clearDateRange() {
      this.dates = [];
    }
  },

  components: {ActivityLog},

  mounted() {
    this.loadData();
  },
}
</script>

<style scoped>
.header h2 {
  margin-right: 40rem;
  font-family: 'Century Gothic';
  font-weight: 700;
  color: #393953;
  font-size: 30px
}

.field{
  display: flex;
  flex-direction: column;
  width: 16rem;
  margin-left: -12rem;
}

.btn-outline-dark{
  border-radius: 45px;
  border-color: #1E1E1E;
  color: #1E1E1E;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
}

.btn-outline-dark:hover{
  background-color: #fdb8be;
}

th{
  color: #A7A9AC;
  font-weight: 600;
  font-size: 18px;
}

td{
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
}

</style>
