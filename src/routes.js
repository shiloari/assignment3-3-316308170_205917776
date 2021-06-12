import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import Login from "./pages/LoginPage";

const routes = [{
        path: "/",
        name: "main",
        component: Main
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import ("./pages/RegisterPage")
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/search",
        name: "search",
        component: () =>
            import ("./pages/SearchPage")
    },
    {
        path: "*",
        name: "notFound",
        component: NotFound
    }
];

export default routes;