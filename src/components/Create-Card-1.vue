<template>
  <div class="body-container">

    <!--    Navbar-->
    <Navbar></Navbar>

<!--    Header----------------------------------------->
    <div class="header" style="margin-bottom: 20px;">
      <h1>Create Card</h1>
      <p>You can create a new E- card in here..</p>
    </div>


    <div class="all-container" style="display: flex; justify-content: center">

      <!--    Card Load Component----------------------------------->
      <div class="card-container">
          <div class="front">

              <img class="uploadImage" v-if="frontImagePath" :src="frontImagePath"  alt="Upload Image"/>
              <div class="image-upload" @change="onFrontChange" v-else>
                <img class="c-front" src="../assets/card-front.png"  alt=""/><br /><br />
              </div>

          </div>
          <div class="back">
            <img class="uploadImageBack" v-if="backImagePath" :src="backImagePath"  alt="Upload Image"/>
            <div class="image-upload" @change="onBackChange" v-else>
              <img class="c-back" src="../assets/card-back.png"  alt=""/><br /><br />
            </div>

          </div>
      </div>

<!--      Data Input Form----------------------------------------------->
      <div class="form-container" style="margin-left: 24px">
        <form @submit.prevent="nextBtn">
          <div class="form" style="margin-left: 50px;">
            <div class="form-group">
              <label class="form-label"
                     style="margin-bottom: 4px; margin-left: 8px;" >Name<a class="has-text-danger"> *</a></label>
              <b-input class=" form-control1"
                       style="margin-bottom: 5px; border-radius: 45px" type="text"
                       placeholder=""
                       id="Name"
                       @input="updateFullName"
                       v-model="fullName"></b-input>
              <span v-if="!isValidName" class="error-message">Please enter a valid type of data.</span>
            </div>

            <div class="company">
              <div class="form-group" id="company">
                <label class="form-label"
                       style="margin-bottom: 4px; margin-left: 8px;" >Company Name<a class="has-text-danger"> *</a></label>
                <b-input class=" form-control1"
                         style="margin-bottom: 5px; border-radius: 45px"
                         type="text"
                         placeholder=""
                         id="Company"
                         @input="updateCompanyName"
                         v-model="companyName"></b-input>
              </div>
              <div class="form-group" id="designation">
                <label class="form-label"
                       style="margin-bottom: 4px; margin-left: 8px;" >Designation<a class="has-text-danger"> *</a></label>
                <b-input class=" form-control1"
                         style="margin-bottom: 5px; border-radius: 45px"
                         type="text"
                         placeholder=""
                         id="Designation"
                         @input="updateDesignation"
                         v-model="designation"></b-input>
              </div>
            </div>

            <div class="email">
              <div class="form-group" id="email">
                <label class="form-label"
                       style="margin-bottom: 4px; margin-left: 8px;" >Email<a class="has-text-danger"> *</a></label>
                <b-input class=" form-control1" type="text"
                         style="margin-bottom: 5px; border-radius: 45px"
                         placeholder=""
                         id="Email"
                         @input="updateEmail"
                         v-model="email"></b-input>
                <span v-if="!isValidEmail" class="error-message">Please enter a valid email address.</span>
              </div>
              <div class="form-group" id="email">
                <label class="form-label"
                       style="margin-bottom: 4px; margin-left: 8px;">Email (Optional)</label>
                <b-input class=" form-control1"
                         type="text" style="margin-bottom: 5px; border-radius: 45px"
                         placeholder=""
                         id="EmailOptional"
                         @input="updateEmailOptional"
                         v-model="emailOptional"></b-input>
                <span v-if="!isValidEmail" class="error-message">Please enter a valid email address.</span>
              </div>
            </div>

            <div class="contact">
              <div class="form-group" id="contact">
                <label class="form-label"
                       style="margin-bottom: 4px; margin-left: 8px;" >Contact No.<a class="has-text-danger"> *</a></label>
                <b-input class=" form-control1"
                         type="text" style="margin-bottom: 5px; border-radius: 45px"
                         placeholder=""
                         id="contactNo"
                         @input="updateContactNo"
                         v-model="contactNo"></b-input>
                <span v-if="!isValidContactNo" class="error-message">Please enter a valid Mobile Number</span>
              </div>
              <div class="form-group" id="contact">
                <label class="form-label"
                       style="margin-bottom: 4px; margin-left: 8px;" >Contact No. (Optional)</label>
                <b-input class=" form-control1"
                         type="text" style="margin-bottom: 5px; border-radius: 45px"
                         placeholder=""
                         id="contactNoOptional"
                         @input="updateContactNoOptional"
                         v-model="contactNoOptional"></b-input>
              </div>
            </div>
          </div>
        </form>

        <div  class="create-btn-group">
          <b-button @click="backBtn" class="back-btn">BACK</b-button>
          <b-button @click="nextBtn" type="submit" class="next-btn">NEXT</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import ImageUploadComp from "./Image-Upload-Comp.vue";
