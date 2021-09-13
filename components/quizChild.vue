<template>
  <v-card :key="index">
    <h3>Q:{{elements.question}}</h3>
    <v-radio-group v-model="userSelect">
      <v-radio
        v-for="(value, key,index) in onlyQuestions"
        :key="value"
        :label="value"
        :value="value"
      ></v-radio>
    </v-radio-group>
    <p v-if="isMaster">answer:{{answer}}</p>
  </v-card>
</template>
<script>
export default {
  props: ["elements", "index", "answerArray"],
  data() {
    return {
      answer: "",
      userSelect: ""
    };
  },
  computed: {
    onlyQuestions() {
      let results = {};
      for (const key in this.elements) {
        if (
          key !== "answer" &&
          key !== "question" &&
          this.elements[key] !== ""
        ) {
          results[key] = this.elements[key];
        }
      }
      return results;
    },
    isMaster() {
      return this.$store.getters["isMaster"];
    }
  },
  watch: {
    userSelect(newValue) {
      let flg = false;
      if (this.answer === newValue) {
        flg = true;
      } else {
        flg = false;
      }
      const resultObject = {
        question: this.elements["question"],
        userSelect: this.userSelect,
        answer: this.answer,
        flag: flg
      };
      this.$set(this.answerArray, Number(this.index), resultObject);
      // return answerFlgs to quiz.vue
      this.$emit("answerArray1", this.answerArray);
    }
  },
  methods: {},
  mounted() {
    //extract answer
    for (const key in this.elements) {
      if (key === "answer") {
        this.answer = this.elements[key];
      }
    }
  }
};
</script>
