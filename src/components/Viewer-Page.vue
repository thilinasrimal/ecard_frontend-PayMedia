<template>
  <div class="body-container">
    <!--Navbar-->
    <Navbar></Navbar>

    <!--    first row-->
    <div class="latest-container" style="display: flex; margin-bottom: 5rem">
      <!--    first info column-->
      <div class="info-column">
        <div class="front-text">
          <h1 class="title" style="font-family: 'Century Gothic'">Stay <b>Connect</b></h1>
          <h1 class="title" style="font-family: 'Century Gothic'">with <b>Customers</b></h1>
          <button @click="viewAllCards" class="btn-outline-dark" ><b>ALL</b> CARDS</button>
        </div>
      </div>

      <!--Latest card row-->
      <div class="container-latestCards">
        <div class="latest-head">
          <p style="font-family: 'Century Gothic'"><b>Latest</b> Cards</p>
        </div>

        <div class="container-cards">
          <div class="container-cards" style="overflow-x: auto">
            <div class="latestCard-container" style="display: flex; flex-direction: row;">
              <!--              <Ecard></Ecard>-->
              <div class="column-LatestCard" v-for="eCard in ecards">
                <div class="latestCard-img">
                  <img class="card-latest" :src=getCardBImage(eCard) height="auto" width="200"/>
                </div>
                <p class="company_name" style="font-family: 'Century Gothic'">{{ eCard.company_name }}</p>
                <h1 class="title2" style="margin-left: 15%; font-weight: bold; font-family: 'Century Gothic'; ">{{ eCard.name }}</h1>
                <p class="designation" style="float: right; margin-top: 4px; font-family: 'Century Gothic';">{{ eCard.designation }}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="background-images mt-3">
      <img class="background-image-1" src="../assets/Images/Group 289355.png" width="450" height="auto" alt=""/>
      <img class="background-image-3" src="../assets/PayMediaTrans.png" height="auto" width="850"/>
      <img class="background-image-2" src="../assets/Images/dds.png"  width="1200" height="auto" alt=""/>
    </div>


    <!--    All Cards-->
    <div ref="bottom" class="all-cards" id="viewAll">
      <div class="all-cards-header">
        <img class="keepInTouch" src="../assets/Images/Keep in touch.png" height="100" width="auto"/>
        <h3 class="ecard_heading" style="font-family: 'Century Gothic'"><b>E-cards</b></h3>
      </div>

      <div class="all-card-header">
        <p style="font-family: 'Century Gothic'"><b>All</b> Cards</p>

        <div class="search-btn">
          <form class="d-flex">
            <input class="form-control" placeholder="Search" id="myInput" v-model="searchKeyword" >
            <b-button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
              </svg>
              Sort
            </b-button>
          </form>
        </div>
      </div>


      <!-- E card Component -->
      <div class="container-cards">
        <div class="ecard-column-container" >
          <Ecard :search-keyword="searchKeyword"  @show-popup="showModalWithData"></Ecard>
        </div>
      </div>
      <!--PopUp Model--start-->
      <b-modal  class="modal-container" v-model="showModal" :lazy="true">
        <div class="row-card">
          <div class="column-card1">
            <div class="card1-image">
              <img class="card-f" :src=getCardFImage(loadCardData) height="auto" width="300px"/>
              <img class="card-b" :src=getCardBImage(loadCardData) height="auto" width="335px"/>
            </div>
          </div>
          <div class="column-card2">

            <div class="container-card">
              <p class="p1">{{loadCardData.company_name}}</p><br>
              <h2 class="name">{{ loadCardData.name }}</h2><br>
              <p class="p2">{{ loadCardData.designation }}</p><br>
            </div>

            <div class="card-description">
              <div class="container-card-icons">
                <div class="column-icons">
                  <img src="../assets/Icon/01 tel.png" height="auto" width="30"/>
                  <img src="../assets/Icon/02 email.png" height="auto" width="30"/>
                  <img src="../assets/Icon/03 web.png" height="auto" width="30"/>
                  <img src="../assets/Icon/04 location.png" height="auto" width="30"/>
                </div>
              </div>

              <div class="column-text">
                <p class="content">{{loadCardData.contact_no}}</p>
                <p class="content">{{loadCardData.email}}</p>
                <p class="content">{{loadCardData.websites}}</p>
                <p class="content">{{ loadCardData.address}}</p>
              </div>
            </div>

          </div>

        </div>

        <div class="btnSet">
          <b-button class="btn2" type="is-danger" @click="removeCard">REMOVE</b-button>
          <b-button @click="edit" class="btn1" type="is-success">EDIT</b-button>
        </div>

        <div class="share-icon">
          <img src="../assets/Icon/ascpng.png" height="auto" width="20px"/>
        </div>
      </b-modal>
      <!--PopUp Model--end-->
    </div>

    <div class="footer">
      <Footer></Footer>
    </div>

  </div>
