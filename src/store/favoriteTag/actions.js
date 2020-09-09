import * as types from './mutations_types';

export default  {
    addFavoriteTags({ commit }, view) {
        commit('ADD_FAVORITE_TAGS', view)
    },

    updateFavoriteTags({ commit }, view) {
        commit('UPDATE_FAVORITE_TAGS', view)
    },

    delFavoriteTags({ commit, state }, view) {
        return new Promise((resolve) => {
            commit('DEL_FAVORITE_TAGS', view)
            resolve([...state.favoriteTags])
        })
    },

    delAllFavoriteTags({ commit, state }, view) {
        return new Promise((resolve) => {
            commit('DEL_ALL_TAGS', view)
            resolve([...state.favoriteTags])
        })
    }
};