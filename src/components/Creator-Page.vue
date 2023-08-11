<template>
  <div class="body-container">
    <!--    Navbar-->
    <Navbar></Navbar>

    <div class="background-images">
      <img class="background-image-3" src="../assets/PayMediaTrans.png" height="auto" width="850"/>
      <img class="background-image-1" src="../assets/Images/Group 289355.png" width="700" height="auto" alt=""/>
      <img class="background-image-2" src="../assets/Images/dds.png"  width="1200" height="auto" alt=""/>
    </div>
    <!--    first row-->
    <div class="container-front">
      <!--    info column-->
      <div class="info-column">
        <div class="front-text">
          <h1 class="title" style="font-family: 'Century Gothic'">Stay<b> Connect</b></h1>
          <h1 class="title">with<b> Customers</b></h1>
          <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            <br>Velit officia consequat duis enim velit mollit. </p>
          <button @click="scrollToBot" class="btn-outline-dark" style="float: left">VIEW CARDS</button>
        </div>
      </div>

      <!--    create card column-->
      <div class="create-card">
        <div class="card">
          <h2 class="head1"><b style="font-family: 'Century Gothic'">Create Card</b></h2>
          <img id="gif" src="../assets/GIF/128988-meetings.gif" height="auto" width="400" alt=""/>
          <button @click="createBtn" class="btn-outline-dark"
                  id="btn1"
                  > LET'S CREATE
          </button>
        </div>
      </div>
    </div>



    <!--    All Cards -->
    <div ref="bottom" class="all-cards" id="view">
      <div class="all-cards-header">
        <img class="keepInTouch" src="../assets/Images/Keep in touch.png"/>
        <h3><b style="font-family: 'Century Gothic'">E-cards</b></h3>
      </div>

      <div class="all-card-header">
        <p><b>All</b> Cards</p>

        <div class="search-btn">
          <form class="d-flex">
            <input class="form-control" placeholder="Search" type="text" v-model="searchKeyword" ></input>
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
        <div class="ecard-column-container">
          <Ecard :search-keyword="searchKeyword"></Ecard>
        </div>
      </div>
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
import Ecard from "./Ecard.vue";

export default {
  name: "Creator",

  data() {
    return {
      ecards: [],

      searchKeyword:'',
    }
  },
  components: {
    Ecard,
    Footer,
    Navbar
  },
  methods: {
    createBtn() {
      this.$router.push({name: 'create-1'});
    },
    scrollToBot() {
      this.$refs["bottom"].scrollIntoView({behavior: "smooth"})
    },

    loadData: function () {
      const comp = this

      comp.$axios.get(appSettings.$api_url + '/api/ECard/list')
        .then((response) => {
          // console.log(response)
          if (response.status === 200) {
            comp.ecards = response.data.data.ecards
          }
        })
    },
  },

  computed:{
    filteredList(){
      return this.ecards.filter(ecard => {
        return ecard.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Proza+Libre');
.front-text {
  display: inline-block;
  text-align: left;
}

.container-front {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  margin-top: -10%;

}

.info-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
}

.title {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.btn-outline-dark {
  font-size: 1rem;
  border-radius: 45px;
  padding: 0.5rem;
  margin-top: 1rem;
  background-color: #1E1E1E;
  color: white;
  padding-inline: 20px;
  float: right;
}

.btn-outline-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.create-card {
  display: flex;
  flex-direction: column;
  width: 50%;
}

//--------------Background Images-----------------------------
.background-images {
  position: fixed;
}

.background-image-1 {
  position: absolute;
  top: 20%;
  left: 30%;
  opacity: 0.4;
}

.background-image-2 {
  position: absolute;
  top: 66%;
  left: 10%;
}

.background-image-3 {
  position: absolute;
  top: 50%;
  left: 30%;
  opacity: 0.4;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  margin-top: 6rem;
  border-radius: 1rem;
}

.head1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.card img {
  margin-top: 2rem;
}

#btn1{
  padding-inline: 11rem;
  border-radius: 45px;
  margin-top: 1rem;
  background-color: #1E1E1E;
}

#gif{
  margin-top: -6%;
  margin-bottom: -18%;
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

/* All Cards row start-----------------------------------*/
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

.all-card-header p{
  font-size: 32px;
  font-family: "Century Gothic";
}

.all-cards {
  margin-top: 10rem;
  width: 100%;
}

.all-cards-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  margin-left: 8rem;
  margin-top: 5%;
}

/* All Cards row end-----------------------------------*/

/*All card header start ---------------------------------*/
.keepInTouch {
  margin-right: 3rem;
  position: absolute;
  height: 150px;
  left: 12%;
}

.d-flex {
  height: 10px;
}

.all-cards-header h3 {
  font-size: 64px;
  margin-left: 36%;
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

.btn{
  cursor: pointer;
  font-size: 1.1rem;
  border-color: black;
  padding-bottom: 17px;
  padding-top: 15px;
  border-radius: 30px;
}

@media screen and (max-width: 360px) {

  .body-container{
    display: flex;
    flex-direction: column;
    width: 73rem;
  }

  .container-front{
    display: flex;
    flex-direction: column;
  }

  .info-column{
    margin-top: 15%;
    width: 100%;
  }

  .background-images {
    display: flex;
    flex-direction: column;
  }

  .background-image-1 {
    position: absolute;
    top: 12%;
    left: 30%;
    opacity: 0.4;
  }

  .background-image-2 {
    position: absolute;
    top: 95%;
    left: -8%;
  }

  .background-image-3 {
    display: none;
  }
  .create-card{
    width: 100%;
    height: auto;
    margin-top: 15rem;
  }

  .card{
    margin-right: 2rem;
  }


  .title {
    font-size: 7rem;
  }

 .title b{
   font-size: 7rem;
 }

 .btn-outline-dark{
   font-size: 3rem;
 }

 #btn1{
   margin-top: 7rem;
 }

 .head1{
   font-size: 7rem;
 }

 #gif{
   width: 48rem;
 }

 .keepInTouch{
   margin-bottom: 5rem;
 }

 .all-cards-header h3{
   font-size: 6rem;
   margin-left: 17rem;
 }

  .all-card-header p{
    font-size: 4rem;
  }

  .form-control{
    font-size: 2.4rem;
  }
  .search-btn{
    margin-bottom: 4.5rem;
    margin-right: 78px;
  }

  #search-button{
    display: none;
  }

  input.form-control{
    padding: 2.2rem;
  }

  .ecard-column-container{
    display: flex;

  }
}


</style>
