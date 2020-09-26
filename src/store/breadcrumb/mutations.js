export default {
    breadListStateAdd(state, obj) {
        state.breadListState.push(obj);
        sessionStorage.setItem('breadListStorage',JSON.stringify(state.breadListState));
    },
    breadListStateRemove(state, num) {
        state.breadListState.splice(num, state.breadListState.length - num);
        sessionStorage.setItem('breadListStorage',JSON.stringify(state.breadListState));
    },
    setBreadListMutations(state,list){
        state.breadListState = JSON.parse(list);
        sessionStorage.setItem('breadListStorage',list);
    }
};
