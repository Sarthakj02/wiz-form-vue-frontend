<template>
  <div>
    <label for="first_name">First Name</label>
    <input type="text" id="first_name" name="name" v-model="name" />
    <label for="email_address">Email</label>
    <input type="email" id="email_address" name="email" v-model="email" />
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      test: 0,
    };
  },
  computed: {
    name: {
      get() {
        return this.$store.state.name;
      },
      set(value) {
        this.$store.commit("setName", { name: value });
      },
    },
    email: {
      get() {
        return this.$store.state.email;
      },
      set(value) {
        this.$store.commit("setEmail", { email: value });
      },
    },
  },
};
</script>
