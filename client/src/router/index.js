import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";
import SignUpView from "../views/SignUpView.vue";
import LoginView from "../views/LoginView.vue";
import WeatherView from "../views/WeatherView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
      meta: { requiresAuth: false }, // allow access to unauthenticated users
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true }, // only allow access to authenticated users

    },
    {
      path: "/weather",
      name: "weather",
      component: WeatherView,
      meta: { requiresAuth: true }, // only allow access to authenticated users
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
      meta: { requiresAuth: true }, // only allow access to authenticated users
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresAuth: false }, // allow access to unauthenticated users
    },
  ],
});

// Navigation guard to redirect unauthenticated users to the login page
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (
    (to.name === "login" || to.name === "signup") &&
    isAuthenticated
  ) {
    next({ name: "weather" });
  } else {
    next();
  }
});

export default router;
