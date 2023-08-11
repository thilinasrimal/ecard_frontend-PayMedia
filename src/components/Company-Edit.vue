<template>
  <div class="company-edit-container">
    <div class="header" style="display: flex; align-items: center;">
      <b-button class="button" @click="backtoTable">
        <img src="../assets/Icon/back button.png" height="53" width="103"/>
      </b-button>
      <h2>Edit Company</h2>
      <b-button class="delete-btn" @click="removeCompany">Delete</b-button>
    </div>
    <div class="form" style="margin-top: 4rem">
      <form>
        <h3 style="margin-bottom: 1rem"><b>Company Details</b></h3>
        <div class="company" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Company Name*</p>
            <b-input class="companyName" v-model="editData.company_name" required></b-input>
          </div>
          <div style="width: 50%">
            <p>Headquarters*</p>
            <b-input class="headquarters" v-model="editData.headquarters" required></b-input>
          </div>
        </div>

        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Contact Person Details</b></h3>
        <div class="contact" style="display: flex; flex-direction: row; margin-bottom: 0.3rem">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Designation*</p>
            <b-input class="companyName" v-model="editData.designation" required></b-input>
          </div>
          <div style="width: 50%">
            <p>Name*</p>
            <b-input class="headquarters" v-model="editData.name" required></b-input>
          </div>
        </div>
        <div class="contact1" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Contact Number*</p>
            <b-input class="companyName" v-model="editData.contact_no" required></b-input>
          </div>
          <div style="width: 50%">
            <p>Email*</p>
            <b-input class="headquarters" v-model="editData.email" required></b-input>
          </div>
        </div>

        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Permissions</b></h3>
        <div class="permissions" style="display: flex; flex-direction: row">
          <div class="creator" style="margin-right: 5rem; width: 50%;">
            <h2><b>Creators Management</b></h2>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="create-creator" checked>
              <label class="form-check-label">
                Create-creator
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="view-creator">
              <label class="form-check-label">
                View-creator
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="edit-creator">
              <label class="form-check-label">
                Edit-creator
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="remove-creator">
              <label class="form-check-label">
                Remove-creator
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="password-reset-c">
              <label class="form-check-label">
                Password-reset
              </label>
            </div>
          </div>

          <div class="viewer" style="margin-right: 5rem; width: 50%;">
            <h2><b>Viewers Management</b></h2>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="create-viewer" checked>
              <label class="form-check-label">
                Create-Viewer
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="view-viewer">
              <label class="form-check-label">
                View-viewer
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="edit-viewer">
              <label class="form-check-label">
                Edit-viewer
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="remove-viewer">
              <label class="form-check-label">
                Remove-viewer
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="password-reset">
              <label class="form-check-label">
                Password-reset
              </label>
            </div>
          </div>
        </div>

        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Login Credentials</b></h3>
        <div class="login" style="display: flex; flex-direction: row">
          <div class="username-input" style="margin-right: 3rem;">
            <p>Username*</p>
            <b-input class="username" v-model="editData.username" required></b-input>
          </div>
          <div class="password-input">
            <p>Password*</p>
            <b-input class="password" v-model="editData.password" readonly></b-input>
          </div>
          <button class="btn-outline-dark" type="button" style="margin-top: 20px; margin-right: 10px; margin-left: 20px"
                  @click="generatePassword">Generate
          </button>
          <b-tooltip label="Copy Password"
                     position="is-right"
                     type="is-light"
                     target="">
            <button class="btn-outline-secondary" style=" margin-top: 20px" @click.prevent="copyToClipboard">
              <svg style="color: #050505;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-clipboard" viewBox="0 0 16 16">
                <path
                  d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path
                  d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
              </svg>
            </button>
          </b-tooltip>
        </div>

        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Status*</b></h3>
        <div class="status" style="display: flex; flex-direction: row">
          <div class="form-check" style="margin-right: 3rem;">
            <input class="form-check-input" type="radio" id="active" value="active" v-model="editData.status">
            <label class="form-check-label">
              Active
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="not-active" value="not-active" v-model="editData.status">
            <label class="form-check-label">
              Not Active
            </label>
          </div>
        </div>
      </form>
      <div class="button-container">
        <button class="btn-cancel" @click="backtoTable">Cancel</button>
        <button class="btn-create" @click="updateCompany">Save</button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {appSettings} from "../appsettings";
