<template v-model="viewShow">
  <div>
    <div class="view-data">
      <span @click="closeModal" class="close">&times;</span>
      <div>
        <h2>User Details</h2>
        <table>
          <tr>
            <td><b>ID</b></td>
            <td>{{ user.id }}</td>
          </tr>
          <tr>
            <td><b>Name</b></td>
            <td>{{ user.name }}</td>
          </tr>
          <tr>
            <td><b>Email:</b></td>
            <td>{{ user.email }}</td>
          </tr>
          <tr>
            <td><b>Hobby</b></td>
            <td>{{ user.hobby }}</td>
          </tr>
          <tr>
            <td><b>College</b></td>
            <td>{{ user.college }}</td>
          </tr>
          <tr>
            <td><b>Qualification</b></td>
            <td>{{ user.qualification }}</td>
          </tr>
          <tr>
            <td><b>CGPA</b></td>
            <td>{{ user.cgpa }}</td>
          </tr>
          <tr>
            <td><b>DOB</b></td>
            <td>{{ user.dob }}</td>
          </tr>
          <tr>
            <td><b>Phone no.</b></td>
            <td>{{ user.phone }}</td>
          </tr>
          <tr>
            <td><b>Work Experience</b></td>
            <td>{{ user.work_experience }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="outside" v-on:click="closeModal"></div>
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
  max-width: 520px;
  max-height: 500px;
  position: fixed;
  top: calc(50% - 250px);
  left: calc(50% - 260px);
  z-index: 500;
  padding: 15px;
  background: white;
}

tr:nth-child(odd) {
  background-color: #f1f1f1;
}
td {
  padding: 5px;
}
table {
  margin: 15px;
}
table,
td {
  border: 1px groove;
  border-collapse: collapse;
}
</style>
