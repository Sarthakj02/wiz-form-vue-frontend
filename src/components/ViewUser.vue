<template v-model="viewShow">
  <div>
    <div class="view-data">
      <div>User Details</div>
    </div>
    <!-- <div class="outside" v-on:click="closeModal"></div> -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  props: {
    viewShow: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    if (this.userId) {
      this.getUser();
    }
  },
  methods: {
    getUser() {
      axios.get(`/users/${this.userId}`).then((response) => {
        this.user = response.data.user;
      });
    },
    closeModal() {
      this.$emit("hideView", true);
    },
  },
  computed: {
    step: {
      get() {
        return this.$store.state.step;
      },
      set(value) {
        this.$store.commit("setStep", { step: value });
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
.view-data {
  width: 500px;
  height: 100px;
  position: absolute;
  z-index: 500;
  left: 50%;
  top: 40%;
  margin-left: -150px;
  margin-top: -150px;
  background: white;
}
</style>
