<template>
  <div class="container">
    <div class="header" style="display: flex; align-items: center;">
      <b-button class="button" @click="backto" >
        <img src="../assets/Icon/back button.png" height="53" width="103"/>
      </b-button>
      <h2 style="margin-left: 3rem; margin-right: 45rem; margin-top: 10px" >Edit Viewer</h2>
      <b-button class="delete-btn" @click="removeViewer">Delete</b-button>
    </div>

    <div style="margin-top: 2rem">
      <h3 style="margin-bottom: 1rem"><b>Creator Company</b></h3>
      <div>
        <drop-down  @company-selected="handleCompanySelected" :company-name="editViewerData.viewer_company_name"></drop-down>
      </div>
    </div>

    <div class="form" style="margin-top: 4rem">
      <form>
        <h3 style="margin-bottom: 1rem"><b>Creator Details</b></h3>
        <div class="company" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Employee Number</p>
            <b-input class="EmpNo" v-model="editViewerData.employee_no"></b-input>
          </div>
          <div style="width: 50%">
            <p>Designation</p>
            <b-input class="designation" v-model="editViewerData.designation"></b-input>
          </div>
        </div>

        <div class="contact" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Name</p>
            <b-input class="name" v-model="editViewerData.name"></b-input>
          </div>
          <div style="width: 50%">
            <p>Username</p>
            <b-input class="username" v-model="editViewerData.username"></b-input>
          </div>
        </div>
        <div class="contact" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Contact Number</p>
            <b-input class="contactNo" v-model="editViewerData.contact_no"></b-input>
          </div>
          <div style="width: 50%">
            <p>Email</p>
            <b-input class="email" v-model="editViewerData.email"></b-input>
          </div>
        </div>

        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Permissions</b></h3>
        <div class="permissions" style="display: flex; flex-direction: row">
          <div class="creator" style="margin-right: 5rem; width: 50%;">
            <h2><b>Card Management</b></h2>
            <div class="form-check">
              <input class="form-check-input" type="checkbox"  :v-model="editPermissions.create_card" id="create-card" >
              <label class="form-check-label" >
                Create-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :v-model="editPermissions.view_card" id="view-card" checked>
              <label class="form-check-label" >
                View-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :v-model="editPermissions.edit_card" value="edit_card"  id="edit-card" checked>
              <label class="form-check-label" >
                Edit-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :v-model="editPermissions.remove_card" value="remove_card" id="remove-card" checked>
              <label class="form-check-label" >
                Remove-card
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :v-model="editPermissions.share_card" value="share_card" id="share-card" checked>
              <label class="form-check-label" >
                Share-card
              </label>
            </div>
          </div>
        </div>


        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Status</b></h3>
        <div class="status" style="display: flex; flex-direction: row">
          <div class="form-check" style="margin-right: 3rem;">
            <input class="form-check-input" type="radio"  id="active" value="active" v-model="editViewerData.status">
            <label class="form-check-label" >
              Active
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio"  id="not-active" value="not-active" v-model="editViewerData.status">
            <label class="form-check-label" >
              Not Active
            </label>
          </div>
        </div>
      </form>
      <div class="button-container" >
        <button class="btn-cancel" @click="backto" >Cancel</button>
        <button class="btn-create" @click="updateViewer">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {appSettings} from "../appsettings";
import ActivityLog from "../utils/ActivityLog";
import DropDown from "./drop-down.vue";

export default {
  name: "Viewer-Edit",
  components: {DropDown},
  props: {
    viewerData:{type: Object},
    userPermissions: { type: String }
  },
  data(){
    return{
      editViewerData: {
        viewer_company:'',
        employee_no:'',
        designation:'',
        name:'',
        username:'',
        contact_no:'',
        email:'',
        status:'',
      },
      viewers: [],
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

    getData() {
      this.editViewerData = { ...this.viewerData };
      console.log('userPermissions:', this.userPermissions);
      if (this.userPermissions) {
        this.editPermissions = JSON.parse(JSON.stringify(this.userPermissions));
        console.log('per:', this.editPermissions);
      } else {
        this.editPermissions = {
          create_card: false,
          view_card: true,
          edit_card: true,
          remove_card: true,
          share_card: true
        };
        console.log('per (default):', this.editPermissions);
      }
    },


    updateViewer(){
      const id = this.viewerData.id;
      axios.put(`${appSettings.$api_url}/api/Viewer/${id}`, this.editViewerData)
        .then(response => {
          this.$emit('tableCallback')
          this.$buefy.notification.open({
            message: 'Viewer Updated!',
            type: 'is-success',
          });
          ActivityLog.trackActivity('Company Name', this.username, 'Updated the Viewer');
        })
        .catch(error => {
          console.error(error);
        });
    },

    handleCompanySelected(company) {
      this.viewer_company = company.company_name;
    },


    removeViewer(){
      const id = this.viewerData.id;

      axios.delete(`${appSettings.$api_url}/api/Viewer/${id}`)
        .then(response => {
          this.$buefy.notification.open({
            message: 'Viewer Removed!',
            type: 'is-danger',
          });
          this.$emit('tableCallback')
          this.viewers = this.viewers.filter(viewer => viewer.id !== id);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },

  mounted() {
    this.getData();
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

h3{
  color: #989797;
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

form p{
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 0rem;
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
