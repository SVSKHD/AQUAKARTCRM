import Layout from "../layout/layout";
import a from "@/utils/constants.js";
const { appRoute } = a;
export default [
  {
    path: appRoute.LOGIN,
    name: "Signin",
    component: () => import("../views/Auth/Signin"),
  },
  {
    path: "/app",
    name: "App",
    component: Layout,
    children: [
      {
        path: appRoute.DASHBOARD,
        name: "dashboard",
        component: () => import("../views/Dashboard"),
        meta: {
          title: "Dashboard",
        },
      },
      {
        path: appRoute.TASK,
        name: "taskManager",
        component: () => import("../views/TaskManager"),
        meta: {
          title: "Task Manager",
        },
      },
      {
        path: appRoute.CALENDER,
        name: "calender",
        component: () => import("../views/Schedular"),
        meta: {
          title: "Calendar",
        },
      },
      {
        path: appRoute.EMAIL,
        name: "email",
        component: () => import("../views/Email"),
        meta: {
          title: "Email",
        },
      },
      {
        path: appRoute.MESSAGE,
        name: "message",
        component: () => import("../views/Messenger"),
        meta: {
          title: "Messenger",
        },
      },
      {
        path: appRoute.SETTINGS,
        name: "settings",
        component: () => import("../views/Settings"),
        meta: {
          title: "Settings",
        },
      },
      {
        path: "/ui",
        name: "ui",
        component: () => import("../views/UI"),
        meta: {
          title: "UI Component",
        },
      },
      {
        path: appRoute.MESSAGE,
        name: "message",
        component: () => import("../views/Messenger"),
        meta: {
          title: "Messenger",
        },
      },
      {
        path: appRoute.FORMBUILDER,
        name: "form-builder",
        component: () => import("../views/From-Builder/index.vue"),
        meta: {
          title: "Form-builder",
        },
      },
      {
        path: appRoute.TESTSCHEDULERUI,
        name: "Test-Scheduler",
        component: () => import("../views/testScheduler"),
        meta: {
          title: "test-scheduler",
        },
      },
      {
        path: appRoute.TESTTASKMANAGERUI,
        name: "Test-taskmanager",
        component: () => import("../views/testTaskmanager"),
        meta: {
          title: "test-task-manager",
        },
      },
    ],
  },
  {
    path: appRoute.NOTFOUND,
    name: "Not-found",
    component: () => import("../views/NotFound/NotFound"),
  },
];
