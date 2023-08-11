<template>
  <div class="body-container">

    <!--  Navbar-->
    <Navbar></Navbar>

    <!--    Header----------------------------------------->
    <div class="header" style="margin-bottom: 20px;">
      <h1>Create Card</h1>
      <p>You can create a new E- card in here..</p>
    </div>

    <div class="all-container" style="display: flex; justify-content: center">

      <!--    Card Load Component----------------------------------->
      <div class="card-container" style="margin-top: 1rem">
        <div class="front">
          <img class="uploadImage" v-if="frontImage" :src="frontImage"  alt="Upload Image"/>
          <div class="image-upload" @change="onFrontChange" v-else>
            <img class="c-front" src="../assets/card-front.png"  alt=""/><br /><br />
          </div>
        </div>
        <div class="back">
          <img class="uploadImageBack" v-if="backImage" :src="backImage"  alt="Upload Image"/>
          <div class="image-upload" @change="onBackChange" v-else>
            <img class="c-back" src="../assets/card-back.png"  alt=""/><br /><br />
          </div>
        </div>
      </div>

      <!--      Data Input Form----------------------------------------------->
      <div class="form-container" style="margin-left: 24px">
        <form @submit.prevent="createBtn">
          <div class="form" style="margin-left: 50px;">
            <div class="form-group">
              <label class="col-form-label"
                     style=" margin-left: 8px;" >Address*</label>
              <b-input class="form-control1" id="inputText"
                       @input="updateAddress" v-model="address"></b-input>
            </div>
            <div class="form-group">
              <label class="col-form-label"
                     style=" margin-left: 8px;">Website*</label>
              <b-input
                class="form-control1"
                       type="text"
                       id="inputText"
                       @input="updateWebsite"
                       v-model="websites"></b-input>
            </div>
            <div class="form-group">
              <label class="col-form-label"
                     >Comments</label>
              <b-input
                class="form-control1"
                       type="text"
                       id="inputText"
                       @input="updateComments"
                       v-model="comments"></b-input>
            </div>
            <div class="form-group" >
              <label class="col-form-label"
                     style=" margin-left: 8px;" id="inputText">Tags</label>
              <tags v-model="tagArray" ></tags>

            </div>
          </div>
        </form>

        <div class="create-btn-group">
          <b-button @click="backToPrevious" type="button" class="back-btn">BACK</b-button>
          <b-button @click="createBtn" type="submit" class="next-btn">CREATE</b-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";
import {appSettings} from "../appsettings";
import Navbar from "./Navbar.vue";
import Tags from "./tags.vue";
import ActivityLog from "../utils/ActivityLog";

