import Vue from 'vue'
import Vuex from 'vuex'
import VueToast from 'vue-toast-notification';
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// load modules
import ressourcemonitor from './ressourcemonitor'

Vue.use(Vuex);
Vue.use(VueToast);

export default new Vuex.Store({
    state: {
        packageVersion: process.env.PACKAGE_VERSION || '0.0.0',
    },
    modules: {
        ressourcemonitor,
    },
    getters: getters,
    mutations: mutations,
    actions: actions
});
