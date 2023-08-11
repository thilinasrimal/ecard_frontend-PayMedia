<template>
  <div class="container">

    <Navbar></Navbar>

    <div class="header">
      <h1 class="head" style="font-weight: bold; font-family: 'Century Gothic'">Create Card</h1>
      <h4 class="sub-head">Create your E-Card here....</h4>
    </div>


    <div class="row-2">
      <div class="column-2">
        <h6  id="title" style="font-weight: bold; color: #1E1E1E">Upload front page of the card</h6>
        <div class="img-box">
          <Image-Upload-Comp
            v-model="frontImageC"
            :image-height="imageHeight"
            :image-validations="imageValidations"
            :placeholder_image="placeholder_image"
            @on-upload="onUploadFront"
          ></Image-Upload-Comp>
        </div>
        <p id="tag" style="margin-top: 2px">Upload Image Maximum Size:2MB</p>
        <p id="tag">Supports: JPG, JPEG2000, PNG</p>
      </div>

      <div class="column-2">

        <!--          Card back photo------------------------>
        <h6 id="title" style="font-weight: bold; color: #1E1E1E">Upload rear page of the card</h6>

        <div class="img-box">
          <Image-Upload-Comp
            v-model="backImageC"
            :image-height="imageHeight"
            :image-validations="imageValidations"
            :placeholder_image="placeholder_image"
            @on-upload="onUploadBack"
          ></Image-Upload-Comp>
        </div>
        <p id="tag" style="margin-top: 2px">Upload Image Maximum Size:2MB</p>
        <p id="tag">Supports: JPG, JPEG, PNG</p>
      </div>
    </div>


    <div class="btn-container">
      <button @click="backBtn" class="back-btn">BACK</button>
      <button @click="continueBtn" class="continue-btn">CONTINUE</button>
    </div>
  </div>
</template>

<script>


import Navbar from "./Navbar.vue";
import ImageUploadComp from "./Image-Upload-Comp.vue"
import axios from "axios";
import {appSettings} from "../appsettings";


export default {
  name: 'create-1',

  data() {
    return {
      frontImageC: null,
      backImageC: null,
      frontUrl: '',
      backUrl: '',
      frontImageBase64: '',
      backImageBase64: '',
      imageHeight: 200,
      imageValidations: {maxWidth: 0, maxHeight: 0, maxSize: 0},
      placeholder_image: require('../assets/Icon/upload.png'),
    }
  },
  components: {
    Navbar,
    ImageUploadComp,
  },


  methods: {
    continueBtn() {
      if (this.frontImageC && this.backImageC) {

        const timestamp = new Date().getTime();

        const frontImageFilename = `${timestamp}_front.png`;
        const backImageFilename = `${timestamp}_back.png`;

        this.uploadFrontImage(this.frontImageBase64, frontImageFilename);
        this.uploadBackImage(this.backImageBase64, backImageFilename);


        this.$router.push({
          name: 'create-2',
          params: {
            frontImagePath: this.frontImageC,
            backImagePath: this.backImageC,
          },
        })
      } else {
        // console.error('Front and back images must be selected.');
        this.$buefy.dialog.alert({
          title: 'Error',
          message: 'Front and back images must be selected!',
          type: 'is-danger',
          hasIcon: true,
          ariaRole: 'alertdialog',
          ariaModal: true
        })
      }
    },

    async uploadFrontImage(imageFile, filename) {
      try {
        const formData = new FormData();
        formData.append('base64', imageFile);
        formData.append('filename', filename);

        const response = await axios.post(
          appSettings.$api_url + '/api/ImageUpload/upload',
          formData
        )

        this.frontUrl = response.data.data.imageLink;
        this.$store.commit('setFrontImageUrl', this.frontUrl);
        console.log(this.frontUrl);


      } catch (error) {
        console.error('Error uploading front image:', error);
      }
    },

    async uploadBackImage(imageFile, filename) {
      try {
        const formData = new FormData();
        formData.append('base64', imageFile);
        formData.append('filename', filename);

        const response = await axios.post(
          appSettings.$api_url + '/api/ImageUpload/upload',
          formData
        );

        this.backUrl = response.data.data.imageLink;
        console.log(this.backUrl);
        this.$store.commit('setBackImageUrl', this.backUrl);

      } catch (error) {
        console.error('Error uploading back image:', error);
      }
    },


    onUploadFront: function (data) {
      this.frontImageC = data.blob
      this.frontImageBase64 = data.image
    },

    onUploadBack: function (data) {
      this.backImageC = data.blob
      this.backImageBase64 = data.image
    },

    backBtn() {
      this.$router.push({name: 'Creator'})
    },
  },
  mounted() {

  }

}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Proza+Libre');
.column-2 {
  float: left;
  width: 50%;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

h6 {
  margin-bottom: 2rem;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
}

.header{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.head{
  font-size: 2.5rem;
}

.sub-head{
  font-family: 'Roboto', sans-serif;
  color: #767676;
  font-size: 19px;
}

#tag {
  font-size: 14px;
}

#title{
  padding-inline: 33.33%;
  color: black;
  padding-left: 150px;
}

.column-2 label {
  padding-inline: 33.33%;
  color: lightseagreen;
}

.column-2 label h6 {
  padding: 33.33%;
}

.img-box {
  border: dotted;
  overflow: hidden;
  padding-top: 3rem;
  border-radius: 10px;
  border: #919191;
  border-style: dashed;
  display: flex;
  justify-content: center;
  padding-bottom: 3rem;
}

.back-btn {
  color: #1E1E1E;
  margin-right: 10px;
  border-radius: 45px;
  background: border-box;
  padding-inline: 70px;
  border-color: #1E1E1E;
  font-weight: 500;
  padding-top: 6px;
  padding-bottom: 5px;
}
.back-btn:hover{
  background-color: #dcdbdb;
}

.continue-btn {
  display: flex;
  margin-left: 28px;
  padding-inline: 65px;
  font-size: initial;
  border-radius: 45px;
  background: #1E1E1E;
  color: antiquewhite;
  font-weight: 500;
  padding-top: 6px;
  padding-bottom: 5px;
}

.continue-btn:hover{
  opacity: 90%;
}

.btn-container {
  display: inline-flex;
  float: right;
  margin-top: 3%;
  margin-right: 12px;
  margin-bottom: 2rem;
}

@media screen and (max-width: 360px) {

  .header h1 {
    font-size: 8rem;
  }

  .header p {
    font-size: 3rem;
  }

  .row-2 {
    display: flex;
    flex-direction: column;
  }

  .column-2 {
    width: 100%;
  }

  h6 {
    font-size: 3.4rem;
  }

  .img-box {
    padding-top: 10px;
    border-radius: 20px;
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
  }

  #tag {
    font-size: 2.7rem;
  }

  .head{
    font-size: 4rem;
  }

  .sub-head{
    font-size: 2.5rem;
  }

  #title{
    padding: 10%;
  }

  .btn-container {
    margin-left: 18%;
    margin-bottom: 3rem;
  }

  .back-btn {
    font-size: 3rem;
    border: 3px solid black;
  }

  .continue-btn {
    font-size: 3rem;
  }

  .a navbar-burger burger {
    display: none;
  }

  .modal-card animation-content {
  //width: 56rem; //height: 25rem; //max-width: 200%;
  }


}
</style>
