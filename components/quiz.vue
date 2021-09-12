<template>
  <div>
    <br>
    <template v-for="elements,index in jsonData">
      <quiz-child
        :elements="elements"
        :index="index"
        :answerArray="answerArray"
        @answerArray1="typeanswer"
        :key="`first-${index}`"
      ></quiz-child>
    </template>
    <v-btn
      color="primary"
      @click="fillCheck()"
      v-if="!isMaster"
    >see result</v-btn>
    <br>
    <p
      v-if="!ifFillAnswer"
      class="red-font"
    >not answered</p>
    <template v-if="isDisplayResults">
      <template v-for="element, index in answerArray">
        <v-card :key="`second-${index}`">
          <p>You selected {{element.userSelect}}</p>
          <p>Answer is {{element.answer}}</p>
          <template v-if="element.flag">
            <p>you correct</p>
          </template>
          <template v-else>
            <p>you wrong</p>
          </template>
        </v-card>
      </template>
    </template>
  </div>
</template>
<script>
import quizChild from "./quizChild.vue";
export default {
  components: { quizChild },
  props: ["jsonData"],
  data() {
    return {
      answerArray: [],
      isDisplayResults: false,
      ifFillAnswer: true
    };
  },

  mounted() {
    //add unique key

    // make answerflgs
    for (const keys in this.jsonData) {
      this.answerArray.push({ notselected: true });
    }
  },
  computed: {
    questions() {
      this.question = this.jsonData;
    },
    isMaster() {
      return this.$store.getters["isMaster"];
    }
  },
  methods: {
    typeanswer(val) {
      console.log(val);
      this.answerArray = val;
    },
    displayResult() {
      this.isDisplayResults = true;
      this.$emit("answerArray", this.answerArray);
    },
    fillCheck() {
      //notselected exist return false
      for (let index in this.answerArray) {
        console.log(this.answerArray[index].notselected);
        if (this.answerArray[index].notselected) {
          return (this.ifFillAnswer = false);
        }
      }
      this.displayResult();
      return (this.ifFillAnswer = true);
    }
  }
};
</script>
<style scoped>
.red-font{
  color: red
}
</style>
