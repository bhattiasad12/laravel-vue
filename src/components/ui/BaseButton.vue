<template>
  <!-- <span class="badge" :class="type">{{ text }}</span> -->
  <button
    href="../../demo1/dist/.html"
    class="btn btn-sm btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#kt_modal_create_app"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: ["type", "title"],
  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>
