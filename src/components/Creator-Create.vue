<template>
  <div class="table-container">

    <div class="header" style="display: flex; align-items: center;">
      <b-button class="button" @click="backto" >
        <img src="../assets/Icon/back button.png" height="53" width="103"/>
      </b-button>
      <h2>Add New Creator</h2>
    </div>

    <div style="margin-top: 2rem">
      <h3 class="company_header" style="margin-bottom: 1rem"><b>Creator Company<a class="has-text-danger"> *</a></b></h3>
      <div>
        <drop-down @company-selected="handleCompanySelected"></drop-down>
      </div>
    </div>

    <div class="form" style="margin-top: 2rem">
      <form>
        <h3 style="margin-bottom: 1rem"><b>Creator Details</b></h3>
        <div class="company" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Employee No.<a class="has-text-danger"> *</a></p>
            <b-input class="EmpNo" @input="updateCreatorEmpNo" v-model="creator_emp_no"></b-input>
          </div>
          <div style="width: 50%">
            <p>Designation<a class="has-text-danger"> *</a></p>
            <b-input class="designation" @input="updateCreatorDesignation" v-model="creator_designation"></b-input>
          </div>
        </div>

        <div class="contact" style="display: flex; flex-direction: row; margin-top: 1rem">
          <div style="width: 50%; margin-right: 5rem">
            <p>Name<a class="has-text-danger"> *</a></p>
            <b-input class="name" @input="updateCreatorName" v-model="creator_name"></b-input>
            <span v-if="!isValidName" class="error-message">Please enter a valid type of data.</span>
          </div>
          <div style="margin-right: 0.5rem; width: 25%;">
            <p>Username<a class="has-text-danger"> *</a></p>
            <b-input class="username" @input="updateCreatorUsername" v-model="creator_username"></b-input>
          </div>
          <div style="width: 25%">
            <p>Password<a class="has-text-danger"> *</a></p>
            <div style="display: flex; flex-direction: row">
              <b-input class="password" @input="updateCreatorPassword" v-model="creator_password" style="width: 60%;"></b-input>
              <button class="generate-btn" type="button" style=" width: 40% "
                      @click="generatePassword">Generate
              </button>
            </div>
          </div>
        </div>
        <div class="contact" style="display: flex; flex-direction: row; margin-top: 1rem">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Contact Number<a class="has-text-danger"> *</a></p>
            <b-input class="contactNo" @input="updateCreatorContactNo" v-model="creator_contact_no"></b-input>
            <span v-if="!isValidContactNo" class="error-message">Please enter a valid Mobile Number</span>
          </div>
          <div style="width: 50%">
            <p>Email<a class="has-text-danger"> *</a></p>
            <b-input class="email" type="email" @input="updateCreatorEmail" placeholder="example@gmail.com" v-model="creator_email"></b-input>
            <span v-if="!isValidEmail" class="error-message">Please enter a valid email address.</span>
          </div>
        </div>

        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Permissions<a class="has-text-danger"> *</a></b></h3>
        <div class="permissions" style="display: flex; flex-direction: row">
          <div class="creator" style="margin-right: 5rem; width: 50%;">
            <h2><b>Card Management</b></h2>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" value="create_card" id="create-card">
              <label class="form-check-label" >
                Create-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" value="view_card" id="view-card">
              <label class="form-check-label" >
                View-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" disabled type="checkbox" v-model="permissions" value="edit_card" id="edit-card">
              <label class="form-check-label" >
                Edit-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" disabled type="checkbox" v-model="permissions" value="remove_card" id="remove-card">
              <label class="form-check-label" >
                Remove-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" disabled type="checkbox" v-model="permissions" value="share_card" id="share-card">
              <label class="form-check-label" >
                Share-card
              </label>
            </div>
          </div>
        </div>


        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Status<a class="has-text-danger"> *</a></b></h3>
        <div class="status" style="display: flex; flex-direction: row">
          <div class="form-check" style="margin-right: 3rem;">
            <input class="form-check-input" type="radio"  id="active" checked
                   @input="updateCreatorStatus" v-model="creator_status" v-bind:value="active">
            <label class="form-check-label" >
              Active
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio"  id="not-active"
                   @input="updateCreatorStatus" v-model="creator_status" v-bind:value="not_active" >
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
      <div class="button-container" >
        <button class="btn-cancel" @click="backto" >Cancel</button>
        <button class="btn-create" @click="Create">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {appSettings} from "../appsettings";
