/**
 * Created by ELEMIAN on 24.01.2022.
 */
const getDefaultState = () => {
    return {
        mapping: []
    }
};
export default {
    state: getDefaultState(),
    getters: {
        getMapping(state){
            return state.mapping
        }
    },
    mutations: {
        setMapping(state, mapping){
            state.mapping = mapping;
        }
    }
}