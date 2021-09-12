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
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Quiz
        </v-card-title>
        <v-card-text>
          <ol>
            <li>Input UserName</li>
            <v-text-field
              v-model.trim="userName"
              label="UserName"
            ></v-text-field>
            <p>get:{{apiurl}}</p>
            <li>Tap StartButton</li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="userName.length"
            color="primary"
            @click="parseData(url, doStuff, catchError)"
          >
            start
          </v-btn>
        </v-card-actions>
        <p
          class="red-font"
          v-if="isDlError"
        >error: Can't Download CSV Prease check id and Spreadsheets Sharing settings</p>
        <br>
      </v-card>
      <template v-if="jsonData.length">
        <quiz
          :jsonData="jsonData"
          @answerArray="sendPost"
        ></quiz>
      </template>
    </v-col>
  </v-row>
</template>
<script>
import { db } from "~/src/plugins/firebase.js";
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";
export default {
  data() {
    return {
      id: "",
      url: "",
      jsonData: {},
      userName: "",
      isDlError: false,
      debugAnswer: []
    };
  },
  methods: {},
  computed: {
    apiurl() {
      /*make dl csv url*/
      this.url =
        "https://docs.google.com/spreadsheets/d/" +
        this.id +
        "/export?format=csv&gid=0";
      return this.url;
    }
  },
  methods: {
    /*csv download */
    parseData(url, callBack, callBacke) {
      this.$papa.parse(url, {
        header: true,
        download: true,
        error: function(errors) {
          callBacke(errors);
        },
        complete: function(results) {
          callBack(results.data);
        }
      });
    },
    catchError(errors) {
      this.isDlError = true;
      console.log(this.isDlError);
    },
    doStuff(data) {
      this.jsonData = data;
    },

    isEmpty(obj) {
      return !Object.keys(obj).length;
    },
    async sendPost(answerArray) {
      let sendjson = { name: this.userName, answer: [], quizid: this.id };
      this.$set(sendjson, "answer", answerArray);
      try {
        await setDoc(doc(collection(db, this.id)), sendjson);
      } catch (e) {
        alert("firebase error");
        console.log(e);
      }
    }
  },
  mounted() {
    //get query id
    this.id = this.$route.query.id;
  }
};
</script>
<style scoped>
.red-font{
  color: red
}
</style>
