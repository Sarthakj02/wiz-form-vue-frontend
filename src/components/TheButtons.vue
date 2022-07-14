<template>
  <div>
    <button
      class=""
      @click="navigatePrev"
      type="button"
      v-show="togglePrevious()"
    >
      Previous
    </button>
    <button class="btn btn-info" @click="navigateNext" type="button">
      {{ nextBtnTxt() }}
    </button>
    <transition name="modal">
      <div class="modal-mask" v-show="showResult">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">Congrats</div>
            <div class="modal-body" v-html="result"></div>
            <div class="modal-footer">
              <slot name="footer">
                <button
                  class="modal-default-button btn btn-warning"
                  @click="close"
                >
                  close
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    nextBtnTxt() {
      if (this.$store.state.step === 3) {
        return "Finish";
      }
      return "Next";
    },
    togglePrevious() {
      if (this.$store.state.step === 1) {
        return false;
      }
      return true;
    },
    navigateNext() {
      if (this.$store.state.step == 1) {
        this.$router.push("/second-step/");
      } else if (this.$store.state.step == "secondStep") {
        this.$router.push("/third-step/");
      } else {
        console.log(this.$store.state.name);
      }
    },
    navigatePrev() {
      if (this.$store.state.step == "thirdStep") {
        this.$router.push("/second-step/");
      } else if (this.$store.state.step == "secondStep") {
        this.$router.push("/first-step/");
      }
    },
    close() {},
  },
};
</script>
