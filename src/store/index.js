import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        count: 0,
        apiContent: ''
    },
    actions: {
        request (ctx) {
            axios.get('/api')
            .then((res) => {
                ctx.commit('request', res.status);
            }).catch((res) => {
                console.log(res);
            })
        }
    },
    mutations: {
        increment (state) {
            state.count++
        },
        request (state, cont) {
            state.apiContent = cont;
        }
    }
})
