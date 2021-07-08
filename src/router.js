import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "./views/component/Landing";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import ChangePassword from "./views/auth/ChangePassword";

// import store from "./stores/store";
import BookManager from "./views/layouts/BookManager";
import UserManager from "./views/layouts/UserManager";
import CategoryManager from "./views/layouts/CategoryManager";
import HomePage from "./views/component/Home";
import Content from "./views/component/Content";
import About from "./views/component/About";
import NotFound from "./views/component/NotFound";
import BookDetail from "./views/component/BookDetail.vue";

import UserList from "./views/layouts/users/List";
import UserAdd from "./views/layouts/users/Add";
import UserUpdate from "./views/layouts/users/Update";

import CategoryList from "./views/layouts/categories/List";
import CategoryAdd from "./views/layouts/categories/Add";
import CategoryUpdate from "./views/layouts/categories/Update";

import BookList from "./views/layouts/books/List";
import BookAdd from "./views/layouts/books/Add";
import BookUpdate from "./views/layouts/books/Update";

import store from "./store";
Vue.use(VueRouter);

const getRouters = function(role) {
  const routers = [];

  switch (role) {
    case "ADMIN":
      routers.push({
        path: "/admin",
        name: "admin",
        component: Landing,
        children: [
          {
            path: "/books",
            name: "BookManager",
            component: BookManager,
            children: [
              {
                path: "",
                name: "BookList",
                component: BookList,
              },
              {
                path: "/books/add",
                name: "BookAdd",
                component: BookAdd,
              },
              {
                path: "/books/update/:id",
                name: "BookUpdate",
                component: BookUpdate,
              },
            ],
          },
          {
            path: "/users",
            name: "UserManager",
            component: UserManager,
            children: [
              {
                path: "",
                name: "UserList",
                component: UserList,
              },
              {
                path: "/users/add",
                name: "UserAdd",
                component: UserAdd,
              },
              {
                path: "/users/update/:id",
                name: "UserUpdate",
                component: UserUpdate,
              },
            ],
          },
          {
            path: "/categories",
            name: "CategoryManager",
            component: CategoryManager,
            children: [
              {
                path: "",
                name: "CategoryList",
                component: CategoryList,
              },
              {
                path: "/categories/add",
                name: "CategoryAdd",
                component: CategoryAdd,
              },
              {
                path: "/categories/update/:id",
                name: "CategoryUpdate",
                component: CategoryUpdate,
              },
            ],
          },
        ],
      });
      break;
    case "CONTRIBUTOR":
      routers.push({
        path: "/admin",
        name: "admin",
        component: Landing,
        children: [
          {
            path: "/books",
            name: "BookManager",
            component: BookManager,
            children: [
              {
                path: "",
                name: "BookList",
                component: BookList,
              },
              {
                path: "/books/add",
                name: "BookAdd",
                component: BookAdd,
              },
              {
                path: "/books/update/:id",
                name: "BookUpdate",
                component: BookUpdate,
              },
            ],
          },
        ],
      });
      break;
    default:
      break;
  }

  routers.push({
    path: "/",
    name: "home",
    component: HomePage,
    children: [
      {
        path: "",
        name: "content",
        component: Content,
      },
      {
        path: "/about",
        name: "about",
        component: About,
      },
      {
        path: "/changePassword",
        name: "changePassword",
        component: ChangePassword,
      },
      {
        path: "/login",
        name: "login",
        component: Login,
      },
      {
        path: "/register",
        name: "register",
        component: Register,
      },
    {
        path: "/bookdetail/:id",
        name: "BookDetail",
        component: BookDetail,
      },
      {
        path: "*",
        component: NotFound,
      },
    ],
  });

  return routers;
};

// dung Vuex get thong in user
// getRouters()
// router.addRoutes(getRouters('role'))
store.subscribe((mutation) => {
  if (mutation.type === "SET_USER_INFO" || mutation.type === "SET_NEW_TOKEN") {
    router.addRoutes(getRouters(mutation.payload.data.role));
  }
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: getRouters(store.getters.userRole),
});

router.beforeEach((to, from, next) => {
  const token = store.getters.userToken;
  console.log(token);
  if (to.name !== "login" && !token) {
    console.log(to.name);
    if (to.name === "register") {
      next();
    } else {
      next({ name: "login" });
    }
  } else if ((to.name === "login" || to.name === "register") && token) {
    next({ name: "home" });
  } else next();
});

export default router;
