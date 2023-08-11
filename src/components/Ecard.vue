<template>
  <div>
    <div class="container-cards">
      <div class="column-LatestCard" v-for="eCard in filteredEcards" :key="eCard.id" @click="getPopUp(eCard.id)" >
        <div class="latestCard-img" >
          <img class="card-latest" :src=getCardImage(eCard)  height="auto" width="260" alt=""/>
        </div>
        <p style="font-weight: 600">{{ eCard.company_name }}</p>
        <h1 class="title" style=" margin-left: 15%; font-weight: bold; font-family: 'Century Gothic'">{{ eCard.name }}</h1>
        <p class="designation" style="float: right; margin-top: -14px">{{ eCard.designation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {appSettings} from "../appsettings";
import axios from "axios";


export default {
  name: "Ecard",
  props: ['searchKeyword'],
  data() {
    return {
      eCardData: '',
      ecards: [{
        id: '',
        name: '',
        company_name: '',
        designation: ''
      }
      ],
      filteredEcards: [],

    }
  },

  watch: {
    searchKeyword(newKeyword) {
      this.filterEcards(newKeyword);
    },
  },


  methods: {
    loadData: function () {
      const comp = this;
      this.$axios.get(appSettings.$api_url + '/api/ECard/list')
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            comp.ecards = response.data.data.ecards;
            this.filterEcards(this.searchKeyword);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getPopUp(id) {
      axios.get(`${appSettings.$api_url}/api/ECard/${id}`)
        .then(response => {
          const eCardData = response.data.data.eCard;
          this.eCardData = eCardData
          // console.log("eCard data:", eCardData)
          this.$emit('show-popup', eCardData);
          // console.log('Card clicked:', id)
        })
        .catch(error => {
          console.error(error);
        });
    },

    filterEcards(keyword) {
      if (keyword) {
        this.filteredEcards = this.ecards.filter(
          (eCard) =>
            eCard.name.toLowerCase().includes(keyword.toLowerCase()) ||
            eCard.company_name.toLowerCase().includes(keyword.toLowerCase()) ||
            eCard.designation.toLowerCase().includes(keyword.toLowerCase())
        );
      } else {
        this.filteredEcards = this.ecards;
      }
    },

    getCardImage(eCard) {
      return eCard && eCard.back_image
        ? appSettings.$api_url + eCard.back_image
        : require("../assets/Images/image 3.png");
    },
  },

    mounted() {
      this.loadData();

    },

}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Proza+Libre');
p {
  font-family: 'Roboto', sans-serif;
  color: #5A5A5A;
  font-weight: 300;
}

.container-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.column-LatestCard {
  margin-bottom: 2.5rem;
  border: 10px solid white;
  //width: 33%;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.column-LatestCard:hover {
  transform: translateY(-5px);
}

.latestCard-img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 15px;
  margin-left: 18px;
  width: 270px;
  box-shadow: 3px 1px 3px 3px rgba(40, 40, 40, 0.2);
  rotate: 2deg;
}

.latestCard-img:before, .latestCard-img:after{
  content:"";
  width: 280px;
  height: 150px;
  margin-left: 18px;
  background: white;
  box-shadow: 3px 3px 3px 3px rgba(40,40,40,0.2);
  position: absolute;
  border: 10px solid white;
  border-radius: 15px;
  transition: all 0.5s ease-out;
}
.latestCard-img:before{
  z-index: -10;
  transform: rotate(6deg);
}

.latestCard-img:after{
  z-index: -10;
  transform: rotate(6deg);
}

.latestCard-img:hover:before, .latestCard-img:hover:after{
  transform: rotate(0);
}

.column-LatestCard p {
  font-size: 16.31px;
  margin-bottom: 0.5rem;

  //font-family: "Roboto",serif;
}

.latest-cards h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
img.card-latest{
  border-radius: 0.7rem;
}

.designation {
  font-size: 14.83px;
  margin-bottom: 0.5rem;
  color: #5A5A5A;
  font-weight: 300;
}

.title{
  font-size: 40px;
  font-variant: all-petite-caps;
}

@media screen and (max-width: 360px) {
  .container-cards{
  }

  .title{
    font-size: 7rem;
  }

  .column-LatestCard p{
    margin-top: 2rem;
    font-size: 5rem;
  }

  .column-LatestCard {
    width: 100%;
    margin-right: 2rem;
    margin-bottom: 2.5rem;
    border: 10px solid white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
  }

  .column-LatestCard:hover {
    transform: translateY(-5px);
  }

  img.card-latest{
    width: 48rem;
    margin-left: 10rem;
    border-radius: 1.7rem;
  }

  .latestCard-img {
    display: contents;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    border-radius: 15px;
    box-shadow: 3px 1px 3px 3px rgba(40, 40, 40, 0.2);
    rotate: 2deg;
  }

  .latestCard-img:before, .latestCard-img:after{
    content:"";
    width: 46rem;
    height: 26rem;
    margin-left: -44rem;
    background: white;
    box-shadow: 3px 3px 3px 3px rgba(40,40,40,0.2);
    position: absolute;
    border: 10px solid white;
    border-radius: 15px;
    transition: all 0.5s ease-out;
  }

  .latestCard-img:before{
    z-index: -10;
    transform: rotate(6deg);
  }

  .latestCard-img:after{
    z-index: -10;
    transform: rotate(6deg);
  }

  .latestCard-img:hover:before, .latestCard-img:hover:after{
    transform: rotate(0);
  }
}

</style>
