import ProductIndex from "../views/product/ProductIndex.vue";
import SignIn from "../views/auth/SignIn.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/productindex" },
    {
      path: "/signin",
      name: "sign-in",
      component: SignIn,
      meta: { requiresAuth: false },
    },
    {
      path: "/productindex",
      name: "product-index",
      component: ProductIndex,
      meta: { requiresAuth: true },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  if (
    // make sure the user is authenticated
    to.meta.requiresAuth &&
    !useAuthStore().isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== "sign-in"
  ) {
    // redirect the user to the login page
    return { path: "/signin" };
  }
});

export default router;
