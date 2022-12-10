// index.ts
import {createStore, Store} from 'vuex'
import {InjectionKey} from 'vue'

export const key: InjectionKey<Store<state>> = Symbol('key')

export type state ={
    leftBar:boolean
    loginPrompt:number
}
export default createStore({
    state:{
        leftBar:true,
        loginPrompt:0,
    },
    mutations:{
        changeLoginPrompt(state, number) {
            state.loginPrompt = number
        }
    }
})
