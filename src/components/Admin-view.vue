<template>
  <div class="wrapper">
    <!-- Sidebar  -->
    <div class="sidebar" :class="{ 'sidebar-visible': sidebarVisible }">
      <nav id="sidebar">
        <div class="sidebar-logo" style="margin-top: 53px; margin-bottom: 61px; margin-left: 10%;}">
          <h3><img src="../assets/PayMediaLogo.png" height="auto" width="120"/></h3>
        </div>


        <div class="tabs" style="display: flex; flex-direction: column">
          <ul class="tab-list">
            <li  v-if="user_type==='ADMIN'" :class="{ active: activeTab === 'dashboard' }" @click="changeTab('dashboard')" style="display:flex;
                                                                                                          flex-direction: row;
                                                                                                          justify-content: flex-start;
                                                                                                          align-items: center;">
              <span style="padding-right: 2px"><img src="../assets/Icon/dashboard.png" height="21" width="21"/></span>
              <a class="tab-link" @click="dashboard">Dashboard</a>
            </li>
            <li v-if="user_type==='ADMIN'"  :class="{ active: activeTab === 'company' }" @click="changeTab('company')" style="display:flex;
                                                                                                          flex-direction: row;
                                                                                                          justify-content: flex-start;
                                                                                                          align-items: center;">
              <span><img src="../assets/Icon/companies.png" height="25" width="25"/></span>
              <a class="tab-link" @click="company">Companies</a>
            </li>
            <li :class="{ active: activeTab === 'creatorView' }" @click="changeTab('creatorView')" style="display:flex;
                                                                                                          flex-direction: row;
                                                                                                          justify-content: flex-start;
                                                                                                          align-items: center;">
              <span><img src="../assets/Icon/creator.png" height="25" width="25"/></span>
              <a class="tab-link" @click="creatorView">Creators</a>
            </li>
            <li :class="{ active: activeTab === 'viewerView' }" @click="changeTab('viewerView')" style="display:flex;
                                                                                                          flex-direction: row;
                                                                                                          justify-content: flex-start;
                                                                                                          align-items: center;">
              <span><img src="../assets/Icon/viewer.png" height="25" width="25"/></span>
              <a class="tab-link" @click="viewerView">Viewers</a>
            </li>
            <li v-if="user_type==='ADMIN'" :class="{ active: activeTab === 'activityLogView' }" @click="changeTab('activityLogView')" style="display:flex;
                                                                                                          flex-direction: row;
                                                                                                          justify-content: flex-start;
                                                                                                          align-items: center;">
              <span><img src="../assets/Icon/activitylog.png" height="25" width="25"/></span>
              <a class="tab-link" @click="activityLogView">Activity Log</a>
            </li>
          </ul>
        </div>

        <div class="sideImage">
          <img src="../assets/BackPic.png" height="auto" class="sideBarImage"/>
          <p>Copyright ©2023 PayMedia. All Rights Reserved</p>
        </div>
      </nav>
    </div>


    <!-- Page Content  -->
    <div id="content">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">

          <a style="font-size: xx-large; font-family: 'Century Gothic'; color: #393953; pointer-events: none"
             v-show="dashboardActive"><b>{{ Header }}</b></a>
          <a style="font-size: xx-large; font-family: 'Century Gothic'; color: #393953; pointer-events: none"
             v-show="companyActive"><b>{{ Header1 }}</b></a>
          <a style="font-size: xx-large; font-family: 'Century Gothic'; color: #393953; pointer-events: none"
             v-show="creatorViewActive"><b>{{ Header2 }}</b></a>
          <a style="font-size: xx-large; font-family: 'Century Gothic'; color: #393953; pointer-events: none"
             v-show="viewerViewActive"><b>{{ Header3 }}</b></a>
          <a style="font-size: xx-large; font-family: 'Century Gothic'; color: #393953; pointer-events: none"
             v-show="activityLogViewActive"><b>{{ Header4 }}</b></a>

          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav ml-auto">
<!--              <div class="search" id="filter_global" style="margin-right: 40px; margin-top: 5px">-->
<!--                <b-field>-->
<!--                  <b-input placeholder="Search..."-->
<!--                           type="search"-->
<!--                           icon="magnify">-->
<!--                  </b-input>-->
<!--                </b-field>-->
<!--              </div>-->

              <div class="notifications" style="margin-right: 40px; margin-top: 10px">
                <img src="../assets/Icon/notification.png" height="auto" width="29px" alt="">
              </div>

              <div class="avatar" style="display: flex;">
                <img class="avatar-img" src="../assets/Images/user.png"
                     style="margin-right: 20px; border-color: #1E1E1E; border-radius: 25px" height="auto" width="50px">
                <p style="font-weight:600; font-family:'Roboto', sans-serif;">{{ $props.userName }}</p>
                <b-button @click="goHome" type="button" class="btn is-lite"><span id="span"
                                                                                  style="margin-right: 4px;"><img
                  src="../assets/logout.png" class="logout-png" alt=""/></span><strong>LOGOUT</strong>
                </b-button>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <div class="card">
        <div class="container">
          <Dashboard v-show="dashboardActive"></Dashboard>
          <CompaniesView v-show="companyActive"></CompaniesView>
          <CreatorsView v-show="creatorViewActive"></CreatorsView>
          <ViewersView v-show="viewerViewActive"></ViewersView>
          <ActivityLogView v-show="activityLogViewActive"></ActivityLogView>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import Dashboard from "./Dashboard.vue";
