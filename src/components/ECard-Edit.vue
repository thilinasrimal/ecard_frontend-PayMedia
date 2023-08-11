<template>
  <div class="body-container">

    <!--    Navbar-->
    <Navbar></Navbar>

    <!--    Header----------------------------------------->
    <div class="header">
      <h1 style="font-family: 'Century Gothic'">Edit Card</h1>
      <p>You can update E- card in here..</p>
    </div>


    <div class="all-container" style="display: flex; justify-content: center">

      <!--    Card Load Component----------------------------------->
      <div class="card-container" style="margin-top: 25px;">
        <div class="front">
          <img class="c-front" :src=getCardFImage(EditData) height="411" width="679"/>
        </div>
        <div class="back">
          <img class="c-back" :src=getCardBImage(EditData) height="158" width="238"/>
        </div>
      </div>

      <!--      Data Input Form----------------------------------------------->
      <div class="form-container" >
        <form @submit.prevent="updateCard" >
          <div class="form" style="margin-left: 50px;">
            <div class="form-group">
              <label class="form-label"
                     style=" margin-left: 8px;">Name*</label>
              <b-input class=" form-control1"
                       type="text"
                       placeholder=""
                       id="Name"
                       v-model="EditData.name"></b-input>
            </div>

            <div class="company">
              <div class="form-group" id="company">
                <label class="form-label"
                       style=" margin-left: 8px;">Company Name*</label>
                <b-input class=" form-control1"
                         type="text"
                         placeholder=""
                         id="Company"
                         v-model="EditData.company_name"></b-input>
              </div>
              <div class="form-group" id="designation">
                <label class="form-label"
                       style=" margin-left: 8px;">Designation*</label>
                <b-input class=" form-control1"
                         type="text"
                         placeholder=""
                         id="Designation"
                         v-model="EditData.designation"></b-input>
              </div>
            </div>

            <div class="email">
              <div class="form-group" id="email">
                <label class="form-label"
                       style=" margin-left: 8px;">Email*</label>
                <b-input class=" form-control1" type="text"
                         placeholder=""
                         id="Email"
                         v-model="EditData.email"></b-input>
              </div>
              <div class="form-group" id="email">
                <label class="form-label"
                       style=" margin-left: 8px;">Email (Optional)</label>
                <b-input class=" form-control1"
                         type="text"
                         placeholder=""
                         id="EmailOptional"
                         v-model="EditData.email_optional"></b-input>
              </div>
            </div>

            <div class="contact">
              <div class="form-group" id="contact">
                <label class="form-label"
                       style=" margin-left: 8px;">Contact No.*</label>
                <b-input class=" form-control1"
                         type="text"
                         placeholder=""
                         id="contactNo"
                         v-model="EditData.contact_no"></b-input>
              </div>
              <div class="form-group" id="contact">
                <label class="form-label"
                       style=" margin-left: 8px;">Contact No. (Optional)</label>
                <b-input class=" form-control1"
                         type="text"
                         placeholder=""
                         id="contactNoOptional"
                         v-model="EditData.contact_no_optional"></b-input>
              </div>
            </div>
            <div class="form-group">
              <label class="col-form-label"
                     style=" margin-left: 8px;">Address*</label>
              <b-input class="form-control1" id="inputText"
                        v-model="EditData.address"></b-input>
            </div>
            <div class="contact">
              <div class="form-group" id="website">
                <label class="col-form-label"
                       style=" margin-left: 8px;">Website*</label>
                <b-input
                  class="form-control1"
                  type="text"
                  id="inputText"
                  v-model="EditData.websites"></b-input>
              </div>
              <div class="form-group" id="comments">
                <label class="col-form-label"
                       style=" margin-left: 8px;">Comments</label>
                <b-input
                  class="form-control1"
                  type="text"
                  id="inputText"
                  v-model="EditData.comments"></b-input>
              </div>
            </div>
            <div class="form-group">
              <label class="col-form-label"
                     style=" margin-left: 8px;" id="inputText">Tags</label>
              <tags v-model="tagArray"></tags>
            </div>
          </div>
        </form>

        <div class="create-btn-group" style="display: flex;
                margin-left: 40px;
                margin-top: 25px;
                margin-bottom: 10px">
          <b-button @click="cancelBtn" class="back-btn">CANCEL</b-button>
          <b-button @click="updateCard" type="submit" class="next-btn">UPDATE</b-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ImageUploadComp from "./Image-Upload-Comp.vue";
