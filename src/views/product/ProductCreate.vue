<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth";
const props = defineProps(["modalStatus"]);
const emit = defineEmits(["refreshTable", "close"]);

const name = ref("");
const slug = ref("");
const description = ref("");
const price = ref("");
const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

function submitForm() {
  console.log(name.value);
  console.log(slug.value);
  console.log(description.value);
  console.log(price.value);

  axios
    .post(
      "http://127.0.0.1:8000/api/product",
      {
        name: name.value,
        slug: slug.value,
        description: description.value,
        price: price.value,
      },
      { headers: { Authorization: `Bearer ${auth.token}` } }
    )
    .then(function (response) {
      console.log(response);
      emit("refreshTable");
      emit("close");
    })
    .catch(function (error) {
      console.log(error);
    });
}
</script>
<template>
  <div class="modal-mask" v-if="modalStatus">
    <div class="" @click="$emit('close')">
      <div class="modal-dialog modal-dialog-centered mw-650px">
        <div class="modal-content" @click.stop>
          <form class="form" @submit.prevent="submitForm">
            <div class="modal-header">
              <h2 class="fw-bolder">Add a Customer</h2>
              <div
                class="btn btn-icon btn-sm btn-active-icon-primafry"
                @click.prevent="$emit('close')"
              >
                <span class="svg-icon svg-icon-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      opacity="0.5"
                      x="6"
                      y="17.3137"
                      width="16"
                      height="2"
                      rx="1"
                      transform="rotate(-45 6 17.3137)"
                      fill="black"
                    />
                    <rect
                      x="7.41422"
                      y="6"
                      width="16"
                      height="2"
                      rx="1"
                      transform="rotate(45 7.41422 6)"
                      fill="black"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div class="modal-body py-10 px-lg-17">
              <div class="fv-row mb-7">
                <label class="fs-6 fw-bold mb-2">Product Name</label>
                <input
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="Iphone X"
                  name="name"
                  v-model.trim="name"
                />
              </div>
              <div class="fv-row mb-7">
                <label class="fs-6 fw-bold mb-2">
                  <span class="">Slug</span>
                </label>
                <input
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="product-name"
                  name="slug"
                  v-model.trim="slug"
                />
              </div>
              <div class="fv-row mb-7">
                <label class="fs-6 fw-bold mb-2">Description</label>
                <textarea
                  class="form-control form-control-solid"
                  name="description"
                  s
                  id=""
                  cols="30"
                  rows="4"
                  v-model="description"
                ></textarea>
              </div>
              <div class="fv-row mb-7">
                <label class="fs-6 fw-bold mb-2">Price</label>
                <input
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="99.9"
                  name="price"
                  v-model.number="price"
                />
              </div>
            </div>

            <div class="modal-footer flex-center">
              <button
                class="btn btn-light me-3"
                @click.prevent="$emit('close')"
              >
                Discard
              </button>
              <button class="btn btn-primary" type="submit">
                <span class="indicator-label">Submit</span>
                <span class="indicator-progress"
                  >Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span
                ></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 1055;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  overflow-y: auto;
}
</style>
