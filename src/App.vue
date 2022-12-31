<template>
  <v-app>
    <v-navigation-drawer
      expand-on-hover
      width="92"
      class="d-flex align-end"
    >
      <img
        class="logo"
        src="./assets/Icon.svg"
        alt="logo"
      >
      <v-list
        density="compact"
        nav
      >
        <v-list-item
          prepend-icon="mdi-folder"
          class="ma-5"
        />
        <v-list-item
          prepend-icon="mdi-account-multiple"
          class="ma-5"
        />
        <v-list-item
          prepend-icon="mdi-star"
          class="ma-5"
        />
      </v-list>
      <v-list
        density="compact"
        nav
      >
        <v-list-item
          prepend-icon="mdi-logout"
          class="ma-5"
        />
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </v-app>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .logo{
    display: block;
    width: 44px;
    margin: 24px;
  }
</style>
