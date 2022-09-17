import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPen, faTrash, faClose } from '@fortawesome/free-solid-svg-icons';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

/* add icons to the library */
library.add(faPen, faTrash, faClose);

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia).use(router).mount('#app');
