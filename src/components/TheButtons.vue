<template>
  <div>
    <button class="step-button" @click="navigatePrev" v-show="togglePrevious()">
      Previous
    </button>
    <button class="step-button" @click="navigateNext" type="button">
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
                <button class="step-button" @click="close">close</button>
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
    return {
      showResult: false,
      result: "",
    };
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
      if (this.$store.state.step === 1) {
        this.$store.commit("setStep", { step: 2 });
      } else if (this.$store.state.step === 2) {
        this.$store.commit("setStep", { step: 3 });
      } else {
        this.result = this.$store.state.name;
        alert(this.$store.state.name);
        this.showResult = true;
      }
    },
    navigatePrev() {
      if (this.$store.state.step === 3) {
        this.$store.commit("setStep", { step: 2 });
      } else if (this.$store.state.step === 2) {
        this.$store.commit("setStep", { step: 1 });
      }
    },
    close() {},
  },
};
</script>
<style scoped>
.step-button {
}
</style>
