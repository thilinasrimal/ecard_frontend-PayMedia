<template>
  <div class="container">
    <div class="header" style="display: flex; align-items: center;">
      <b-button class="button" @click="backto" >
        <img src="../assets/Icon/back button.png" height="53" width="103"/>
      </b-button>
      <h2 style="margin-left: 3rem; margin-right: 45rem; margin-top: 10px" >Add New Viewer</h2>
    </div>

    <div style="margin-top: 2rem">
      <h3 class="company_header" style="margin-bottom: 1rem"><b>Creator Company<a class="has-text-danger"> *</a></b></h3>
      <div>
        <drop-down @company-selected="handleCompanySelected"  ></drop-down>
      </div>
    </div>

    <div class="form" style="margin-top: 4rem">
      <form>
        <h3 style="margin-bottom: 1rem"><b>Viewer Details</b></h3>
        <div class="company" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Employee No.<a class="has-text-danger"> *</a></p>
            <b-input class="EmpNo" @input="updateViewerEmpNo" v-model="viewer_emp_no"></b-input>
          </div>
          <div style="width: 50%">
            <p>Designation<a class="has-text-danger"> *</a></p>
            <b-input class="designation" @input="updateViewerDesignation" v-model="viewer_designation"></b-input>
          </div>
        </div>

        <div class="contact" style="display: flex; flex-direction: row; margin-top: 1rem">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Name<a class="has-text-danger"> *</a></p>
            <b-input class="name" @input="updateViewerName" v-model="viewer_name"></b-input>
            <span v-if="!isValidName" class="error-message">Please enter a valid type of data.</span>
          </div>
          <div style="width: 25%; margin-right: 0.5rem">
            <p>Username<a class="has-text-danger"> *</a></p>
            <b-input class="username" @input="updateViewerUsername" v-model="viewer_username"></b-input>

          </div>
          <div style="width: 25%;">
            <p>Password<a class="has-text-danger"> *</a></p>
            <div style="display: flex; flex-direction: row">
              <b-input class="username" readonly @input="updateViewerPassword" v-model="viewer_password" style="width: 60%;"></b-input>
              <button class="generate-btn" type="button" style=" width: 40% "
                      @click="generatePassword">Generate
              </button>
            </div>
          </div>
        </div>
        <div class="contact" style="display: flex; flex-direction: row; margin-top: 1rem">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Contact Number<a class="has-text-danger"> *</a></p>
            <b-input class="contactNo" @input="updateViewerContactNo" v-model="viewer_contact_no"></b-input>
            <span v-if="!isValidContactNo" class="error-message">Please enter a valid Mobile Number</span>
          </div>
          <div style="width: 50%">
            <p>Email<a class="has-text-danger"> *</a></p>
            <b-input class="email" @input="updateViewerEmail" v-model="viewer_email"></b-input>
            <span v-if="!isValidEmail" class="error-message">Please enter a valid email address.</span>
          </div>
        </div>

        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Permissions<a class="has-text-danger"> *</a></b></h3>
        <div class="permissions" style="display: flex; flex-direction: row">
          <div class="creator" style="margin-right: 5rem; width: 50%;">
            <h2><b>Card Management</b></h2>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions"  value="create_card" id="create-card" >
              <label class="form-check-label" >
                Create-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" value="view_card" id="view-card" >
              <label class="form-check-label" >
                View-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" value="edit_card" id="edit-card" >
              <label class="form-check-label" >
                Edit-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" value="remove_card" id="remove-card" >
              <label class="form-check-label" >
                Remove-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" value="share_card" id="share-card" >
              <label class="form-check-label" >
                Share-card
              </label>
            </div>
          </div>
        </div>


        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Status<a class="has-text-danger"> *</a></b></h3>
        <div class="status" style="display: flex; flex-direction: row">
          <div class="form-check" style="margin-right: 3rem;">
            <input class="form-check-input" type="radio"  id="active" @input="updateViewerStatus" v-model="viewer_status" v-bind:value="active">
            <label class="form-check-label" >
              Active
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio"  id="not-active" @input="updateViewerStatus" v-model="viewer_status" v-bind:value="not_active">
            <label class="form-check-label" >
              Not Active
            </label>
          </div>
        </div>
      </form>
      <b-notification
        v-model="isActive"
        type="is-danger is-light"
        aria-close-label="Close notification"
        role="alert">
        Some Fields are Empty!
      </b-notification>
      <div class="button-container">
        <button class="btn-cancel" @click="backto" >Cancel</button>
        <button class="btn-create" @click="Create">Create</button>
      </div>
    </div>
  </div>
</template>

<script>

