export default {
    getBreadListState(state){
        return state.breadListState || JSON.parse(sessionStorage.getItem('breadListStorage')) || [];
    }
};