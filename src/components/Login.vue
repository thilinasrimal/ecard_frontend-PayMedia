<template>
  <div class="body-container" style="margin-top: 0px;">
    <!--    NavBar-->
    <div class="navigation-bar-container">
      <b-navbar>
        <template #brand>
          <b-navbar-item>
            <img class="logo" src="../assets/Images/logo.png" height="auto" width="auto" alt=""/>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>


    <b-notification
      auto-close
      v-model="isActive"
      id="alert"
      type="is-danger is-light"
      aria-close-label="Close notification"
      role="alert">
      Username or Password is invalid!
    </b-notification>

    <div class="title-container">

      <!--      toggle button text-->
      <div class="title" id="container-front">
        <img class="backImage" src="../assets/Images/Group.png" height="auto" width="650" alt=""/>
        <h1 v-if="this.uType==='ADMIN'|| this.uType==='COMPANY'">{{ title3 }}</h1>
        <h1 v-if="this.uType==='CREATOR'">{{ title2 }}</h1>
        <h1 v-if="this.uType==='VIEWER'">{{ title1 }}</h1>
        <h1><b style="font-family: 'Century Gothic'">Welcome </b>Back...</h1>

      </div>
      <!--      Login form-->
      <div class="login-container">
        <div class="container-login">
          <div>
            <img class="watermark" src="../assets/Images/PayMedia.png" height="auto" width="390" alt=""/>
            <h1><b style="font-family: 'Century Gothic'">Sign In</b></h1>
          </div>

          <!--            Username-->
          <form @submit.prevent>
            <div class="form-group">
              <label class="form-label">Username</label>
              <b-input required type="email" class="input-login" id="email" aria-describedby="emailHelp"
                       style="font-family: 'Roboto',serif"
                       placeholder="Enter Username Here"  v-model="username"
              ></b-input>
            </div>
            <!--          Password-->
            <div class="form-group">
              <label class="form-label">Password</label>
              <b-input required type="password" class="input-login" id="password" password-reveal placeholder="Enter Password Here"
                       style="font-family: 'Roboto',serif"
                       v-model="password"></b-input>
            </div>
          </form>
          <b-button @keydown.enter="handleSubmit" @click="handleSubmit" :disabled="!username || !password" type="button" class="btn btn-outline-dark">SIGN IN</b-button>
        </div>
      </div>
    </div>

    <!--      Background Image-->
    <div class="background-image-container">
      <img src="../assets/BackPic.png" height="auto" width="750" alt=""/>
    </div>

    <!--    Footer-->
    <div class="footer-container" style="display: flex; justify-content: center">
      <p style="font-weight: 300">Copyright ©2023 PayMedia. All Rights Reserved</p>
    </div>

  </div>
</template>

<script>

