/**
 * Created by ELEMIAN on 19.01.2022.
 */
const getDefaultState = () => {
    return {
        messages: []
    }
};
export default {
    state: getDefaultState(),
    getters: {
        getMessages(state){
            console.log("messages readed")
            return state.messages
        }
    },
    mutations: {
        setMessages(state, messages){
            state.messages = [];
            messages.forEach(function (el) {
                state.messages.push(el)
            })
        }
    }
}