import {mapState} from "vuex";
import Navbar from "./Navbar.vue";


export default {
  name: "create-2",
  props: {
    frontImagePath: {
      type: String,
      required: true
    },
    backImagePath:{
      type: String,
      required: true
    },
  },
  computed: {

    ...mapState({
      fName: state => state.eCard.cardFullName,
      cName: state => state.eCard.cardCompanyName,
      cDesignation: state => state.eCard.cardDesignation,
      cEmail: state => state.eCard.cardEmail,
      cEmailOptional: state => state.eCard.cardEmailOptional,
      cContactNo: state => state.eCard.cardContactNo,
      cContactNoOptional: state => state.eCard.cardContactNoOptional,
      ...mapState(["frontImageUrl", "backImageUrl"]),
    }),
    isValidEmail() {
      return /^[\w\.-]+@gmail\.com$/.test(this.email);
    },
    isValidContactNo() {
      return /^[0-9]{10}$/.test(this.contactNo);
    },
    isValidName(){
      return /^[A-Za-z0-9]+$/.test(this.fullName);
    }
  },


  created() {
    console.log("Front Image URL:", this.$store.state.eCard.frontImageUrl);
    console.log("Back Image URL:", this.$store.state.eCard.backImageUrl);
  },
  watch: {
    fullName(n, o) {
      this.$store.commit('updateFullName', n)
    },
    companyName(n, o) {
      this.$store.commit('updateCompanyName', n)
    },
    designation(n, o) {
      this.$store.commit('updateDesignation', n)
    },
    email(n, o) {
      this.$store.commit('updateEmail', n)
    },
    emailOptional(n, o) {
      this.$store.commit('updateEmailOptional', n)
    },
    contactNo(n, o) {
      this.$store.commit('updateContactNo', n)
    },
    contactNoOptional(n, o) {
      this.$store.commit('updateContactNoOptional', n)
    },
  },

  components: {
    ImageUploadComp,
    Navbar
  },
  data() {
    return {
      fullName: null,
      companyName: null,
      designation: null,
      email: null,
      emailOptional: null,
      contactNo: null,
      contactNoOptional: null,
      cardImage:'',
      backCImage:'',
    }
  },
  methods: {

    backBtn() {
      this.$router.push({
        name: 'create-1',
        params: {
          frontUrl: this.cardImage,
          backUrl:this.backCImage,

        },
      });
    },
    nextBtn() {

      if(this.fullName && this.companyName && this.designation && this.isValidEmail && this.isValidContactNo ){
        this.fullName = ''
        this.companyName = ''
        this.designation = ''
        this.email = ''
        this.emailOptional = ''
        this.contactNo = ''
        this.contactNoOptional = ''


        this.$router.push({
          name: "create-3",
          params: {
            frontImage: this.cardImage,
            backImage:this.backCImage,
          },
        });
      }else {
        this.$buefy.dialog.alert({
          title: "Error",
          message: "Some fields are empty or contain invalid data.",
          type: "is-danger",
          hasIcon: true,
          ariaRole: "alertdialog",
          ariaModal: true,
        });
      }


    },


    showData() {
      this.cardImage = this.frontImagePath
      this.backCImage = this.backImagePath
    },

    onFrontChange(e) {
      const files = e.target && e.target.files;
      if (files && files.length > 0) {
        this.image = files[0];
        this.frontImagePath = URL.createObjectURL(files[0]);
      }
    },
    onBackChange(e){
      const files = e.target && e.target.files;
      if (files && files.length > 0) {
        this.backCImage = files[0];
        this.backImagePath = URL.createObjectURL(files[0]);
      }
    },

    //mutations..............
    updateFullName(e) {
      this.$store.commit('updateFullName', e)
    },
    updateCompanyName(e) {
      this.$store.commit('updateCompanyName', e)
    },
    updateDesignation(e) {
      this.$store.commit('updateDesignation', e)
    },
    updateEmail(e) {
      this.$store.commit('updateEmail', e)
    },
    updateEmailOptional(e) {
      this.$store.commit('updateEmailOptional', e)
    },
    updateContactNo(e) {
      this.$store.commit('updateContactNo', e)
    },
    updateContactNoOptional(e) {
      this.$store.commit('updateContactNoOptional', e)
    }
  },
  mounted() {

    this.fullName = this.fName
    this.companyName = this.cName
    this.designation = this.cDesignation
    this.email = this.cEmail
    this.emailOptional = this.cEmailOptional
    this.contactNo = this.cContactNo
    this.contactNoOptional = this.cContactNoOptional
    this.showData();
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Proza+Libre');

.header{
  padding: 0px;
  text-align: center;
}

.header h1 {
  font-family: "Century Gothic";
  color: #393953;
  font-size: 45px;
  font-weight: 700;
}

.uploadImage{
  width: 461px;
  height: auto;
}

.uploadImageBack{
  width: 189px;
  height: auto;
  margin-top: 1rem;
}

.c-front {
  height: auto;
  width: 411px;
}

.form-label{
  font-weight: 500;
  font-size: 18px;
  color: #4B4B4B;
  font-family: 'Roboto', sans-serif;
}

.error-message {
  color: #ff0000;
  font-size: 14px;
  margin-top: 4px;
}

.c-back {
  height: auto;
  width: 220px;
  margin-top: -3rem;
}

.form{
  width: 50rem;
}

.form-group {
  color: black;
  margin-bottom: 0rem;
}

.company,
.email,
.contact
{
  display: flex;
  justify-content: space-between;
}

#company, #designation, #email, #contact{
  width: 48.5%;
}

.back-btn {
  color: #1E1E1E;
  padding: revert;
  border-radius: 30px;
  width: 164px;
  margin-left: 10px;
  border-color: #1E1E1E;
}

.next-btn {
  display: flex;
  margin-left: 72px;
  width: 561px;
  border-radius: 30px;
  background: #1E1E1E;
  color: #FFFFFF;
}

.create-btn-group{
  display: flex;
  float: right;
  margin-top: 3rem;
  margin-left: 45px;
}

@media screen and (max-width: 360px) {

  .body-container{
    display: flex;
    flex-direction: column;
    width: 73rem;
  }

  .all-container{
    flex-direction: column;
    margin-right: 1.3rem;
  }

  .header h1{
    font-size: 6rem;
  }

  .header p{
    font-size: 3rem;
  }

  .card-container{
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
    margin-bottom: 5rem;
  }

  .front, .back{
    width: 80%;
  }

  .uploadImage, .c-back{
    height: auto;
    width: 1080px;
  }

  .uploadImageBack{
    width: 53rem;
  }

  .form{
    margin-left: 50px;
    margin-right: 50px;
  }

  input{
    height: 3rem;
    font-size: 4rem;
  }

  #company, #designation, #email, #contact{
    width: 100%;
  }

  .company, .email, .contact{
    display: flex;
    flex-direction: column;
  }

  .form-control1,
  .form-label {
    font-size: 3.5rem !important;
  }

  .form-group{
    margin-bottom: 4rem;
  }

  .create-btn-group{
    margin-bottom: 4rem;
  }

  .back-btn, .next-btn{
    font-size: 3rem;
  }

}

</style>