import Navbar from "./Navbar.vue";
import Tags from "./tags.vue";
import {appSettings} from "../appsettings";
import axios from "axios";
import ActivityLog from "../utils/ActivityLog";

export default {
  name: "ECard-Edit",
  props: {
    cardData: {
      type: Object,
      required: true
    }
  },

  components: {
    Tags,
    ImageUploadComp,
    Navbar
  },

  data() {
    return {
      fullName: '',
      companyName: '',
      designation: '',
      email: '',
      emailOptional: '',
      contactNo: '',
      contactNoOptional: '',
      address: '',
      websites: '',
      comments: '',
      tags:'',
      newArray:'',
      EditData: {
        tags: ''
      },
      tagArray: []
    }
  },


  methods: {
    cancelBtn() {
      this.$router.push({name: 'Viewer'});
    },

    showData() {
      this.EditData = {...this.cardData}

    },

    updateCard: function () {

      const id = this.cardData.id;
      this.EditData.tags = this.tagArray.join(",");

      axios.put(`${appSettings.$api_url}/api/ECard/${id}`, this.EditData)
        .then(response => {
          // console.log("Update E Card");
          // console.log(response);
          this.$buefy.notification.open({
            message: 'Update Successful!',
            type: 'is-success',
          });
          ActivityLog.trackActivity('Company Name', this.username, 'Updated an E-Card');
        })
        .catch(error => {
          console.error(error);
        });
      this.$router.push({name: 'Viewer'})
      this.$emit("callBackLoad")
    },

    getCardFImage(eCard) {
      return eCard && eCard.front_image
        ? appSettings.$api_url + eCard.front_image
        : require("../assets/Images/image 3.png");
    },

    getCardBImage(eCard) {
      return eCard && eCard.back_image
        ? appSettings.$api_url + eCard.back_image
        : require("../assets/Images/image 3.png");
    },


  },

  mounted() {
    this.showData();
    this.tagArray = this.EditData.tags.split(",").map(tag => tag.trim());
  }
}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Proza+Libre');
p {
  font-family: 'Roboto', sans-serif;
  color: #5A5A5A;
  font-weight: 300;
}

.header {
  text-align: center;
  margin-bottom: 1rem;
}

.header h1 {
  color: black;
  font-size: 2rem;
  font-weight: bold;
}

.c-front {
  height: 239px;
  width: auto;
}

.c-back {
  height: 201px;
  width: auto;
  margin-top: 12px;
}

.form-group {
  color: black;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}

.company,
.email,
.contact {
  display: flex;
  justify-content: space-between;
}

#company, #designation, #email, #contact, #website, #comments{
  width: 48.5%;
}

.back-btn {
  color: black;
  padding: revert;
  margin-right: 10px;
  border-radius: 30px;
  padding-inline: 40px;
  margin-left: 10px;
  border: groove;
}

.next-btn {
  display: flex;
  margin-left: 28px;
  padding-inline: 170px;
  border-radius: 30px;
  background: black;
  color: antiquewhite;
}

@media screen and (max-width: 360px) {

  .body-container {
    display: flex;
    flex-direction: column;
    width: 73rem;
  }

  .all-container {
    flex-direction: column;
  }

  .header h1 {
    font-size: 6rem;
  }

  .header p {
    font-size: 3rem;
  }

  .card-container {
    display: flex;
    flex-direction: column;
  }

  .front, .back {
    width: 80%;
  }

  .c-front, .c-back {
    height: auto;
    width: 1080px;
  }

  .form {
    margin-left: 50px;
    margin-right: 50px;
  }

  input {
    height: 3rem;
    font-size: 4rem;
  }

  #company, #designation, #email, #contact {
    width: 100%;
  }

  .company, .email, .contact {
    display: flex;
    flex-direction: column;
  }

  .form-control1,
  .form-label {
    font-size: 3rem !important;
  }

  .form-group {
    margin-bottom: 4rem;
  }

  .create-btn-group {
    margin-bottom: 4rem;
  }

  .back-btn, .next-btn {
    font-size: 2.5rem;
  }

}
</style>