import DropDown from "./drop-down.vue";
import ActivityLog from "../utils/ActivityLog";


export default {
  name: "Creator-Create",

  data(){
    return{
      creator_company:'',
      creator_emp_no:'',
      creator_designation:'',
      creator_name:'',
      creator_username:'',
      creator_password:'',
      creator_contact_no:'',
      creator_email:'',
      creator_status:'',
      active:'active',
      not_active:'not-active',
      companies:[],
      isActive:false,
      user_type:'CREATOR',
      permissions:[],
      permissionList:'',
      existingCreators: [],
    }
  },

  components:{
    DropDown
  },

  computed:{
    ...mapState({
      CreatorCompany:state => state.creator.creator_company_C,
      CreatorEmpNo: state => state.creator.employee_no_C,
      CreatorDesignation: state => state.creator.designation_C,
      CreatorName: state => state.creator.creator_nameC,
      CreatorUsername: state => state.creator.username_C,
      CreatorPassword: state => state.creator.password_C,
      CreatorContactNo: state => state.creator.contact_no_C,
      CreatorEmail: state =>  state.creator.email_C,
      CreatorStatus: state => state.creator.status_C,
    }),

    isValidEmail() {
      return /^[\w\.-]+@gmail\.com$/.test(this.creator_email);
    },
    isValidContactNo() {
      return /^[0-9]{10}$/.test(this.creator_contact_no);
    },
    isValidName(){
      return /^[A-Za-z0-9]+$/.test(this.creator_name);
    }
  },

  watch:{
    creator_company(newCompany){
      this.creator_company = newCompany
    },
    creator_emp_no(n,o){
      this.$store.commit('updateCreatorEmpNo',n)
    },
    creator_designation(n,o){
      this.$store.commit('updateCreatorDesignation',n)
    },
    creator_name(n,o){
      this.$store.commit('updateCreatorName',n)
    },
    creator_username(n,o){
      this.$store.commit('updateCreatorUsername',n)
    },
    creator_password(n,o){
      this.$store.commit('updateCreatorPassword',n)
    },
    creator_contact_no(n,o){
      this.$store.commit('updateCreatorContactNo',n)
    },
    creator_email(n,o){
      this.$store.commit('updateCreatorEmail',n)
    },
    creator_status(n,o){
      this.$store.commit('updateCreatorStatus',n)
    },
    permissions(){
      this.permissionList = this.permissions.toString();
    }
  },

  methods:{
    backto(){
      this.$emit('goToBack')
      this.permissions=[];
    },

    Create: function () {

      this.$axios.get(appSettings.$api_url + '/api/Creator/list')
        .then(existingCreatorsResponse => {
          const existingCreators = existingCreatorsResponse.data.data.creators;
          const names = existingCreators.map(creator => creator.name);
          const usernames = existingCreators.map(creator => creator.username)
          const employeeId = existingCreators.map(creator => creator.employee_no)
          const emails = existingCreators.map(creator => creator.email)


          if (names.includes(this.creator_name) || usernames.includes(this.creator_username) || employeeId.includes(this.creator_emp_no) || emails.includes(this.creator_email)) {
            this.$buefy.notification.open({
              message: 'Creator already exists!',
              type: 'is-danger',
            });
            return;
          }

          if (this.permissionList) {
            this.$axios.post(appSettings.$api_url + '/api/Creator/create', {
              creator_company_name: this.creator_company,
              employee_no: this.$store.state.creator.employee_no_C,
              designation: this.$store.state.creator.designation_C,
              name: this.$store.state.creator.creator_nameC,
              username: this.$store.state.creator.username_C,
              contact_no: this.$store.state.creator.contact_no_C,
              email: this.$store.state.creator.email_C,
              status: this.$store.state.creator.status_C,
            })
              .then(response => {
                console.log("Save Creator");
                this.$buefy.notification.open({
                  message: 'Creator Created!',
                  type: 'is-success',
                });
                ActivityLog.trackActivity(this.creator_company, this.creator_username, 'Created a Creator');
                this.$emit('goToBack');
                // console.log(response);

                // Reset data properties
                this.creator_company = '';
                this.creator_emp_no = '';
                this.creator_designation = '';
                this.creator_name = '';
                this.creator_username = '';
                this.creator_password = '';
                this.creator_contact_no = '';
                this.creator_email = '';
                this.creator_status = '';

                this.permissions='';
                this.permissionList='';

                // Reset Vuex store properties
                this.$store.commit('updateCreatorCompany', '');
                this.$store.commit('updateCreatorEmpNo', '');
                this.$store.commit('updateCreatorDesignation', '');
                this.$store.commit('updateCreatorName', '');
                this.$store.commit('updateCreatorUsername', '');
                this.$store.commit('updateCreatorPassword', '');
                this.$store.commit('updateCreatorContactNo', '');
                this.$store.commit('updateCreatorEmail', '');
                this.$store.commit('updateCreatorStatus', '');
              })
              .catch(error => {
                console.log(error);
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
        })
        .catch(error => {
          console.log(error);
          this.$buefy.notification.open({
            message: 'Error fetching existing creators!',
            type: 'is-danger',
          });
        });

      this.$axios.post(appSettings.$api_url + '/api/Users/save', {
        user_type: this.user_type,
        username: this.$store.state.creator.username_C,
        password: this.$store.state.creator.password_C,
        permissions: this.permissionList

      }).then(response=>{
        //clear Permissions
        // this.permissions='';
        // this.permissionList='';

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
      this.creator_password = this.creator_username+result;
    },

    handleCompanySelected(company) {
      this.creator_company = company.company_name;
    },

    // Creator Mutations

    updateCreatorEmpNo(e){
      this.$store.commit('updateCreatorEmpNo',e)
    },
    updateCreatorDesignation(e){
     this.$store.commit('updateCreatorDesignation',e)
    },
    updateCreatorName(e){
      this.$store.commit('updateCreatorName',e)
    },
    updateCreatorUsername(e){
      this.$store.commit('updateCreatorUsername',e)
    },
    updateCreatorPassword(e){
      this.$store.commit('updateCreatorPassword',e)
    },
    updateCreatorContactNo(e){
      this.$store.commit('updateCreatorContactNo',e)
    },
    updateCreatorEmail(e){
      this.$store.commit('updateCreatorEmail',e)
    },
    updateCreatorStatus(e){
      this.$store.commit('updateCreatorStatus',e)
    }
  },
  mounted() {
    this.creator_company = this.CreatorCompany
    this.creator_emp_no = this.CreatorEmpNo
    this.creator_designation = this.CreatorDesignation
    this.creator_name = this.CreatorName
    this.creator_username = this.CreatorUsername
    this.creator_password = this.CreatorPassword
    this.creator_contact_no = this.CreatorContactNo
    this.creator_email = this.CreatorEmail
    this.creator_status = this.CreatorStatus
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

h3{
  color: #989797;
}

.button-container{
  display: flex;
  margin-top: 2rem;
  margin-bottom: 1rem;
  justify-content: space-evenly;
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

.error-message {
  color: #ff0000;
  font-size: 14px;
  margin-top: 4px;
}

.creator h2,
.viewer h2{
  margin-bottom: 1rem;
}

.creator h2{
  font-size: 18px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
}

.contact p,
.company p{
  color: black;
  margin-bottom: 0.7rem;
}

</style>
