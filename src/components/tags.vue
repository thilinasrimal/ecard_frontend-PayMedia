<template>
  <div>
    <input
      type="text"
      class="form-control"
      v-model="tagInput"
      @keydown.enter="addTag"
      placeholder="Enter a tag"
    />

    <div class="tag-list">
      <div v-for="tag in value" :key="tag" class="tag">
        <span>{{ tag }}</span>
        <b-button class="remove-tag-btn" @click="remove(tag)">&#x2716;</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tags",
  props: {
    value: {
      type: Array,
      default: ()=>[]
    },
  },
  data() {
    return {
      tagInput: '',

    };
  },

  computed: {
    tags: {
      get() {
        return this.value;
      },
      set(newTags) {
        this.$emit("input", newTags);
      }
    }
  },

  methods: {
    addTag() {
      if (this.tagInput.trim() !== "") {
        const newTag = this.tagInput.trim();
        if (!this.value.includes(newTag)) {
          const newTags = [...this.value, newTag];
          this.$emit("input", newTags);
          this.tagInput = "";
        } else {

        }
      }
    },

    remove(tag){
      const newTag = this.value.filter(t => t !== tag);
      this.$emit("input", newTag);
    }
  },
};
</script>

<style scoped>
.tag-list {
  margin-top: 10px;
}

.tag {
  display: inline-block;

  margin: 4px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 1rem;

}

.remove-tag-btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #be5a5a;
  font-size: 0.7rem;
}

.remove-tag-btn:hover {
  color: #333;
}

@media screen and (max-width: 360px) {
  .form-control{
    font-size: 3.5rem;
  }

  .remove-tag-btn {
    font-size: 2.5rem;
  }

  .tag{
    font-size: 3.5rem;
  }
}


</style>
