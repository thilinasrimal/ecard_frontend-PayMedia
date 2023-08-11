
<template>

  <div>
    <button @click='toggleShow'  class='anchor'>{{ selectedCompany ? selectedCompany.company_name : 'Select a Company' }}</button>
    <div v-if='showMenu' class='menu'>
      <div class='menu-item' v-for='company in companies'  @click='itemClicked(company)'>{{company.company_name}}</div>
    </div>
  </div>

</template>

<script>

import {appSettings} from "../appsettings";

export default {
  name: "drop-down",
  props: {
    onClick: {
      type: Function
    },
    items: {
      type: Object
    },
    companyName:{
      type:String
    },
    companyNameV:{
      type:String
    }
  },
  data(){
    return{
      showMenu:false,
      companies:[],
      selectedCompany: this.companyName || this.companyNameV ? { company_name: this.companyName || this.companyNameV } : null,
    }
  },

  methods:{

    toggleShow(){
      this.showMenu = !this.showMenu;
    },

    itemClicked(company){
      this.selectedCompany = company
      this.showMenu = false;
      this.$emit("company-selected", company);
    },

    loadData(){
      const comp = this
      comp.$axios.get(appSettings.$api_url + '/api/Company/list')
        .then((response) => {

          // console.log(response)
          if (response.status === 200) {
            comp.companies = response.data.data.companies
          }

          if (this.companyName || this.companyNameV) {
            this.selectedCompany = { company_name: this.companyName || this.companyNameV };
          }

        })
    },


  },

  mounted() {
    this.loadData();


  }


}
</script>

<style scoped>

.anchor {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .75rem 2rem;
  font-size: 1rem;
  border-radius: 45px;
  color: #070707;
}

.anchor::after {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: .5em;
  vertical-align: .255em;
  content: "";
  border-top: .3em solid;
  border-right: .28em solid transparent;
  border-bottom: 0;
  border-left: .28em solid transparent;
}

.anchor:hover {
  color: #2a2a2a;
  background-color: #abaaaa;
  cursor: pointer;
}

.menu {
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: .25rem;
  color: #212529;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  list-style: none;
  margin: .125rem 0 0;
  padding: .5rem 0;
  text-align: left;
}

.menu-item {
  color: #212529;
  padding: .25rem 1.5rem;

}

.menu-item:hover {
  background-color: #F4F6F6;
  cursor: pointer;
}


</style>
