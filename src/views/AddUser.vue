<template>
  <div>
    <h1>Wizard App</h1>
    <div class="navbar">
      <input v-model="search" type="text" placeholder="Search..." />
      <button class="float-left" @click="searchData">Search</button>
      <button class="float-left" @click="resetData">Reset</button>
      <button class="float-right" @click="showSteps">Add New</button>
    </div>
    <table v-if="users.length > 0" class="table">
      <thead>
        <tr>
          <th scope="col">ID <i class="fa fa-unsorted"></i></th>
          <th scope="col">Name <i class="fa fa-unsorted"></i></th>
          <th scope="col">Email <i class="fa fa-unsorted"></i></th>
          <th scope="col">DOB <i class="fa fa-unsorted"></i></th>
          <th scope="col">Phone no. <i class="fa fa-unsorted"></i></th>
          <th scope="col">College <i class="fa fa-unsorted"></i></th>
          <th scope="col">CGPA <i class="fa fa-unsorted"></i></th>
          <th scope="col">Qualification <i class="fa fa-unsorted"></i></th>
          <th scope="col">Hobby <i class="fa fa-unsorted"></i></th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.dob }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.college }}</td>
          <td>{{ user.cgpa }}</td>
          <td>{{ user.qualification }}</td>
          <td>{{ user.hobby }}</td>
          <td>
            <button title="Delete" @click="deleteUser(user.id)">
              <i class="fa fa-trash-o"></i>
            </button>
            <button title="View" @click="viewUser(user.id)">
              <i class="fa fa-eye"></i>
            </button>
            <button title="View" @click="editUser(user.id)">
              <i class="fa fa-pencil"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <step-first
      v-if="step === 1 && (showWizard || edit)"
      :editUserData="editUserData"
      @reset-data="resetData"
      @hideWizard="hideModal"
    />
    <step-second
      v-if="step === 2 && (showWizard || edit)"
      :editUserData="editUserData"
      @reset-data="resetData"
      @hideWizard="hideModal"
    />
    <step-third
      v-if="step === 3 && (showWizard || edit)"
      :editUserData="editUserData"
      @reset-data="resetData"
      @hideWizard="hideModal"
    />
    <view-user
      v-if="viewData"
      :viewShow="viewData"
      @hideView="hideViewModal"
      :userId="userId"
    />
  </div>
</template>
<script>
import axios from "axios";
import StepFirst from "../components/steps/StepFirst.vue";
import StepSecond from "../components/steps/StepSecond.vue";
import StepThird from "../components/steps/StepThird.vue";
import ViewUser from "../components/ViewUser";

export default {
  components: {
    StepFirst,
    StepSecond,
    StepThird,
    ViewUser,
  },
  data() {
    return {
      validation: {},
      validate: false,
      showWizard: false,
      viewData: false,
      users: [],
      editUserData: {},
      search: "",
      sortField: "id",
      sortOrder: "desc",
      userId: 0,
    };
  },
  mounted() {
    this.searchData();
  },
  watch: {
    // whenever watch variable changes, their function will run
    showWizard: function () {
      document.body.style.overflow = this.showWizard ? "hidden" : "";
    },
    viewData: function () {
      document.body.style.overflow = this.viewData ? "hidden" : "";
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
    edit: {
      get() {
        return this.$store.state.edit;
      },
      set(value) {
        this.$store.commit("setEdit", { edit: value });
      },
    },
    id: {
      get() {
        return this.$store.state.id;
      },
      set(value) {
        this.$store.commit("setId", { id: value });
      },
    },
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

    hobby: {
      get() {
        return this.$store.state.hobby;
      },
      set(value) {
        this.$store.commit("setHobby", { hobby: value });
      },
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
    dob: {
      get() {
        return this.$store.state.dob;
      },
      set(value) {
        this.$store.commit("setDob", { dob: value });
      },
    },
    phone: {
      get() {
        return this.$store.state.phone;
      },
      set(value) {
        this.$store.commit("setPhone", { phone: value });
      },
    },
    workExperience: {
      get() {
        return this.$store.state.work_experience;
      },
      set(value) {
        this.$store.commit("setWorkExperience", { work_experience: value });
      },
    },
  },
  methods: {
    sortData(field, order) {
      this.sortField = field;
      this.sortOrder = order;
      this.searchData();
    },
    hideModal() {
      this.showWizard = false;
      this.edit = false;
      this.step = 1;
      this.name = "";
      this.email = "";
      this.phone = "";
      this.dob = "";
      this.qualification = "";
      this.college = "";
      this.cgpa = 0;
      this.password = "";
      this.password_confirmation = "";
      this.workExperience = "";
      this.hobby = "";
      this.id = 0;
    },
    hideViewModal() {
      this.viewData = false;
    },
    viewUser(id) {
      this.userId = id;
      this.viewData = true;
    },
    editUser(id) {
      axios.get(`/users/${id}`).then((response) => {
        this.editUserData = response.data.user;
        this.name = this.editUserData.name;
        this.email = this.editUserData.email;
        this.hobby = this.editUserData.hobby;
        this.qualification = this.editUserData.qualification;
        this.college = this.editUserData.college;
        this.cgpa = this.editUserData.cgpa;
        this.dob = this.editUserData.dob;
        this.phone = this.editUserData.phone;
        this.workExperience = this.editUserData.work_experience;
      });
      this.edit = true;
      this.id = id;
    },
    deleteUser(id) {
      if (confirm("Are you sure you want to delete this user?")) {
        axios
          .delete(`/users/${id}`)
          .then((response) => {
            if (response.data.success === true) {
              this.$toast.success(
                `( ${response.data.user.name} ) ` + "User deleted successfully"
              );
              this.resetData();
            }
          })
          .catch(() => {
            this.$toast.error("Something went wrong");
          });
      }
    },
    resetData() {
      this.search = "";
      this.sortField = "id";
      this.sortOrder = "asc";
      this.hideModal();
      this.searchData();
    },
    searchData() {
      axios
        .get("/users", {
          params: {
            search: this.search,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
          },
        })
        .then((response) => (this.users = response.data.users))
        .catch((error) => console.log(error));
    },
    showSteps() {
      this.showWizard = true;
    },
  },
};
</script>
<style scoped>
.table {
  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid;
  padding: 5px;
}

.navbar {
  overflow: hidden;
  background-color: #2c3e50;
}

input {
  border: 0;
  background-color: white;
  width: 200px;
  float: left;
  margin: 12px;
  padding: 7px;
}

.float-left {
  float: left;
}
.float-right {
  float: right;
}
.fa {
  font-size: 20px;
}
</style>
