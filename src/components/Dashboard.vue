<template>
  <div class="container-card" style="display: flex; justify-content: space-between; flex-direction: column">
    <div class="dashboard" v-show="dashboardActive">
      <div class="first-card">
        <div class="content" style="width: 50%">
          <h1 style="margin-bottom: 10px; font-family: 'Century Gothic'; color: #393953">Create New Company</h1>
          <p style="">Streamline your business contacts with our E-card platform. Create a<br/>
            company profile, connect with colleagues, customers, and prospects, and<br/>
            easily manage your network as you grow your business.</p>
          <button class="btn-outline-dark" @click="createCompany">CREATE COMPANY</button>
        </div>

        <div class="background-image" style="width: 50%">
          <img src="../assets/Images/Group 289355.png" height="auto" width="320"/>
          <img src="../assets/Images/dds.png" height="auto" width="620" />
        </div>
      </div>

      <div class="activity" style="margin-top: 20px">
        <h2>Recent Activities</h2>
        <table class="table table-striped" style="align-content: center">
          <thead>
          <tr>
            <th scope="col" style="color: #A7A9AC; font-family: 'Roboto', sans-serif; ">Description</th>
            <th scope="col" style="color: #A7A9AC; font-family: 'Roboto', sans-serif;">Company</th>
            <th scope="col" style="color: #A7A9AC; font-family: 'Roboto', sans-serif;">User</th>
            <th scope="col" style="color: #A7A9AC; font-family: 'Roboto', sans-serif;">Timestamp</th>
          </tr>
          </thead>
          <tbody style="font-size: small">
          <tr v-for="activity in activities">
            <td>{{ activity.description }}</td>
            <td>{{ activity.company_active }}</td>
            <td>{{ activity.user }}</td>
            <td>{{ activity.timeStamp }}</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>

    <CompanyCreate v-show="createCompanyActive" @goToDashboard="closeCreate"></CompanyCreate>
  </div>
</template>

<script>
import CompanyCreate from "./Company-Create.vue";
import axios from "axios";
import {appSettings} from "../appsettings";

export default {
  name: "Dashboard",
  data(){
    return{
      createCompanyActive:false,
      dashboardActive:true,
      activities: [],
    }
  },

  computed: {
    filteredActivity: function() {

      return this.activities.filter(activity => {
        const activityDate = new Date(activity.timeStamp);

        const startDate = new Date().toLocaleString();
        const endDate = '5/7/2023, 11:55:43 AM';

        return activityDate >= startDate && activityDate <= endDate;
      });
    }
  },

  components:{
    CompanyCreate,
  },
  methods:{
    createCompany() {
      this.dashboardActive=false
      this.createCompanyActive=true;
    },
    closeCreate(){
      this.createCompanyActive=false;
      this.dashboardActive=true;
    },

    loadData: function () {
      axios.get(appSettings.$api_url + '/api/Activity/list')
        .then((response) => {
          if (response.status === 200) {
            this.activities = response.data.data.activities
          }
        })
    },
  },

  mounted() {
    this.loadData();
  }
}
</script>

<style scoped>

.first-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.container-card h1 {
  color: black;
  font-size: 2rem;
  font-weight: bold;
}

.btn-outline-dark {
  font-size: 1rem;
  border-radius: 12px;
  padding: 0.5rem;
  margin-top: 2rem;
  font-weight: 500;
  background: #1E1E1E;
  color: #FFFFFF;
  display: flex;
  padding-inline: 20px;
  border-color: #1E1E1E;
}

th{
  font-size: 18px;
  font-weight: 600;
}

td{
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

.content p{
  font-size: small;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

.btn-outline-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}


.activity h2{
  font-size: 22px;
  font-family: 'Century Gothic';
  color: #393953;
  font-weight: 700;
}


</style>
