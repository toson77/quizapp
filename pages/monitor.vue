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
      <client-only>
        <v-card>
          <apexchart
            type="bar"
            :options="chartOptions"
            :series="chartData"
          ></apexchart>
        </v-card>
      </client-only>
      <br>
      <template v-for="result, index in results">
        <v-card :key="`first-${index}`">
          <v-card-title>answerer:{{result.name}}</v-card-title>
          <template v-for="element, index in result.answer">
            <div
              :key="`second-${index}`"
              class="answer-element text-center"
            >
              <v-card-text
                v-if="element.question"
                class="text-h6 text-left"
              >{{element.question}}</v-card-text>
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
      results: [],
      chartOptions: {
        chart: {
          stacked: true,
          stackType: "100%"
        },

        xaxis: {
          categories: [],
          tickPlacement: "on"
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: "right",
          offsetX: 0,
          offsetY: 50
        },
        toolbar: {
          show: false
        }
      },
      chartData: [
        {
          name: "correct",
          data: []
        },
        {
          name: "wrong",
          data: []
        }
      ]
    };
  },
  methods: {
    async getData() {
      const docRef = collection(db, this.id);
      const docSnap = onSnapshot(docRef, docs => {
        this.list_init(docs);
        this.results = [];
        docs.forEach(doc => {
          this.makeChartData(doc.data());
          this.results.push(doc.data());
        });
      });
    },
    makeChartData(doc) {
      let categories = [];
      doc.answer.forEach((obj, index) => {
        categories.push(`question${index + 1}`);
        if (obj.flag) {
          this.chartData[0].data[index] += 1;
        } else {
          this.chartData[1].data[index] += 1;
        }
      });
      this.chartOptions.xaxis.categories = categories;
      //forced update drawing
      this.chartData[0].data.splice();
      this.chartOptions.xaxis.categories.splice();
    },
    list_init(docs) {
      let maxlength = 0;
      docs.forEach(doc => {
        if (doc.data().answer.length > maxlength) {
          maxlength = doc.data().answer.length;
        }
      });
      this.chartData[0].data = Array(maxlength).fill(0);
      this.chartData[1].data = Array(maxlength).fill(0);
      this.chartOptions.xaxis.categories = Array(maxlength).fill("");
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
