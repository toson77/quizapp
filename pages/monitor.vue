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
      <v-card class="logo py-4 d-flex justify-center">
        <v-card-title class="headerline">
          monitor
        </v-card-title>
        <v-btn @click="getData">getData</v-btn>
      </v-card>
      <template v-for="result, index in results">
        <v-card :key="`first-${index}`">
          <p>answerer:{{result.name}}</p>
          <template v-for="element, index in result.answer">
            <p :key="`second-${index}`">answer:{{element}}</p>
          </template>
        </v-card>
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
  }
};
</script>