import ActivityLog from "../utils/ActivityLog";

export default {
  name: "Company-Edit",
  props: ['companyData'],
  data() {
    return {
      editData: {
        companyName: '',
        headquarters: '',
        designation: '',
        contact_name: '',
        contact_no: '',
        contact_email: '',
        company_username: '',
        company_password: '',
        status: '',
      },
      companies: [],

    }
  },

  methods: {
    backtoTable() {
      this.$emit('tableCallback')
    },

    getData() {
      this.editData = {...this.companyData};
      // console.log('editData',this.companyData)

    },

    updateCompany: function () {
      const id = this.companyData.id;
      axios.put(`${appSettings.$api_url}/api/Company/${id}`, this.editData)
        .then(response => {
          this.$emit('tableCallback')
          this.$buefy.notification.open({
            message: 'Company Updated!',
            type: 'is-success',
          });
          ActivityLog.trackActivity(this.editData.company_name, this.editData.username, 'Updated the Company');

        })
        .catch(error => {
          console.error(error);
        });
    },

    generatePassword() {
      let result = "";
      let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
      let length = 10;

      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      this.editData.password = result;
      // console.log(result)
    },

    copyToClipboard() {
      navigator.clipboard.writeText(this.editData.password);
      this.$buefy.notification.open({
        message: 'Password Copied!',
        type: 'is-success'
      })
    },

    removeCompany() {
      const id = this.companyData.id;

      axios.delete(`${appSettings.$api_url}/api/Company/${id}`)
        .then(response => {
          alert('Company Removed Successfully!')
          // console.log(response);

          this.companies = this.companies.filter(company => company.id !== id);
          ActivityLog.trackActivity(this.editData.company_name, this.editData.username, 'Removed a Company');
        })
        .catch(error => {
          console.error(error);
        });

      this.$emit('tableCallback')
      // window.location.reload();
    },
  },
  mounted() {
    this.getData();
  }

}
</script>

<style scoped>
.company-edit-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Additional responsive styles */
@media screen and (max-width: 600px) {
  .company-edit-container {
    padding: 0 20px;
  }
}

.header h2 {
  color: #393953;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  margin-top: 10px;
  margin-left: 3rem;
  margin-right: 36rem;
}

h3 {
  color: rgba(113, 113, 113, 0.71);
  font-weight: 600;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
}

.delete-btn {
  background: #e30d0d;
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 500;
}

.button-container {
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

.btn-create:hover {
  opacity: 0.8;
}


.btn-outline-secondary {
  font-size: 1rem;
  border-radius: 45px;
  font-weight: bold;
  background: #FFFFFF;
  color: #1E1E1E;
  border: groove;
  padding-inline: 20px;
  padding-bottom: 10px;
  padding-top: 6px;
  margin-left: 6px;
}

.btn-outline-secondary:hover {
  background-color: #eee8e8;
}

.btn-outline-dark {
  font-size: 1rem;
  border-radius: 45px;
  padding: 0.5rem;
  margin-top: 1rem;
  background-color: #1E1E1E;
  color: white;
  padding-inline: 20px;
}

.btn-outline-dark:hover {
  opacity: 0.8;
}

.creator h2,
.viewer h2 {
  margin-bottom: 1rem;
  color: #393953;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
}

.contact p,
.contact1 p,
.company p {
  color: black;
  margin-bottom: 0.7rem;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 400;
}

.form-check-label {
  font-size: 16px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

.login p {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 400;
}

.username-input, .password-input {
  width: 325px;
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
