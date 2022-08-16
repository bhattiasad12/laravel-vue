<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import TheSideBar from "@/components/layout/TheSideBar.vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import DataTable from "@/components/datatable/DataTable.vue";
import ProductCreate from "./ProductCreate.vue";

const productsArr = ref([]);

const fields = ref([
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  { key: "description", label: "Description" },
  { key: "price", label: "Price" },
]);

onMounted(async () => {
  await axios
    .get("http://127.0.0.1:8000/api/product")
    .then((res) => {
      productsArr.value = res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
});

const modalStatus = ref(false);

function toggleModal() {
  modalStatus.value = !modalStatus.value;
}

function refreshTable() {
  axios
    .get("http://127.0.0.1:8000/api/product")
    .then((res) => {
      productsArr.value = res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <ProductCreate
    :modalStatus="modalStatus"
    @close="toggleModal"
    @refreshTable="refreshTable"
  />

  <body
    class="dark-mode header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed aside-enabled aside-fixed"
    style="
      --kt-toolbar-height: 55px;
      --kt-toolbar-height-tablet-and-mobile: 55px;
    "
  >
    <div class="d-flex flex-column flex-root">
      <TheSideBar />
      <div class="page d-flex flex-row flex-column-fluid">
        <div class="wrapper d-flex flex-column flex-row-fluid">
          <TheHeader />
          <div class="content d-flex flex-column flex-column-fluid">
            <div class="toolbar">
              <div class="container-fluid d-flex flex-stack">
                <div
                  class="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0"
                >
                  <h1
                    class="d-flex align-items-center text-dark fw-bolder fs-3 my-1"
                  >
                    Product List
                  </h1>
                  <span class="h-20px border-gray-300 border-start mx-4"></span>
                  <ul
                    class="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1"
                  >
                    <li class="breadcrumb-item text-muted">
                      <a
                        href="../../demo1/dist/index.html"
                        class="text-muted text-hover-primary"
                        >Home</a
                      >
                    </li>
                    <li class="breadcrumb-item">
                      <span class="bullet bg-gray-300 w-5px h-2px"></span>
                    </li>
                    <li class="breadcrumb-item text-muted">Products</li>
                    <li class="breadcrumb-item">
                      <span class="bullet bg-gray-300 w-5px h-2px"></span>
                    </li>
                    <li class="breadcrumb-item text-dark">Product Listing</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="post d-flex flex-column-fluid">
              <div class="container-xxl">
                <div class="card">
                  <div class="card-header border-0 pt-6">
                    <div class="card-title">
                      <div
                        class="d-flex align-items-center position-relative my-1"
                      >
                        <span
                          class="svg-icon svg-icon-1 position-absolute ms-6"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <rect
                              opacity="0.5"
                              x="17.0365"
                              y="15.1223"
                              width="8.15546"
                              height="2"
                              rx="1"
                              transform="rotate(45 17.0365 15.1223)"
                              fill="black"
                            />
                            <path
                              d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <input
                          type="text"
                          class="form-control form-control-solid w-250px ps-15"
                          placeholder="Search Customers"
                        />
                      </div>
                    </div>
                    <div class="card-toolbar">
                      <div class="d-flex justify-content-end">
                        <button class="btn btn-primary" @click="toggleModal">
                          Add Product
                        </button>
                      </div>
                      <div
                        class="d-flex justify-content-end align-items-center d-none"
                      >
                        <div class="fw-bolder me-5">
                          <span class="me-2"></span>Selected
                        </div>
                        <button type="button" class="btn btn-danger">
                          Delete Selected
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="card-body pt-0">
                    <DataTable
                      :fields="fields"
                      :items="productsArr"
                      :action="true"
                      :checkBox="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
