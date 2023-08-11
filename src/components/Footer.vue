<template>
  <footer class="footer">
          <div class="all-container">
            <div class="row-logo" style="margin-left: 42%">
              <img class="logo" src="../assets/Images/logo.png" height="auto" width="200"/>
            </div>

            <div class="row-watermark" style="margin-left: 36%">
              <img class="payMedia-watermark" src="../assets/Images/PayMedia.png" height="auto" width="400"/>
            </div>

            <div class="row-social-icons" style="margin-left: 40%">
              <a href="https://www.instagram.com/paymedia.lk/" class="icon" style="cursor: pointer">
                <img src="../assets/Icon/instagram icon.png" height="20" width="auto"/>
              </a>
              <a href="https://twitter.com/paymedialk" class="icon" style="cursor: pointer">
                <img src="../assets/Icon/Vector.png" height="20" width="auto"/>
              </a>
              <a href="https://www.linkedin.com/company/paymedia-pvt-ltd/mycompany/" class="icon" style="cursor: pointer">
                <img src="../assets/Icon/Vector-1.png" height="20" width="auto"/>
              </a>
              <a href="https://web.facebook.com/paymedia.lk" class="icon" style="cursor: pointer">
                <img src="../assets/Icon/Vector-2.png" height="20" width="auto"/>
              </a>
            </div>

            <div  class="row-text" style="margin-left: 40%">
              <p>Copyright ©2023 PayMedia. All Rights Reserved</p>
            </div>
          </div>

  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
/*Footer*/

.icon {
  background-color: royalblue;
  border-radius: 20px;
  padding: 7px;
  margin-left: 20px;
  height: 40px;
  width: 40px;
}

.icon img {
  height: 21px;
}

.footer p {
  font-size: small;
}
</style>
