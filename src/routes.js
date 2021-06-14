import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import Login from "./pages/LoginPage";
import PlayerPage from "./pages/PlayerPage";
import CoachPage from "./pages/CoachPage";
import TeamPage from "./pages/TeamPage";

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
        path: "/players/:id",
        name: "players",
        component: PlayerPage
    },
    {
        path: "/coaches/:id",
        name: "coaches",
        component: CoachPage
    },
    {
        path: "/teams/:id",
        name: "teams",
        component: TeamPage
    },
    {
        path: "*",
        name: "notFound",
        component: NotFound
    }
];

export default routes;