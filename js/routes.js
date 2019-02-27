import emailApp from './pages/email-app-cmp.js';

import keepApp from './pages/keep-app-cmp.js';
import keepEdit from './apps/keep/pages/keep-edit-cmp.js';

import aboutCmp from './pages/about-cmp.js';
import homeCmp from './pages/home-cmp.js';

const routes = [
    { path: '/', component: homeCmp },
    { path: '/about', component: aboutCmp },
    { path: '/email-app', component: emailApp },
    
    { path: '/keep-app', component: keepApp },
    { path: '/keep-edit/:noteId', component: keepEdit },
]

export default routes;