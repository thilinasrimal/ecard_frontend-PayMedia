
<template>
  <div>
    <b-field>
      <div class="image-holder">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div :class="'card-image-input' + ' ' + type ">
              <b-field>
                <div :style="{'text-align': 'center', 'height': imageHeight + 'px'}">
                  <div class="is-flex is-centered" style="height: 100%; width: 100%; justify-content: center">
                    <img
                      :src="image === '' ? placeholder_image : image" alt="">
                  </div>
                  <div class="card-image-edit-or-delete-bg">
                    <div class="card-image-edit-or-delete">
                      <b-button size="is-medium"
                                class="select-btn"
                                icon-right="plus-circle-outline"
                                type="is-success"
                                :disabled="disabled"
                                @click="selectImage"></b-button>
                      <b-button v-if="image !== ''"
                                size="is-medium"
                                class="delete-btn"
                                icon-right="minus-circle-outline"
                                type="is-danger"
                                :disabled="disabled"
                                @click="deleteImage"></b-button>
                    </div>
                  </div>
                </div>
              </b-field>
            </div>
          </div>
        </div>
      </div>
      <input ref="imageInput"
             type="file"
             accept="image/*"
             @input="pickFile"
             style="display: none"/>
    </b-field>

    <canvas ref="imageCanvas" style="display: none"></canvas>
  </div>
</template>

<script>
export class ImageValidator{
  maxHeight = 0
  minHeight = 0
  maxWidth = 0
  minWidth = 0
  maxSize = 0 // in KB
  message = 'Uploaded image is not valid'

  constructor(maxHeight, minHeight, maxWidth, minWidth, maxSize, message) {
    if(maxHeight) this.maxHeight = maxHeight
    if(minHeight) this.minHeight = minHeight
    if(maxWidth) this.maxWidth = maxWidth
    if(minWidth) this.minWidth = minWidth
    if(maxSize) this.maxSize = maxSize
    if(message) this.message = message
  }
}

export default {
  name: "Image-Upload-Comp",
  props: ['value', 'index', 'placeholder_image', 'imageHeight', 'imageWidth', 'imageValidations', 'type', 'disabled'],
  emits: ['onUpload'],
  data(){
    return {
      image: ''
    }
  },

  methods: {
    pickFile () {
      const self = this

      let input = self.$refs.imageInput
      let files = input.files

      if (files && files[0]) {
        const img = new Image();
        const objectUrl = URL.createObjectURL(files[0])
        const file = files[0]

        img.src = objectUrl
        this.image = objectUrl
        img.onload = function () {


            // Draw in canvas in order to convert later to base64
            const canvas = self.$refs.imageCanvas
            canvas.width = img.width
            canvas.height = img.height
            const context = canvas.getContext('2d')

            const base_image = new Image()
            base_image.src = objectUrl
            base_image.onload = async function () {
              context.drawImage(base_image, 0, 0)
              let base64 = self.imageToBase64()

              self.$emit('input', base64)

              let data = {
                index: self.index,
                valid: true,
                blob: objectUrl,
                image: base64
              }

              self.$emit('on-upload', data )
            }
        }

      }
    },



    selectImage() {
      const self = this
      self.$refs.imageInput.click()
    },

    deleteImage() {
      const self = this
      self.$refs.imageInput.value = ""
      self.image = ''

      self.$emit('input', '')
    },

    imageToBase64(){
      const self = this

      const canvas = self.$refs.imageCanvas
      let base64 = canvas.toDataURL()
      base64 = base64.replace("data:image/png;base64,", "")

      return base64
    },
  }
}
</script>


<style scoped>
.card-image-input {
  display: inline-block;
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-bottom: 0.35rem;
}

.is-danger {
  border: 1px solid #f14668;
}

label.card-image-preview {
  background-size: cover;
  background-position: center;
  top: 0;
  left: 0;
  cursor: pointer;
  display: block;
  width: 100%;
}

.card-image-edit-or-delete-bg {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: #f9f9f97d;
  align-items: center;
  justify-content: center;
}

.card-image-input:hover .card-image-edit-or-delete-bg {
  display: flex;
}

.card-image-edit-or-delete {
  display: flex;
  flex-direction: row;
}

.form-preview .label {
  color: #bd9ea5;
}

img#image-to-be-cropped {
  max-height: calc(100vh - 150px);
}

@media screen and (max-width: 360px) {
  img{
    height: 35rem;
    width: 63rem;
  }

  .card-image-edit-or-delete {
    display: flex;
    flex-direction: row;
  }

  .card-image-edit-or-delete-bg {
    position: absolute;
    width: 100%;
    top: 0;
    background-color: #f9f9f97d;
    align-items: center;
    justify-content: center;
    height: 36rem;
  }

  .select-btn, .delete-btn {
    font-size: 3.25rem;
  }

  .card-image-input{
    display: inline-block;
    position: relative;
    width: 100%;
    height: auto;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 0.5rem;
    margin-bottom: 0.35rem;
    overflow: visible;
  }
}


</style>
