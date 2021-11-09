<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Quiz App</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} Toson</span>
    </v-footer>
  </v-app>
</template>

<script>
</script>
