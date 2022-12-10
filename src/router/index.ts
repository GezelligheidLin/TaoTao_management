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
        children:[
            {
                path:"",
                redirect:"/Principal/adminControlPanel"
            },
            {
                path:"adminControlPanel",
                name:"adminControlPanel",
                component: () => import("../components/Principal/adminControlPanel.vue")
            },
            {
                path:"merchantControlPanel",
                name:"merchantControlPanel",
                component: () => import("../components/Principal/merchantControlPanel.vue")
            },
            {
                path:"userControlPanel",
                name:"userControlPanel",
                component: () => import("../components/Principal/userControlPanel.vue")
            },
        ]
    }
];
const router = createRouter({
    history,
    routes
})
export default router
