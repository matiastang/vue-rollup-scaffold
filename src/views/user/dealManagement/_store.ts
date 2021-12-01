import { Module, ActionContext, MutationTree, ActionTree } from 'vuex'
import { Invoic } from '@/@types'
import { postInvList } from '@/api'
import { RootStateTypes } from 'store/indexInterface'

// state
const stateTree: () => Invoic.InvoicState = () => ({
    last: {
        address: {},
        member: {},
    },
    list: [],
})

// mutation

const MutationTypes = {
    updateList: 'updateList',
    updateLast: 'updateLast',
} as const

type TMutations = {
    [MutationTypes.updateList]<T extends Array<Invoic.AsObject>>(
        state: Invoic.InvoicState,
        payload: T
    ): void
    [MutationTypes.updateLast]<T extends Invoic.AsObject>(
        state: Invoic.InvoicState,
        payload: T
    ): void
}
const mutations: MutationTree<Invoic.InvoicState> & TMutations = {
    [MutationTypes.updateList](state, payload) {
        state.list = payload
    },
    [MutationTypes.updateLast](state, payload) {
        if (!state.last.invId) state.last = payload
    },
}

// action
export const ActionTypes = {
    fetchPostInvList: 'fetchPostInvList',
} as const

export type TActions = {
    [ActionTypes.fetchPostInvList]: (
        context: ActionContext<Invoic.InvoicState, RootStateTypes>,
        payload: Invoic.Query
    ) => Promise<void> | void
}

const actions: ActionTree<Invoic.InvoicState, RootStateTypes> & TActions = {
    [ActionTypes.fetchPostInvList]({ commit }, payload) {
        return new Promise((reslove, reject) => {
            postInvList(payload)
                .then((response) => {
                    const list: Array<Invoic.AsObject> = response.rows
                    const len = list.length
                    commit(MutationTypes.updateList, response.rows)
                    commit(MutationTypes.updateLast, list[len - 1])
                    reslove(response)
                })
                .catch((error) => reject(error))
        })
    },
}

const invoiceModule: Module<Invoic.InvoicState, RootStateTypes> = {
    namespaced: true,
    state: stateTree,
    mutations,
    actions,
}
export default invoiceModule
