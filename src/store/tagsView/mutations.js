import * as types from './mutations_types'
import {
    store
} from 'utils/';

export default {
    [types.ADD_VISITED_VIEWS](state, view) {
        if (state.visitedViews.some(v => v.path === view.path)) return
        state.visitedViews.push({
            name: view.name,
            path: view.path,
            favorite: !!view.favorite
        })
        state.cachedViews.push(view.name);
        store.set('visitedViews', state.visitedViews);
    },

    [types.UPDATE_VISITED_VIEWS](state, view) {
        state.visitedViews.forEach(v => {
            if (v.path === view.path) {
                v['favorite'] = view.favorite;
            }
        });
        store.set('visitedViews', state.visitedViews);
    },

    [types.DEL_VISITED_VIEWS](state, view) {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1)
                break
            }
        }
        for (const i of state.cachedViews) {
            if (i === view.name) {
                const index = state.cachedViews.indexOf(i)
                state.cachedViews.splice(index, 1)
                break
            }
        }

        store.set('visitedViews', state.visitedViews);
    },

    [types.DEL_OTHERS_VIEWS](state, view) {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews = state.visitedViews.slice(i, i + 1)
                break
            }
        }
        for (const i of state.cachedViews) {
            if (i === view.name) {
                const index = state.cachedViews.indexOf(i)
                state.cachedViews = state.cachedViews.slice(index, i + 1)
                break
            }
        }
        store.set('visitedViews', state.visitedViews);
    },

    [types.DEL_ALL_VIEWS](state) {
        state.visitedViews = [];
        state.cachedViews = [];
        store.remove('visitedViews');
    },
};