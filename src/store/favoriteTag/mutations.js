import * as types from './mutations_types'

import {
    store
} from 'utils/';

export default {
    [types.ADD_FAVORITE_TAGS](state, view) {
        if (state.favoriteTags.some(v => v.path === view.path)) return
        state.favoriteTags.push({
            name: view.name,
            path: view.path,
            collectsatus:view.collectsatus,
            showcollectstatus:view.showcollectstatus,
        });

        store.set('favoriteTags', state.favoriteTags);
    },

    [types.UPDATE_FAVORITE_TAGS](state, view) {

        state.favoriteTags.forEach(v => {
            if (v.path === view.path) {
                v['showcollectstatus'] = view.showcollectstatus;
            }
        });
        store.set('favoriteTags', state.favoriteTags);
    },


    [types.DEL_FAVORITE_TAGS](state, view) {
        for (const [i, v] of state.favoriteTags.entries()) {
            if (v.path === view.path) {
                state.favoriteTags.splice(i, 1)
                break
            }
        }

        store.set('favoriteTags', state.favoriteTags);
    },


    [types.DEL_ALL_TAGS](state) {
        state.favoriteTags = [];
        store.remove('favoriteTags');
    }
};