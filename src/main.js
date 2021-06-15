import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import VueSession from 'vue-session'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
var options = {
    persist: true
}

Vue.use(VueSession, options)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
import axios from "axios";
axios.defaults.withCredentials = true
const baseURL = 'http://localhost:3000/';
const server = axios.create({
    baseURL,
    withCredentials: true
})

import { shared_data } from "./store"
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
    routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
    FormGroupPlugin,
    FormPlugin,
    FormInputPlugin,
    ButtonPlugin,
    CardPlugin,
    NavbarPlugin,
    FormSelectPlugin,
    AlertPlugin,
    ToastPlugin,
    LayoutPlugin,
    InputGroupPlugin
} from "bootstrap-vue";
[
    FormGroupPlugin,
    FormPlugin,
    FormInputPlugin,
    ButtonPlugin,
    CardPlugin,
    NavbarPlugin,
    FormSelectPlugin,
    AlertPlugin,
    ToastPlugin,
    LayoutPlugin,
    InputGroupPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;


// Vue.prototype.$root.store = shared_data;

new Vue({
    router,
    data() {
        return {
            store: shared_data,
            server: server,
            // variables: variables,
            // methods: methods
            // api_domain: "http://localhost:3000"
        };
    },
    methods: {
        toast(title, content, variant = null, append = false) {
            this.$bvToast.toast(`${content}`, {
                title: `${title}`,
                toaster: "b-toaster-top-center",
                variant: variant,
                solid: true,
                appendToast: append,
                autoHideDelay: 3000
            });
        },
        async get_data() {
            console.log('before api')
            const all_data = (await this.$root.server.get("league/getAll")).data;
            localStorage.setItem("all_teams", JSON.stringify(all_data[0]));
            localStorage.setItem("all_players", JSON.stringify(all_data[1]));
            localStorage.setItem("all_coaches", JSON.stringify(all_data[2]));

        }
    },
    created() {
        this.get_data().then(console.log('after'))
    },
    render: (h) => h(App)
}).$mount("#app");