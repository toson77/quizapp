<template>
  <v-row
    justify="center"
    align="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="6"
    >
      <v-card class=" py-4  justify-center text-center">
        <v-card-title class="text-center">
          monitor
        </v-card-title>
        <v-card-text class="text-h6">answerers:{{Object.keys(results).length}}</v-card-text>
        <v-card-actions>
          <v-btn
            @click="getData"
            v-show="false"
          >getData</v-btn>
        </v-card-actions>
      </v-card>
      <br>
      <template v-for="result, index in results">
        <v-card :key="`first-${index}`">
          <v-card-title>answerer:{{result.name}}</v-card-title>
          <template v-for="element, index in result.answer">
            <div
              :key="`second-${index}`"
              class="answer-element text-center"
            >
              <v-card-text class="text-h6">user-select:{{element.userSelect}}</v-card-text>
              <v-card-text class="text-h6">answer:{{element.answer}}</v-card-text>
              <v-icon
                v-if="element.flag"
                class="red-font symbol"
              >&#12295;</v-icon>
              <v-icon
                v-else
                class="red-font symbol"
              >&#10006;</v-icon>
            </div>
          </template>
        </v-card>
        <br>
      </template>
    </v-col>
  </v-row>
</template>
<script>
import { db } from "~/src/plugins/firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  onSnapshot
} from "firebase/firestore";
export default {
  data() {
    return {
      id: "",
      results: []
    };
  },
  methods: {
    async getData() {
      const docRef = collection(db, this.id);
      console.log(docRef);
      const docSnap = onSnapshot(docRef, docs => {
        this.results = [];
        docs.forEach(doc => {
          console.log(doc.id, " => ", doc.data());
          this.results.push(doc.data());
        });
      });
    }
  },
  mounted() {
    //get query id
    this.id = this.$route.query.id;
    //get data from firebase
    this.getData();
  }
};
</script>
<style scoped>
.red-font {
  color: red
}
.symbol {
  font-size: 30px;
}
.answer-element {
  padding-bottom: 20px;
}

</style>
