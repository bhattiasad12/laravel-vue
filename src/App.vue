<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth";

const auth = useAuthStore();

onMounted(async () => {
  auth.tryLogin();
});
</script>

<template>
  <!-- <ProductIndex /> -->
  <RouterView />
</template>

<style>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
@import "@/assets/plugins/custom/datatables/datatables.bundle.css";
@import "@/assets/plugins/global/plugins.dark.bundle.css";
@import "@/assets/css/style.dark.bundle.css";
</style>