</template>

<script>
import {appSettings} from "../appsettings";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import Ecard from "./Ecard";
import ECardEdit from "./ECard-Edit";
import axios from "axios";
import ActivityLog from "../utils/ActivityLog";





export default {
  name: "Viewer",
  props: ['eCardData'],

  data() {
    return {
      showModal: false,
      popupData: null,
      ecards: [],
      loadCardData: {},
      searchKeyword:'',
    }
  },

  components: {
    Ecard,
    Footer,
    Navbar,
    ECardEdit,
  },


  methods: {
    goHome() {
      this.$router.push('/')
    },

    viewAllCards() {
      this.$refs['bottom'].scrollIntoView({behavior: 'smooth'})
    },

    edit: function () {
      this.$router.push({
        name: 'ECard-Edit',
        params: {
          cardData: this.loadCardData
        }
      });
    },

    removeCard() {
      const id = this.loadCardData.id;
      axios.delete(`${appSettings.$api_url}/api/ECard/${id}`)
        .then(response => {
          // console.log("Removed E Card");
          ActivityLog.trackActivity('Company Name', this.username, 'Removed an E-Card');
          this.ecards = this.ecards.filter(ecard => ecard.id !== id);
        })
        .catch(error => {
          console.error(error);
        });
      this.showModal = false;
      window.location.reload();
    },

    loadData: function () {
      axios.get(appSettings.$api_url + '/api/ECard/list')
        .then((response) => {
          // console.log(response)
          if (response.status === 200) {
            this.ecards = response.data.data.ecards
          }
        })
    },

    callBackLoad(){
      this.loadData();
    },

    showModalWithData(data) {
      this.loadCardData = data
      this.showModal = true;
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
    this.loadData();

  }
}
</script>

<style scoped>

/* Front Row ---------------------------------------*/

.front-text {
  display: inline-block;
  text-align: left;
  margin-left: 5rem;
}

.container-latestCards {
  width: 50%;
}

.column-LatestCard {
  margin-bottom: 2.5rem;
  margin-right: 6px;
  width: 30%;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.info-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  /*margin-top: -25%;*/
}

.title {
  font-size: 66px;
  font-weight: bold;
  margin-bottom: 2rem;
}

.title b {
  color: #0c0c0c;
  font-size: 3rem;
}

.btn-outline-dark {
  font-size: 1rem;
  border-radius: 30px;
  padding: 0.5rem;
  margin-top: 1rem;
  font-weight: bold;
  background: black;
  color: white;
  padding-inline: 40px;
  float: right;
}

.latest-head p {
  font-size: x-large;
}

img.card-latest {
  border-radius: 12px;
}

.company_name{
  font-size: 17px;
}

.title2 {
  font-size: 24px;
}

//--------------Background Images-----------------------------
.background-images {
  position: fixed;
  z-index: -1;
  margin-top: 2rem;
}

.background-image-1 {
  position: absolute;
  top: 53%;
  left: 10%;
  opacity: 0.4;
}

.background-image-2 {
  position: absolute;
  top: 66%;
  left: 10%;
}

.background-image-3 {
  position: absolute;
  top: 65%;
  left: 20%;
  opacity: 0.4;
}

.container-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ecard-column-container {
  display: flex;
  column-gap: 10px;
  row-gap: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.btn-outline-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

/* Front Row End ---------------------------------------*/

/*All card Rows-------------------------------------------------*/
.all-cards {
  margin-top: 25rem;
  width: 100%;
}

.all-cards-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  margin-left: 8rem;
  margin-top: 12%;
}

.all-cards-header h3 {
  font-size: 64px;
  margin-left: 36%;
}

.all-card-header {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: flex-end;
  align-items: flex-end;
  margin-top: 50px;
  margin-bottom: 15px;
  margin-inline: 20px;
  border-bottom: ridge;
}

.all-card-header p, .all-card-header b {
  font-size: xx-large;
}

/*All card Rows End------------------------------------------*/

/*All card header start ---------------------------------*/
.keepInTouch {
  margin-right: 3rem;
  position: absolute;
  left: 12%;
  height: 150px;
}

.d-flex {
  height: 10px;
}

.search-btn {
  margin-bottom: 2.5rem;
  display: flex;
}

.form-control {
  margin-right: 0.8rem;
  border: none;
  background-color: #f3f3f3;
  font-size: 1.1rem;
  padding-top: 1rem;
  padding-bottom: 1.2rem;
  border-radius: 30px
}

/*All card header end ----------------------------------------*/


/*Pop-Up Card------------------------------------------------Start*/


.card1-image {
  display: inline-block;
  margin-left: 29px;
}

.column-card1{
  width: 45%;
}

.column-card2{
  width: 60%;
}

.modal-container{
  border-radius: 17px;
}

.row-card {
  display: flex;
  justify-content: center;
}

.btnSet {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
  margin-top: 10px;
}

.btn{
  cursor: pointer;
  font-size: 1.1rem;
  border-color: black;
  padding-bottom: 17px;
  padding-top: 15px;
  border-radius: 30px;
}

.btn1 {
  background: #1E1E1E;
  border-radius: 45px;
  width: 219px;
}

.btn2 {
  background: floralwhite;
  color: #1E1E1E;
  border-color: #1E1E1E;
  border-radius: 45px;
  width: 219px;
  margin-right: 35px;
}

.share-icon{
  background-color: #131313;
  border-radius: 30px;
  padding: 11px;
  height: 50px;
  width: 50px;
  margin-left: 42rem;
  margin-top: -2rem;
}

.container-card {
  border-bottom: groove;
  border-top: groove;
  margin-top: 10px;
  margin-right: 10px;
}

.container-card h2 {
  margin-top: 16px;
  margin-left: 42px;
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: bold;
}

.p2 {
  margin-top: -50px;
  margin-left: 240px;
  margin-bottom: -24px;
}

.p1 {
  margin-bottom: -43px;
  margin-top: 0px;
}
.card-description{
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
}

.column-icons {
  display: grid;
  align-content: space-around;
  margin-right: 2rem;
}

.column-icons img {
  margin-bottom: 17px;
}

.card-f{
  margin-top: -40px;
  margin-left: -101px;
  margin-bottom: 54px;
}

.card-b{
  margin-top: -40px;
  margin-left: -101px;
}

/*Pop-Up Card------------------------------------------------End*/


@media screen and (max-width: 360px) {


  .body-container{
    display: flex;
    flex-direction: column;
    width: 79rem;
  }

  .latest-container {
    flex-direction: column;
  }

  .info-column {
    width: 100%;
  }

  .front-text {
    margin-left: 17rem;
  }

  .title {
    font-size: 9rem;
  }

  .title b {
    font-size: 8rem;
  }

  .btn-outline-dark {
    font-size: 4rem;
  }



  .latest-head p {
    font-size: 4rem;
  }

  .background-image-1 {
    position: absolute;
    top: 12%;
    left: 30%;
    opacity: 0.4;
  }

  .background-image-2 {
    position: absolute;
    top: 91%;
    left: -8%;
  }

  .background-image-3 {
    display: none;
  }

  .container-latestCards {
    width: 100%;
    margin-top: 22rem;
    margin-left: 2rem;
  }

  .all-cards{
    margin-top: 0;
    margin-left: 3rem;
  }

  .column-LatestCard {
    margin-right: 88px;
    margin-left: 14px;
    width: 40rem;
    padding-block: 3rem;
  }

  .title2 {
    font-size: 4rem;
  }

  .latestCard-img {
    margin-left: 2rem;
  }

  .column-LatestCard p {
    font-size: 3rem;
    margin-top: 2rem;
  }

  img.card-latest {
    width: 35rem;
  }

  .keepInTouch{
    height: 180px;
    margin-bottom: 5rem;
  }

  .all-cards-header h3{
    font-size: 7rem;
    margin-left: 23rem;
  }

  .all-card-header{
    margin-bottom: 2rem;
  }

  .all-card-header p,
  .all-card-header b{
    font-size: 4rem;
  }

  .form-control{
    font-size: 2.4rem;
  }
  .search-btn{
    margin-bottom: 5.5rem;
    border-radius: 1rem;
    margin-right: 78px;
  }

  #search-button{
    display: none;
  }

  input.form-control {
    padding: 2.4rem;
    font-size: 4rem;
  }

  .ecard-column-container{
    display: flex;
  }

  .row-card{
    flex-direction: column;
  }

  .column-card2{
    width: 60%;
    margin-left: 50px;
    margin-top: 11px;
  }

  .card1-image{
    display: flex;
    flex-direction: column;
  }

  .card-f, .card-b{
    width: 49rem;
  }

}

</style>
