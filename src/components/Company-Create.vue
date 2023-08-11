<template>
  <div class="company-create-container">
    <div class="header" style="display: flex; align-items: center; ">
      <b-button class="button" @click="backto">
        <img src="../assets/Icon/back button.png" height="53" width="103"/>
      </b-button>

      <h2>Create New Company</h2>
    </div>

    <div class="form" style="margin-top: 4rem">
      <form>
        <h3 style="margin-bottom: 1rem"><b>Company Details</b></h3>
        <div class="company" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Company Name<a class="has-text-danger"> *</a></p>
            <b-input class="companyName" style="border-color: rgba(30, 30, 30, 0.71);" @input="updateCompanyN"
                     v-model="companyName" required></b-input>
          </div>
          <div style="width: 50%">
            <p>Headquarters<a class="has-text-danger"> *</a></p>
            <b-input required class="headquarters" style="border-color: rgba(30, 30, 30, 0.71);"
                     @input="updateHeadquarters" v-model="headquarters"></b-input>
          </div>
        </div>

        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Contact Person Details</b></h3>
        <div class="contact" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Designation<a class="has-text-danger"> *</a></p>
            <b-input required class="companyName" style="border-color: rgba(30, 30, 30, 0.71);"
                     @input="updateDesignationC" v-model="designation"></b-input>
          </div>
          <div style="width: 50%; margin-bottom: 1rem">
            <p>Name<a class="has-text-danger"> *</a></p>
            <b-input required class="headquarters" style="border-color: rgba(30, 30, 30, 0.71);" @input="updateName"
                     v-model="contact_name"></b-input>
            <span v-if="!isValidName" class="error-message">Please enter a valid type of data.</span>
          </div>
        </div>
        <div class="contact" style="display: flex; flex-direction: row">
          <div style="margin-right: 5rem; width: 50%;">
            <p>Contact Number<a class="has-text-danger"> *</a></p>
            <b-input required class="companyName" style="border-color: rgba(30, 30, 30, 0.71);"
                     @input="updateContactNoC" v-model="contact_no"></b-input>
            <span v-if="!isValidContactNo" class="error-message">Please enter a valid Mobile Number</span>
          </div>
          <div style="width: 50%">
            <p>Email Address<a class="has-text-danger"> *</a></p>
            <b-input required class="headquarters" placeholder="example@gmail.com" type="email"
                     style="border-color: rgba(30, 30, 30, 0.71);" @input="updateEmailC"
                     v-model="contact_email"></b-input>
            <span v-if="!isValidEmail" class="error-message">Please enter a valid email address.</span>
          </div>
        </div>

        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Permissions<a class="has-text-danger"> *</a></b></h3>
        <div class="permissions" style="display: flex; flex-direction: row">
          <div class="creator" style="margin-right: 5rem; width: 50%;">
            <h2><b>Creators Management</b></h2>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" value="create_creator"
                     id="create-creator">
              <label class="form-check-label">
                Create-creator
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" value="view_creator"
                     id="view-creator" checked>
              <label class="form-check-label">
                View-creator
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" value="edit_creator"
                     id="edit-creator">
              <label class="form-check-label">
                Edit-creator
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" value="remove_creator"
                     id="remove-creator">
              <label class="form-check-label">
                Remove-creator
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" disabled value="password_reset_c"
                     id="password-reset-c">
              <label class="form-check-label">
                Password-reset
              </label>
            </div>
          </div>

          <div class="viewer" style="margin-right: 5rem; width: 50%;">
            <h2><b>Viewers Management</b></h2>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" value="create_viewer"
                     id="create-viewer">
              <label class="form-check-label">
                Create-Viewer
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" value="view_viewer" id="view-viewer"
                     checked>
              <label class="form-check-label">
                View-viewer
              </label>
            </div>
            <div class="form-check">
              <input readonly class="form-check-input" type="checkbox" v-model="permissions" value="edit_viewer"
                     id="edit-viewer">
              <label class="form-check-label">
                Edit-viewer
              </label>
            </div>
            <div class="form-check">
              <input readonly class="form-check-input" type="checkbox" v-model="permissions" value="remove_viewer"
                     id="remove-viewer">
              <label class="form-check-label">
                Remove-viewer
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="permissions" disabled value="password_reset"
                     id="password-reset">
              <label class="form-check-label">
                Password-reset
              </label>
            </div>
          </div>
        </div>

        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Login Credentials</b></h3>
        <div class="login" style="display: flex; flex-direction: row">
          <div class="username-input" style="margin-right: 2rem;">
            <p>Username<a class="has-text-danger"> *</a></p>
            <b-input class="username" style="border-color: rgba(30, 30, 30, 0.71);" @input="updateUsername"
                     v-model="company_username"></b-input>
          </div>
          <div class="password-input">
            <p>Password<a class="has-text-danger"> *</a></p>
            <b-input class="password" readonly style="border-color: rgba(30, 30, 30, 0.71);" @input="updatePassword"
                     v-model="company_password"></b-input>
          </div>
          <button class="btn-outline-dark" type="button" style="margin-top: 20px; margin-right: 10px; margin-left: 20px"
                    @click="generatePassword">Generate
          </button>
          <b-tooltip label="Copy Password"
                     position="is-right"
                     type="is-light"
                     :activeT="active" target="">
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

        <h3 style="margin-bottom: 1rem; margin-top: 2rem"><b>Status<a class="has-text-danger"> *</a></b></h3>
        <div class="status" style="display: flex; flex-direction: row">
          <div class="form-check" style="margin-right: 3rem;">
            <input class="form-check-input" type="radio" id="active" @input="updateStatusC" v-model="status"
                   v-bind:value="active">
            <label class="form-check-label">
              Active
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="not-active" @input="updateStatusC" v-model="status"
                   v-bind:value="not_active">
            <label class="form-check-label">
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
        <button class="btn-cancel default" @click="backto">Cancel</button>
        <button class="btn-create"  @click="Create">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {appSettings} from "../appsettings";
