<template>
  <div class="container">
    <div class="header" style="display: flex; align-items: center;">
      <b-button class="button" @click="backto" >
        <img src="../assets/Icon/back button.png" height="53" width="103"/>
      </b-button>
      <h2 >Edit Creator</h2>
      <b-button class="delete-btn" @click="removeCreator">Delete</b-button>
    </div>

    <div style="margin-top: 2rem">
      <h3 style="margin-bottom: 1rem"><b>Creator Company<a class="has-text-danger"> *</a></b></h3>
      <div>
        <drop-down @company-selected="handleCompanySelected" :company-name="editCreatorData.creator_company_name"></drop-down>
      </div>
    </div>

    <div class="form" style="margin-top: 4rem">
      <form>
        <h3 style="margin-bottom: 1rem"><b>Creator Details</b></h3>
        <div class="company" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Employee Number<a class="has-text-danger"> *</a></p>
            <b-input class="EmpNo" v-model="editCreatorData.employee_no"></b-input>
          </div>
          <div style="width: 50%">
            <p>Designation*</p>
            <b-input class="designation" v-model="editCreatorData.designation"></b-input>
          </div>
        </div>

        <div class="contact" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Name<a class="has-text-danger"> *</a></p>
            <b-input class="name" v-model="editCreatorData.name"></b-input>
          </div>
          <div style="width: 50%">
            <p>Username<a class="has-text-danger"> *</a></p>
            <b-input class="username" v-model="editCreatorData.username"></b-input>
          </div>
        </div>
        <div class="contact" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Contact Number<a class="has-text-danger"> *</a></p>
            <b-input class="contactNo" v-model="editCreatorData.contact_no"></b-input>
          </div>
          <div style="width: 50%">
            <p>Email<a class="has-text-danger"> *</a></p>
            <b-input class="email" v-model="editCreatorData.email"></b-input>
          </div>
        </div>

        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Permissions</b></h3>
        <div class="permissions" style="display: flex; flex-direction: row">
          <div class="creator" style="margin-right: 5rem; width: 50%;">
            <h2><b>Card Management</b></h2>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :v-model="editPermissions.create_card" id="crate-card">
              <label class="form-check-label" >
                Create-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :v-model="editPermissions.view_card" id="view-card" >
              <label class="form-check-label" >
                View-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :v-model="editPermissions.edit_card" value="edit_card" id="edit-card" >
              <label class="form-check-label" >
                Edit-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :v-model="editPermissions.remove_card" value="remove_card" id="remove-card" >
              <label class="form-check-label" >
                Remove-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :v-model="editPermissions.share_card" value="share_card" id="share-card" >
              <label class="form-check-label" >
                Share-card
              </label>
            </div>
          </div>
        </div>


        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Status<a class="has-text-danger"> *</a></b></h3>
        <div class="status" style="display: flex; flex-direction: row">
          <div class="form-check" style="margin-right: 3rem;">
            <input class="form-check-input" type="radio"  id="active" value="active" v-model="editCreatorData.status">
            <label class="form-check-label" >
              Active
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio"  id="not-active" value="not-active" v-model="editCreatorData.status">
            <label class="form-check-label" >
              Not Active
            </label>
          </div>
        </div>
      </form>
      <div class="button-container">
        <button class="btn-cancel" @click="backto" >Cancel</button>
        <button class="btn-create" @click="updateCreator">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios, {put} from "axios";
import {appSettings} from "../appsettings";
import ActivityLog from "../utils/ActivityLog";
import DropDown from "./drop-down.vue";

export default {
  name: "Creator-Edit",
  components: {DropDown},
  props: {
    creatorData: { type: Object },
    userPermissions: { type: String }
  },
  data(){
    return{
      editCreatorData: {},
      creators: [],
      companies:[],
      editPermissions: {
        create_card: false,
        view_card: false,
        edit_card: false,
        remove_card: false,
        share_card: false
      }
    }
  },

  methods:{
    backto(){
      this.$emit('tableCallback')
    },

    getCreatorData() {
      this.editCreatorData = { ...this.creatorData };
      // console.log('userPermissions:', this.userPermissions);
      if (this.userPermissions) {
        this.editPermissions = JSON.parse(JSON.stringify(this.userPermissions));
        // console.log('per:', this.editPermissions);
      } else {
        this.editPermissions = {
          create_card: true,
          view_card: false,
          edit_card: false,
          remove_card: false,
          share_card: false
        };
        console.log('per (default):', this.editPermissions);
      }
    },


    // getCreatorCompany(){
    //   const creator_company = this.editCreatorData
    //   this.$emit('getCreatorCompanyName',creator_company)
    //   console.log('company: ',creator_company)
    // },

    updateCreator: function () {
      const id = this.creatorData.id;
      axios.put(`${appSettings.$api_url}/api/Creator/${id}`, this.editCreatorData)
        .then(response => {
          // console.log('res: ',response);
          this.$emit('tableCallback')
          this.$buefy.notification.open({
            message: 'Creator Updated!',
            type: 'is-success',
          });
          ActivityLog.trackActivity('Company Name', this.editCreatorData.username, 'Updated the Creator');

        })
        .catch(error => {
          console.error(error);
          this.$buefy.notification.open({
            message: 'Something wrong!',
            type: 'is-danger',
          });
        });

      // axios.put(`${appSettings.$api_url}/api/Users/${id}`, this.).
      // then(response=>{
      //
      // }).catch(error=>{
      //   console.log(error)
      //   this.$buefy.notification.open({
      //     message: 'Some fields are empty!',
      //     type: 'is-danger',
      //   });
      // })
    },


    handleCompanySelected(company) {
      this.editCreatorData.company_name = company.company_name;
    },

    removeCreator(){
      const id = this.creatorData.id;
      axios.delete(`${appSettings.$api_url}/api/Creator/${id}`)
        .then(response => {
          this.$emit('tableCallback')
          this.$buefy.notification.open({
            message: 'Creator Removed!',
            type: 'is-success',
          });
          this.creators = this.creators.filter(creator => creator.id !== id);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },

  mounted() {
    this.getCreatorData();
  }
}
</script>

<style scoped>
.header h2{
  color: #2a2929;
  font-size: 1.4rem;
  font-weight: bold;
  margin-right: 20rem;
}

.header h2{
  color: #393953;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  margin-top: 10px;
  margin-left: 3rem;
  margin-right: 36rem;
}

h3{
  color: rgba(113, 113, 113, 0.71);
  font-weight: 600;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
}

.delete-btn{
  background: #e30d0d;
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 500;
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
  margin-bottom: 1rem;
}

.contact p,
.company p{
  color: black;
  margin-bottom: 0.7rem;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 400;
}

.form-check-label{
  font-size: 16px;
  font-weight: 500;
  font-family: 'Inter',sans-serif;
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