import {appSettings} from "../appsettings";
import {mapState} from "vuex";
import DropDown from "./drop-down.vue";
import ActivityLog from "../utils/ActivityLog";

export default {
  name: "Viewer-Create",
  components: {DropDown},
  data(){
    return{
      viewer_company:'',
      viewer_emp_no:'',
      viewer_designation:'',
      viewer_name:'',
      viewer_username:'',
      viewer_password:'',
      viewer_contact_no:'',
      viewer_email:'',
      viewer_status:'',
      active:'active',
      not_active:'not-active',
      companies:[],
      isActive:false,
      user_type:'VIEWER',
      permissions:[],
      permissionList:'',
    }
  },

  computed:{
    ...mapState({
      ViewerCompany:state => state.viewer.viewer_company_C,
      ViewerEmpNo: state => state.viewer.employee_no_V,
      ViewerDesignation: state => state.viewer.designation_V,
      ViewerName: state => state.viewer.viewer_name_V,
      ViewerUsername: state => state.viewer.username_V,
      ViewerPassword:state => state.viewer.password_V,
      ViewerContactNo: state => state.viewer.contact_no_V,
      ViewerEmail: state =>  state.viewer.email_V,
      ViewerStatus: state => state.viewer.status_V
    }),
    isValidEmail() {
      return /^[\w\.-]+@gmail\.com$/.test(this.viewer_email);
    },
    isValidContactNo() {
      return /^[0-9]{10}$/.test(this.viewer_contact_no);
    },
    isValidName(){
      return /^[A-Za-z0-9]+$/.test(this.viewer_name);
    }
  },

  watch:{
    viewer_company(newCompany){
      this.viewer_company = newCompany
    },
    viewer_emp_no(n,o){
      this.$store.commit('updateViewerEmpNo',n)
    },
    viewer_designation(n,o){
      this.$store.commit('updateViewerDesignation',n)
    },
    viewer_name(n,o){
      this.$store.commit('updateViewerName',n)
    },
    viewer_username(n,o){
      this.$store.commit('updateViewerUsername',n)
    },
    viewer_password(n,o){
      this.$store.commit('updateViewerPassword',n)
    },
    viewer_contact_no(n,o){
      this.$store.commit('updateViewerContactNo',n)
    },
    viewer_email(n,o){
      this.$store.commit('updateViewerEmail',n)
    },
    viewer_status(n,o){
      this.$store.commit('updateViewerStatus',n)
    },
    permissions(){
      this.permissionList = this.permissions.toString();
    }
  },
  methods:{
    backto(){
      this.$emit('goToBack')

    },


    Create: function () {

      this.$axios.get(appSettings.$api_url + '/api/Viewer/list')
        .then(existingViewersResponse => {
          const existingViewers = existingViewersResponse.data.data.viewers;
          const names = existingViewers.map(viewer => viewer.name);
          const usernames = existingViewers.map(viewer => viewer.username)
          const employeeId = existingViewers.map(viewer => viewer.employee_no)
          const emails = existingViewers.map(viewer => viewer.email)


          if (names.includes(this.viewer_name) || usernames.includes(this.viewer_username) || employeeId.includes(this.viewer_emp_no) || emails.includes(this.viewer_email)) {
            this.$buefy.notification.open({
              message: 'Viewer already exists!',
              type: 'is-danger',
            });
            return;
          }

          if (this.permissionList) {
            this.$axios.post(appSettings.$api_url + '/api/Viewer/create', {
              viewer_company_name: this.viewer_company,
              employee_no: this.$store.state.viewer.employee_no_V,
              designation: this.$store.state.viewer.designation_V,
              name: this.$store.state.viewer.creator_nameV,
              username: this.$store.state.viewer.username_V,
              contact_no: this.$store.state.viewer.contact_no_V,
              email: this.$store.state.viewer.email_V,
              status: this.$store.state.viewer.status_V,

            }).then(response => {

              this.$buefy.notification.open({
                message: 'Viewer Created!',
                type: 'is-success',
              });
              ActivityLog.trackActivity('Company Name', this.viewer_username, 'Created a Viewer');
              this.$emit('goToBack')

              // reset data properties
              this.viewer_company = ''
              this.viewer_emp_no = ''
              this.viewer_designation = ''
              this.viewer_name = ''
              this.viewer_username = ''
              this.viewer_password = ''
              this.viewer_contact_no = ''
              this.viewer_email = ''
              this.viewer_status = ''

              // reset Vuex store properties
              this.$store.commit('updateViewerCompany', '')
              this.$store.commit('updateViewerEmpNo', '')
              this.$store.commit('updateViewerDesignation', '')
              this.$store.commit('updateViewerName', '')
              this.$store.commit('updateViewerUsername', '')
              this.$store.commit('updateViewerPassword', '')
              this.$store.commit('updateViewerContactNo', '')
              this.$store.commit('updateViewerEmail', '')
              this.$store.commit('updateViewerStatus', '')
            }).catch(error => {
              console.log(error)
              this.$buefy.notification.open({
                message: 'Some fields are empty!',
                type: 'is-danger',
              });
            });
          } else {
            this.$buefy.notification.open({
              message: 'Some fields are empty!',
              type: 'is-danger',
            });
          }
        }).catch(error => {
            console.log(error);
            this.$buefy.notification.open({
              message: 'Error fetching existing creators!',
              type: 'is-danger',
            });
        });


      this.$axios.post(appSettings.$api_url + '/api/Users/save', {
        user_type: this.user_type,
        username: this.$store.state.viewer.username_V,
        password: this.$store.state.viewer.password_V,
        permissions: this.permissionList

      }).then(response=>{

        //clear Permissions
        this.permissions='';
        this.permissionList='';

      }).catch(error=>{
        console.log(error)
      })
    },

    generatePassword() {
      let result = "";
      let characters =  '123456789';
      let length = 4;

      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      this.viewer_password = this.viewer_username+result;
    },

    handleCompanySelected(company) {
      this.viewer_company = company.company_name;
    },

    //Viewer Mutations
    updateViewerEmpNo(e){
      this.$store.commit('updateViewerEmpNo',e)
    },
    updateViewerDesignation(e){
      this.$store.commit('updateViewerDesignation',e)
    },
    updateViewerName(e){
      this.$store.commit('updateViewerName',e)
    },
    updateViewerUsername(e){
      this.$store.commit('updateViewerUsername',e)
    },
    updateViewerPassword(e){
      this.$store.commit('updateViewerPassword',e)
    },
    updateViewerContactNo(e){
      this.$store.commit('updateViewerContactNo',e)
    },
    updateViewerEmail(e){
      this.$store.commit('updateViewerEmail',e)
    },
    updateViewerStatus(e){
      this.$store.commit('updateViewerStatus',e)
    }
  },
  mounted() {
    this.viewer_company = this.ViewerCompany
    this.viewer_emp_no = this.ViewerEmpNo
    this.viewer_designation = this.ViewerDesignation
    this.viewer_name = this.ViewerName
    this.viewer_username = this.ViewerUsername
    this.viewer_password = this.ViewerPassword
    this.viewer_contact_no =this.ViewerContactNo
    this.viewer_email =this.ViewerEmail
    this.viewer_status = this.ViewerStatus
  }
}
</script>