export default {
  name: "create-3",
  props: {
    frontImage: {
      type: String,
      required: true
    },
    backImage:{
      type: String,
      required: true
    },
  },
  components: {
    Tags,
    Navbar,
  },

  data() {
    return {
      address: '',
      websites: '',
      comments: '',
      tags: '',
      tagArray: [],
      tagList:'',
      cardImage: '',
      backCImage:'',
    }
  },

  computed: {
    ...mapState({
      cAddress: state => state.eCard.cardAddress,
      cWebsite: state => state.eCard.cardWebsite,
      cComments: state => state.eCard.cardComments,
      cTags: state => state.eCard.tagList,
    }),
    frontImageUrl() {
      return this.$store.state.eCard.frontImageUrl;
    },
    backImageUrl() {
      return this.$store.state.eCard.backImageUrl;
    },
  },

  watch: {
    address(n, o) {
      this.$store.commit('updateAddress', n)
    },
    website(n, o) {
      this.$store.commit('updateWebsite', n)
    },
    comments(n, o) {
      this.$store.commit('updateComments', n)
    },
    tagList(newTags) {
      this.tagList = newTags
    },
  },

  methods: {
    backToPrevious: function () {
      this.$router.push({
        name:'create-2',
        params: {
          frontImagePath: this.cardImage,
          backImagePath:this.backCImage,
        },
      })
    },

    showData() {
      this.cardImage = this.frontImage
      this.backCImage = this.backImage
    },

    onFrontChange(e) {
      const files = e.target && e.target.files;
      if (files && files.length > 0) {
        this.cardImage = files[0];
        this.frontImage = URL.createObjectURL(files[0]);
      }
    },
    onBackChange(e){
      const files = e.target && e.target.files;
      if (files && files.length > 0) {
        this.backCImage = files[0];
        this.backImage = URL.createObjectURL(files[0]);
      }
    },

    //mutations
    updateAddress(e) {
      this.$store.commit('updateAddress', e)
    },
    updateWebsite(e) {
      this.$store.commit('updateWebsite', e)
    },
    updateComments(e) {
      this.$store.commit('updateComments', e)
    },
    updateTags(tags) {
      this.tagArray = tags;
    },
    created() {
      console.log("Front Image URL:", this.$store.state.eCard.frontImageUrl);
      console.log("Back Image URL:", this.$store.state.eCard.backImageUrl);
    },


    createBtn: function () {
      this.tagList = this.tagArray.toString();
      this.$axios.post(appSettings.$api_url + '/api/ECard/save', {
        name: this.$store.state.eCard.cardFullName,
        company_name: this.$store.state.eCard.cardCompanyName,
        designation: this.$store.state.eCard.cardDesignation,
        email: this.$store.state.eCard.cardEmail,
        email_optional: this.$store.state.eCard.cardEmailOptional,
        contact_no: this.$store.state.eCard.cardContactNo,
        contact_no_optional: this.$store.state.eCard.cardContactNoOptional,
        address: this.$store.state.eCard.cardAddress,
        websites: this.$store.state.eCard.cardWebsite,
        comments: this.$store.state.eCard.cardComments,
        tags: this.tagList,
        front_image: this.$store.state.eCard.frontImageUrl,
        back_image: this.$store.state.eCard.backImageUrl,


      }).then(response => {
        console.log("Save E Card")

        console.log(response)
        this.$buefy.dialog.alert('ECard Created Successfully!')
        ActivityLog.trackActivity('Company Name', 'username', 'Created an E-Card');
        this.$router.push('/creator')

        // reset data properties
        this.address = ''
        this.websites = ''
        this.comments = ''
        this.tagsList = ''


        // reset Vuex store properties
        this.$store.commit('updateFullName', '')
        this.$store.commit('updateCompanyName', '')
        this.$store.commit('updateDesignation', '')
        this.$store.commit('updateEmail', '')
        this.$store.commit('updateEmailOptional', '')
        this.$store.commit('updateContactNo', '')
        this.$store.commit('updateContactNoOptional', '')
        this.$store.commit('updateAddress', '')
        this.$store.commit('updateWebsite', '')
        this.$store.commit('updateComments', '')
        this.$store.commit('updateTags', '')

      })
        .catch(error => {
          console.log(error)
          this.$buefy.dialog.alert({
            title: 'Error',
            message: 'Some Fields are Empty!',
            type: 'is-danger',
            hasIcon: true,
            ariaRole: 'alertdialog',
            ariaModal: true
          })
          this.address = ''
          this.websites = ''
          this.comments = ''
          this.tagsList = ''
          this.$store.commit('updateFullName', '')
          this.$store.commit('updateCompanyName', '')
          this.$store.commit('updateDesignation', '')
          this.$store.commit('updateEmail', '')
          this.$store.commit('updateEmailOptional', '')
          this.$store.commit('updateContactNo', '')
          this.$store.commit('updateContactNoOptional', '')
          this.$store.commit('updateAddress', '')
          this.$store.commit('updateWebsite', '')
          this.$store.commit('updateComments', '')
          this.$store.commit('updateTags', '')
        })
    },


  },
  mounted() {
    this.address = this.cAddress
    this.websites = this.cWebsite
    this.comments = this.cComments
    this.showData();
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Proza+Libre');

/*Header*/
.header {
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

.c-back {
  height: 220px;
  width: auto;
  margin-top: -3rem;
}

.col-form-label{
  font-weight: 500;
  font-size: 18px;
  color: #4B4B4B;
  font-family: 'Roboto', sans-serif;
}

.form{
  width: 50rem;
}

.form-group {
  color: black;
  margin-bottom: 0rem;
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

  .form-control1{
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

  label{
    font-size: 3.5rem;
  }

  input{
    height: 6rem;
    font-size: 3rem;
  }
}

</style>




