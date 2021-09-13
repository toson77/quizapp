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
          Making Quiz using spreadsheet!
        </v-card-title>
        <v-card-text>
          <ol>
            <li>Spread Sheet ID入力</li>
            <v-text-field
              v-model.trim="id"
              label="ID"
            ></v-text-field>
            <p>get:{{apiurl}}</p>
            <p>parse csv to json</p>
            <li>Tap MakeButton</li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="parseData(url, doStuff, catchError)"
          >
            Make quiz
          </v-btn>
        </v-card-actions>
        <p
          class="red-font"
          v-if="isDlError"
        >error: Can't Download CSV Prease check id and Spreadsheets Sharing settings</p>
        <br>
      </v-card>
      <template v-if="jsonData.length">
        <quiz :jsonData="jsonData"></quiz>
        <nuxt-link
          :to="{name:'monitor', query:{id: id}}"
          class="text-h6"
          target="_blank"
        >monitorURL</nuxt-link>
        <nuxt-link
          :to="{name:'answerer',query:{id: id}}"
          class="text-h6"
          target="_blank"
        >answererURL</nuxt-link>
      </template>
    </v-col>
  </v-row>

</template>
<script>
export default {
  data() {
    return {
      id: "",
      url: "",
      jsonData: {},
      isDlError: false,
      monitorUrl: "",
      panelistUrl: ""
    };
  },
  computed: {
    /*must write template*/
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
    },
    doStuff(data) {
      this.jsonData = data;
    },

    isEmpty(obj) {
      return !Object.keys(obj).length;
    }
  },
  mounted() {
    //set ismaster in vuex
    this.$store.commit("isMaster", true);
  }
};
</script>
<style scoped>
.red-font{
  color: red
}
</style>
