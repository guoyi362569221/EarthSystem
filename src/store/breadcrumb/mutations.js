export default {
    breadListStateAdd(state, obj) {
        state.breadListState.push(obj);
    },
    breadListStateRemove(state, num) {
        state.breadListState.splice(num, state.breadListState.length - num);
    },
    setBreadListMutations(state,list){
        state.breadListState = JSON.parse(list);
        sessionStorage.setItem('breadListStorage',list);
    }
};
