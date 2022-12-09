import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
    {
        path:"/",
        redirect:"Login"
    },
    {
        path: "/Login",
        name: "Login",
        component: () => import("../components/pages/Login.vue"),
    },
    {
        path: "/Principal",
        name: "Principal",
        component: () => import("../components/Principal/Principal.vue"),
    }
];
const router = createRouter({
    history,
    routes
})
export default router
