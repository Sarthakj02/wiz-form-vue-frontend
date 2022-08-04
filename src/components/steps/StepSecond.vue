<template>
  <div>
    <div class="steps">
      <span @click="closeModal" class="close">&times;</span>
      <h2>Step 2</h2>
      <ValidationObserver v-slot="{ handleSubmit }" ref="observer2">
        <form @submit.prevent="handleSubmit(navigateNext)">
          <ValidationProvider
            name="Qualification"
            rules="required"
            v-slot="{ errors }"
          >
            <div>
              <label class="form-fields" for="qualification"
                >Qualification:</label
              >
              <input
                class="form-fields"
                type="text"
                id="qualification"
                qualification="qualification"
                v-model="qualification"
              />
              <div class="error">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="College"
            rules="required"
            v-slot="{ errors }"
          >
            <div>
              <label class="form-fields" for="college">College:</label>
              <input
                class="form-fields college-input"
                type="text"
                id="college"
                name="college"
                v-model="college"
              />
              <div class="error">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>

          <ValidationProvider name="CGPA" rules="required" v-slot="{ errors }">
            <div>
              <label class="form-fields cgpa-label" for="cgpa">CGPA:</label>
              <input
                class="cgpa-input form-fields"
                id="cgpa"
                type="number"
                name="cgpa"
                v-model="cgpa"
              />
              <div class="error">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="Profile Image"
            ref="provider"
            :rules="`${imageValidateFlag ? '' : 'required'}`"
            v-slot="{ errors }"
          >
            <div>
              <label class="form-fields" for="profile_image"
                >Profile image:</label
              >
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
              <div class="error">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>

          <the-buttons
            ref="buttonComponent"
            @validate-step-two-data="validateData"
            v-on="$listeners"
          ></the-buttons>
        </form>
      </ValidationObserver>
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
    editFlag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageValidate: false,
    };
  },
  methods: {
    async validateData() {
      const isValid = await this.$refs.observer2.validate();
      if (!isValid) {
        // stop!!
      } else {
        this.$store.commit("setStep", { step: 3 });
      }
    },
    navigateNext() {
      this.$refs.buttonComponent.navigateNext();
    },
    closeModal() {
      this.$emit("hideWizard", true);
    },
    resetImage() {
      this.$refs.fileupload.value = null;
      this.imgSrc = "";
      this.profileImage = "";
      this.$refs.provider.syncValue(this.profileImage);
      this.imageValidate = false;
    },
    preview(e) {
      let imgSrc = URL.createObjectURL(e.target.files[0]);
      this.profileImage = e.target.files[0];
      this.$refs.provider.syncValue(this.profileImage);
      this.imageValidate = true;
      this.imgSrc = imgSrc;
    },
  },
  computed: {
    imageValidateFlag() {
      if (this.editFlag) {
        return true;
      } else if (this.imageValidate) {
        return true;
      } else return false;
    },
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
    imgSrc: {
      get() {
        return this.$store.state.img_src;
      },
      set(value) {
        this.$store.commit("setImgSrc", { img_src: value });
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
</style>
