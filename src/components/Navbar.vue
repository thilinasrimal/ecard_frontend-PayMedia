<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/Images/logo.png" height="auto" width="auto" alt=""/>
      </b-navbar-item>
    </template>


    <template #end>
      <b-navbar-item tag="div">
        <b-button @click="goHome"
                  type="button"
                  class="btn is-lite"
                  style="font-size: 17px;
                         border-radius: 20px;
                         border-color: black">
          <span id="span" style="margin-right: 4px;">
            <img src="../assets/logout.png" class="logout-png" alt=""/>
          </span><b>LOGOUT</b>
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {

  methods: {
    goHome() {
      this.$router.push('/')

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
    }
  }
}
</script>
<style scoped>

.logout-png {
  height: auto;
  width: 16px;
}


@media screen and (max-width: 360px) {

  .navbar-brand img {
    width: 25rem;
    height: auto;
    max-height: 40rem;
  }

  .btn {
    display: flex;
    font-size: 3rem;
  }

  strong {
    font-size: 3rem;
  }

  #span {
    display: inline-flex;
  }

  .logout-png {
    height: auto;
    width: 2rem;
  }


}
</style>
