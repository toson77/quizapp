<template>
  <div>
    <p>{{jsonData}} </p>
    <br>
    <p>{{questions}}</p>
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
      @click="displayResult()"
    >see result</v-btn>
    <p>{{answerArray}}</p>
    <br>
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
      isDisplayResults: false
    };
  },
  mounted() {
    //add unique key

    // make answerflgs
    for (const keys in this.jsonData) {
      this.answerArray.push({});
    }
  },
  computed: {
    questions() {
      this.question = this.jsonData;
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
    }
  }
};
</script>