import CompaniesView from "./Companies-view.vue";
import CreatorsView from "./Creators-view.vue";
import ViewersView from "./Viewers-view.vue";
import ActivityLogView from "./ActivityLog-view.vue";
import CompanyCreate from "./Company-Create.vue";


export default {
  name: "Admin-view",
  props: {
    userName: {
      type: String,
    },
    user:{
      type:String,
    }
  },
  components: {CompanyCreate, ActivityLogView, ViewersView, CreatorsView, CompaniesView, Dashboard},
  data() {
    return {
      Header: 'Dashboard',
      Header1: 'Companies',
      Header2: 'Creators',
      Header3: 'Viewers',
      Header4: 'Activity Logs',
      activeTab: 'dashboard',
      dashboardActive: false,
      companyActive: false,
      creatorViewActive: false,
      viewerViewActive: false,
      activityLogViewActive: false,
      sidebarVisible: true,
      user_type:'',
      user_name:'',
    }
  },


  methods: {

    goHome: function () {
      this.$router.push('/')
    },
    dashboard() {
      this.dashboardActive = true;
      this.companyActive = false;
      this.creatorViewActive = false;
      this.viewerViewActive = false;
      this.activityLogViewActive = false;
    },
    company() {
      this.dashboardActive = false;
      this.companyActive = true;
      this.creatorViewActive = false;
      this.viewerViewActive = false;
      this.activityLogViewActive = false;
    },
    creatorView() {
      this.dashboardActive = false;
      this.companyActive = false;
      this.creatorViewActive = true;
      this.viewerViewActive = false;
      this.activityLogViewActive = false;
    },
    viewerView() {
      this.dashboardActive = false;
      this.companyActive = false;
      this.creatorViewActive = false;
      this.viewerViewActive = true;
      this.activityLogViewActive = false;
    },
    activityLogView() {
      this.dashboardActive = false;
      this.companyActive = false;
      this.creatorViewActive = false;
      this.viewerViewActive = false;
      this.activityLogViewActive = true;
    },
    changeTab(tabName) {
      this.activeTab = tabName;
    },
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },

    checkWindowWidth() {
      this.sidebarVisible = window.innerWidth > 360;
    },

    tabControl(){
      this.user_type = this.user
      console.log(this.user_type)
    }
  },


  mounted() {
    this.dashboard();
    this.checkWindowWidth();
    this.tabControl();
    window.addEventListener("resize", this.checkWindowWidth);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.checkWindowWidth);
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Proza+Libre');

/* ---------------------------------------------------
    DASHBOARD STYLE
----------------------------------------------------- */
.tab-list {
  display: flex;
  list-style: none;
  padding: 2px;
  flex-direction: column;
  align-items: flex-start;
}

.tab-list li {
  text-align: center;
  width: 14.5rem;
}

.tab-link {
  display: block;
  padding: 10px;
  background-color: #f3fcf9;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
}

.tab-list li.active .tab-link {
  background-color: rgba(217, 248, 248, 0.73);
  font-weight: bold;
}

.sidebar-visible {
  display: block;
}

.sideBarImage {
  width: 760px;
}

/* Responsive Styles */
.tab-list {
  flex-wrap: wrap;
}

.tab-list li {
  flex: 0 0 50%;
}

/*---------------------------------------------------*/
body {

}

.sideImage p {
  font-size: 12px;
  font-weight: 300;
  line-height: 1.5em;
  color: #393953;
  font-family: 'Roboto', sans-serif;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}


.list a {
  color: black;
  font-weight: bold;
}

.avatar p {
  margin-top: 14px;
  font-family: 'Roboto', sans-serif;
  color: #393953;
  font-weight: 500;
}

li:hover,
li:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.navbar {
  padding: 15px 10px;
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.btn {
  font-size: 15px;
  margin-left: 2rem;
  padding-top: 0;
  padding-bottom: 0;
  height: 2.5rem;
  margin-top: 0.3rem;
}

.logout-png {
  height: auto;
  width: 16px;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
  margin: 10px;
}

#sidebar {
  min-width: 250px;
  max-width: 260px;
  transition: all 0.3s;
  overflow: hidden;
  background: ghostwhite;
}

#sidebar #sidebar-header {
  padding: 20px;
  padding-inline: 30px;
}

#sidebar ul p {
  color: #050505;
  padding: 10px;
}

#sidebar ul li a {
  margin-top: 5px;
  font-size: 1rem;
  width: 100%;
  text-align: left;
}

#sidebar ul li:hover {
  color: rgb(7, 7, 7);
  background: #eff6f5;
  font-weight: bold;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.card {
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background: white;
  margin-bottom: 2rem;
  overflow: hidden;
}

.title b {
  font-size: xx-large;
  font-family: "Century Gothic";
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* ---------------------------------------------------
    MEDIA QUERIES
----------------------------------------------------- */

@media (max-width: 360px) {

  #sidebar {
    display: none;
  }

  .toggle-button {
    width: 3rem;
  }


  #content {
    width: 100%;
    padding-left: 10px;
  }
}

</style>