import ActivityLog from "../utils/ActivityLog";
import {appSettings} from "../appsettings";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {

      //Headers
      title1: 'Hello Viewer,',
      title2: 'Hello Creator,',
      title3: 'Hello Admin',

      //user_credentials
      username: '',
      password: '',
      userType:'',
      isActive: false,
      uType:'',
    }
  },

  methods: {

    handleSubmit: function () {
      if (this.username && this.password) {
        axios
          .post(appSettings.$api_url + '/api/Auth/login', {
            Username: this.username,
            Password: this.password,
          })
          .then((res) => {

            console.log(res);

            if (res.status === 200) {
              this.userType = res.data.data.user_type;

              this.$buefy.notification.open({
                message: 'Sign In Successful!',
                type: 'is-success',
              });

              if (this.userType === 'ADMIN' || this.userType === 'COMPANY') {
                this.$router.push({
                  name: 'Admin-view',
                  params: {
                    userName: this.username,
                    user: this.userType,
                  },
                });
              } else if (this.userType === 'CREATOR') {
                this.$router.push({
                  name: 'Creator',
                });
              } else if (this.userType === 'VIEWER') {
                this.$router.push({
                  name: 'Viewer',
                });
              }
            } else {

              this.$buefy.notification.open({
                message: 'Username or Password is invalid!',
                type: 'is-danger',
              });
              this.username = '';
              this.password = '';
            }
          })
          .catch((error) => {

            this.$buefy.notification.open({
              message: 'Invalid Credentials!',
              type: 'is-danger',
            });
            this.username = '';
            this.password = '';
          });

        ActivityLog.trackActivity('Company Name', this.username, 'Logged in');
      } else if(this.username===''|| this.password===''){

        this.$buefy.notification.open({
          message: 'Enter Username & Password to Sign up!',
          type: 'is-warning',
        });
        this.username = '';
        this.password = '';
      }else {
        this.$buefy.notification.open({
          message: 'Invalid Credentials!',
          type: 'is-danger',
        });
        this.username = '';
        this.password = '';
      }
    },

    getUserType(u) {
      axios.get(`${appSettings.$api_url}/api/Users/username/${u}`)
        .then((res) => {
          // console.log(res.data.data.newUser.user_type)
          this.uType = res.data.data.newUser.user_type;
          console.log("User Type:", this.uType);

          if (this.uType === 'ADMIN' || this.uType === 'COMPANY') {
            this.title3 = 'Hello Admin';
          } else if (this.uType === 'CREATOR') {
            this.title2 = 'Hello Creator';
          } else if (this.uType === 'VIEWER') {
            this.title1 = 'Hello Viewer';
          }
        })
        .catch((error) => {
          console.error("Error fetching user type:", error);
        });
    }
  },
  watch: {
    username(newUsername) {
      if (newUsername) {
        this.getUserType(newUsername);
      }
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

h1 {
  font-family: "Century Gothic";
}

@import url('https://fonts.googleapis.com/css?family=Proza+Libre');

.form-label {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}

body {
  margin: 0;
}

.title-container {
  display: flex;
  flex-direction: row;
}

.title {
  margin-left: 20px;
  width: 50%;
}

.backImage {
  position: absolute;
  top: 10%;
}

.login-container {
  margin-bottom: 10px;
  width: 50%;
}

#container-front h1 {
  color: black;
  font-size: 4rem;
}

#container-login input {
  padding: 0.5rem;
  padding-inline-end: 8%;
  border-radius: 1rem;
  border: none;
  margin-bottom: 1rem;
  width: 100%;
}

.container-login label {
  color: black;
  margin-bottom: 0.5rem;
}

.container-login h1 {
  color: black;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
}

.watermark{
  margin-left: 34px;
  margin-bottom: -37px;
}

.form-group {
  width: 80%;
  margin-bottom: 1rem;
  margin-left: 20px;
}

.btn-outline-dark {
  font-size: initial;
  border-radius: 3rem;
  background: black;
  color: antiquewhite;
  padding: 1rem;
  margin-top: 2%;
  width: 40%;
  float: right;
  margin-right: 15%;
}

.container-login {
  padding: 2% 5%;
  max-width: 80%;
  margin: auto;
}

.background-image-container {
  margin-top: -2rem;
}

.footer p {
  color: black;
  font-size: small;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
}


@media screen and (max-width: 360px) {

  .a navbar-burger burger {
    display: none;
  }

  #container-front h1 {
    font-size: 6rem;
  }

  .navigation-bar-container {
    margin-bottom: 4rem;
  }

  .navbar-brand img {
    width: 25rem;
    height: auto;
    max-height: 40rem;
  }

  .background-image-container {
    margin-top: 11rem;
  }

  .body-container {
    display: flex;
    flex-direction: column;
    width: 63rem;
  }

  .backImage {
    display: none;
  }

  .title-container {
    display: flex;
    flex-direction: column;
  }

  .title {
    width: 100%;
    margin-left: 8rem;
    margin-top: 2rem;
  }

  .login-container {
    width: 100%;
    margin-top: 8rem;
  }

  .login-container h1 {
    font-size: 6rem;
  }

  .form-label {
    font-size: 5rem;
  }

  .input-login {
    height: 4rem !important;
    margin-bottom: 4rem;
    width: 43rem;
  }

  /* Increase the font size of the input areas */
  .input-login,
  .form-label {
    font-size: 4rem !important;
    margin-bottom: 8rem;
  }


  .watermark {
    width: 56rem;
    margin-left: -5rem;
    height: auto;
  }

  .btn-outline-dark {
    width: 46%;
    font-size: 3.5rem;
    margin-right: 0;
  }

  .container-login {
    margin-left: 12rem;
  }

  #container-login input {
    font-size: 3rem;
  }

  .background-image-container img {
    width: 1132px;
  }

  .footer-container p {
    margin-left: 8rem;
  }

  .footer-container p {
    font-size: 2rem;
  }
}

</style>
