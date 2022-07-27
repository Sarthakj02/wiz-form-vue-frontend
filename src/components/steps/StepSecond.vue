<template>
  <div>
    <div class="steps">
      <span @click="closeModal" class="close">&times;</span>
      <h2>Step 2</h2>
      <div>
        <label class="form-fields" for="qualification">Qualification:</label>
        <input
          class="form-fields"
          type="text"
          id="qualification"
          qualification="qualification"
          v-model="qualification"
        />
      </div>
      <div>
        <label class="form-fields" for="college">College:</label>
        <input
          class="form-fields college-input"
          type="text"
          id="college"
          name="college"
          v-model="college"
        />
      </div>
      <div>
        <label class="form-fields cgpa-label" for="cgpa">CGPA:</label>
        <input
          class="cgpa-input form-fields"
          id="cgpa"
          type="number"
          name="cgpa"
          v-model="cgpa"
        />
      </div>
      <div>
        <label class="form-fields" for="profile_image">Profile image:</label>
        <button @click="$refs.fileupload.click()">Pick File</button>
        <img
          v-if="imgSrc"
          id="profile_image"
          name="profile_image"
          :src="imgSrc"
        />
        <input
          style="display: none"
          type="file"
          accept="image/*"
          ref="fileupload"
          @change="preview"
        />
        <button v-if="imgSrc" @click="resetImage()">Remove Image</button>
      </div>
      <the-buttons v-on="$listeners"></the-buttons>
    </div>
    <div class="outside" v-on:click="closeModal"></div>
  </div>
</template>
<script>
import TheButtons from "../TheButtons.vue";

export default {
  components: {
    TheButtons,
  },
  props: {
    editUserData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      imgSrc: "",
      uploaded: "",
    };
  },
  // watch: {
  //   editUserData: function () {
  //     console.log(this.editUserData.profile_image);
  //     debugger;
  //     this.imgSrc = this.editUserData.profile_image
  //       ? this.editUserData.profile_image
  //       : "";
  //     console.log(this.imgSrc);
  //     debugger;
  //   },
  // },
  methods: {
    // updated() {
    //   this.imgSrc = this.editUserData.profile_image
    //     ? this.editUserData.profile_image
    //     : "";
    //   console.log(this.imgSrc);
    //   debugger;
    // },
    closeModal() {
      this.$emit("hideWizard", true);
    },
    resetImage() {
      this.$refs.fileupload.value = null;
      this.imgSrc = "";
      this.profileImage = "";
    },
    preview(e) {
      let imgSrc = URL.createObjectURL(e.target.files[0]);
      this.profileImage = e.target.files[0];
      this.imgSrc = imgSrc;
    },
  },
  computed: {
    qualification: {
      get() {
        return this.$store.state.qualification;
      },
      set(value) {
        this.$store.commit("setQualification", { qualification: value });
      },
    },
    college: {
      get() {
        return this.$store.state.college;
      },
      set(value) {
        this.$store.commit("setCollege", { college: value });
      },
    },
    cgpa: {
      get() {
        return this.$store.state.cgpa;
      },
      set(value) {
        this.$store.commit("setCgpa", { cgpa: value });
      },
    },
    profileImage: {
      get() {
        return this.$store.state.profile_image;
      },
      set(value) {
        this.$store.commit("setProfileImage", { profile_image: value });
      },
    },
  },
};
</script>

<style scoped>
.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
}
.college-input {
  margin-left: 61px;
}
.cgpa-input {
  margin-left: 75px;
}
#profile_image {
  border: 1px solid black;
  height: 210px;
  max-width: 370px;
}
</style>
