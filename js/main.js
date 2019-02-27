import emailApp from './pages/email-app-cmp.js';
import keepApp from './pages/keep-app-cmp.js';
import mainRoutes from './routes.js';

const mainRouter = new VueRouter({routes: mainRoutes})

window.vueApp = new Vue({
    el: '#app',
    router: mainRouter,
    components: {
        emailApp,
        keepApp,
    }
})