import ActivityLog from "../utils/ActivityLog";


export default {
  name: "Company-Create",
  data() {
    return {
      companyName: '',
      headquarters: '',
      designation: '',
      contact_name: '',
      contact_no: '',
      contact_email: '',
      company_username: '',
      company_password: '',
      status: '',
      active: 'active',
      not_active: 'not-active',
      isActive: false,
      showPassword: false,
      user_type: 'COMPANY',
      permissions: [],
      permissionList: '',
      activeT:true,
    }
  },
  computed: {
    ...mapState({
      CName: state => state.company.companyNameS,
      CheadQ: state => state.company.headquartersS,
      Cdesignation: state => state.company.designationS,
      CcontactName: state => state.company.contact_nameS,
      CcontactNo: state => state.company.contact_noS,
      Cemail: state => state.company.contact_emailS,
      Cusername: state => state.company.company_usernameS,
      Cpassword: state => state.company.company_passwordS,
      Cstatus: state => state.company.company_status,
    }),

    isValidEmail() {
      return /^[\w\.-]+@gmail\.com$/.test(this.contact_email);
    },
    isValidContactNo() {
      return /^[0-9]{10}$/.test(this.contact_no);
    },
    isValidName(){
      return /^[A-Za-z0-9]+$/.test(this.contact_name);
    }
  },

  watch: {
    companyName(n, o) {
      this.$store.commit('updateCompanyN', n)
    },
    headquarters(n, o) {
      this.$store.commit('updateHeadquarters', n)
    },
    designation(n, o) {
      this.$store.commit('updateDesignationC', n)
    },
    contact_name(n, o) {
      this.$store.commit('updateName', n)
    },
    contact_no(n, o) {
      this.$store.commit('updateContactNoC', n)
    },
    contact_email(n, o) {
      this.$store.commit('updateEmailC', n)
    },
    company_username(n, o) {
      this.$store.commit('updateUsername', n)
    },
    company_password(n, o) {
      this.$store.commit('updatePassword', n)
    },
    status(n, o) {
      this.$store.commit('updateStatusC', n)
    },
    //user
    permissions() {
      this.permissionList = this.permissions.toString();
    }
  },


  methods: {
    backto() {
      this.$emit('goToBack')
      this.$emit('goToDashboard')
    },

    generatePassword() {
      let result = "";
      let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
      let length = 10;

      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      this.company_password = result;
    },

    copyToClipboard() {
      navigator.clipboard.writeText(this.company_password);
      this.$buefy.notification.open({
        message: 'Password Copied!',
        type: 'is-success'
      })
    },


    Create: function () {

      this.$axios.get(appSettings.$api_url + '/api/Company/list')
        .then(existingCompaniesResponse => {
          const existingCompanies = existingCompaniesResponse.data.data.companies;
          const names = existingCompanies.map(company => company.company_name);
          const usernames = existingCompanies.map(company => company.name)
          const emails = existingCompanies.map(company => company.email)


          if (names.includes(this.companyName) || usernames.includes(this.contact_name) || emails.includes(this.contact_email)) {
            this.$buefy.notification.open({
              message: 'Company already exists!',
              type: 'is-danger',
            });
            return;
          }

          if (this.permissionList) {
            this.$axios.post(appSettings.$api_url + '/api/Company/create', {
              company_name: this.$store.state.company.companyNameS,
              headquarters: this.$store.state.company.headquartersS,
              designation: this.$store.state.company.designationS,
              name: this.$store.state.company.contact_nameS,
              contact_no: this.$store.state.company.contact_noS,
              email: this.$store.state.company.contact_emailS,
              username: this.$store.state.company.company_usernameS,
              password: this.$store.state.company.company_passwordS,
              status: this.$store.state.company.company_status,

            }).then(response => {
              this.$buefy.notification.open({
                message: 'Company Created!',
                type: 'is-success',
              });
              ActivityLog.trackActivity(this.companyName, this.company_username, 'Created a Company');
              this.$emit('goToBack')
              // console.log(response)


              // reset data properties
              this.companyName = ''
              this.headquarters = ''
              this.designation = ''
              this.contact_name = ''
              this.contact_no = ''
              this.contact_email = ''
              this.company_username = ''
              this.company_password = ''
              this.status = ''

              // reset Vuex store properties
              this.$store.commit('updateCompanyN', '')
              this.$store.commit('updateHeadquarters', '')
              this.$store.commit('updateDesignationC', '')
              this.$store.commit('updateName', '')
              this.$store.commit('updateContactNoC', '')
              this.$store.commit('updateEmailC', '')
              this.$store.commit('updateUsername', '')
              this.$store.commit('updatePassword', '')
              this.$store.commit('updateStatusC', '')
            })
              .catch(error => {
                console.log(error)
                this.$buefy.notification.open({
                  message: 'Some fields are empty!',
                  type: 'is-danger',
                });
                this.permissions='';
                this.permissionList='';
              })
          } else {
            this.permissions='';
            this.permissionList='';
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
        this.permissions='';
        this.permissionList='';
      });

      this.$axios.post(appSettings.$api_url + '/api/Users/save', {
        user_type: this.user_type,
        username: this.$store.state.company.company_usernameS,
        password: this.$store.state.company.company_passwordS,
        permissions: this.permissionList
      }).then(response => {


        this.permissions='';
        this.permissionList='';
        // console.log('create company:', response)

      }).catch(error => {
        console.log(error)
      })
    },


    // Mutations
    updateCompanyN(e) {
      this.$store.commit('updateCompanyN', e)
    },
    updateHeadquarters(e) {
      this.$store.commit('updateHeadquarters', e)
    },
    updateDesignationC(e) {
      this.$store.commit('updateDesignationC', e)
    },
    updateName(e) {
      this.$store.commit('updateName', e)
    },
    updateContactNoC(e) {
      this.$store.commit('updateContactNoC', e)
    },
    updateEmailC(e) {
      this.$store.commit('updateEmailC', e)
    },
    updateUsername(e) {
      this.$store.commit('updateUsername', e)
    },
    updatePassword(e) {
      this.$store.commit('updatePassword', e)
    },
    updateStatusC(e) {
      this.$store.commit('updateStatusC', e)
    },

  },
  mounted() {
    this.companyName = this.CName
    this.headquarters = this.CheadQ
    this.designation = this.Cdesignation
    this.contact_name = this.CcontactName
    this.contact_no = this.CcontactNo
    this.contact_email = this.Cemail
    this.company_username = this.Cusername
    this.company_password = this.Cpassword
    this.status = this.Cstatus
  }
}
</script>

<style scoped>
.company-create-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.header h2 {
  color: #393953;
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: 3rem;
  margin-right: 45rem;
  font-family: 'Roboto', sans-serif;
}

.form h3 {
  color: rgba(113, 113, 113, 0.53);
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 20px;
}

form p {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 0rem;
}

.error-message {
  color: #ff0000;
  font-size: 14px;
  margin-top: 4px;
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

.default:hover {
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

.btn-outline-secondary:hover{
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

.btn-outline-dark:hover{
  opacity: 0.8;
}

.username-input, .password-input {
  width: 325px;
}


.creator h2,
.viewer h2 {
  margin-bottom: 1rem;
}

.contact p,
.company p {
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