<style scoped>
.header h2{
  color: #393953;
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: 3rem;
  margin-right: 45rem;
  font-family: 'Roboto', sans-serif;
}

.error-message {
  color: #ff0000;
  font-size: 14px;
  margin-top: 4px;
}

h3{
  color: #989797;
}

.button-container{
  display: flex;
  margin-top: 2rem;
  margin-bottom: 1rem;
  justify-content: space-evenly;
}

.button {
  border: none;
  color: #fff;
  border-radius: 45px;
  background-size: 100% auto;
  font-family: inherit;
}

.btn-cancel {
  font-size: 1rem;
  border-radius: 45px;
  font-weight: 700;
  border-color: #070707;
  color: #050505;
  display: flex;
  padding-inline: 5.4rem;
  padding-bottom: 10px;
  padding-top: 6px;
}

.btn-cancel:hover {
  background: #c9c2c2;
}

.generate-btn {
  font-size: 15px;
  border-radius: 45px;
  padding: 0.4rem;
  margin-left: 5px;
  background-color: #1E1E1E;
  color: white;
  padding-inline: 8px;
}

.generate-btn:hover{
  opacity: 0.8;
}

.btn-create {
  font-size: 1rem;
  border-radius: 45px;
  font-weight: bold;
  background: black;
  color: white;
  display: flex;
  padding-bottom: 10px;
  padding-top: 6px;
  padding-inline: 6rem;
}

.btn-create:hover{
  opacity: 0.8;}

.creator h2,
.viewer h2{
  font-size: 18px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
}

.form h3,
.company_header{
  color: rgba(113, 113, 113, 0.53);
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 20px;
}

form p{
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 0rem;
}

.form-check-label{
  font-size: 16px;
  font-weight: 500;
  font-family: 'Inter',sans-serif;
}

.contact p,
.company p{
  color: black;
  margin-bottom: 0.7rem;
}

@keyframes pulse512 {
  0% {
    box-shadow: 0 0 0 0 #05bada66;
  }

  70% {
    box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
  }

  100% {
    box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
  }
}
</style>
