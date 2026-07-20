import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import SearchResultsView from "../views/SearchResultsView.vue";
import QuizView from "../views/QuizView.vue";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/category/:category",
            name: "category",
            component: CategoryView
        },
        {
            path: "/search",
            name: "search",
            component: SearchResultsView
        },
        {
            path: "/quiz",
            name: "quiz",
            component: QuizView
        }
    ]
});

export default router;