export const AuthReducer = (state = { loggedIn: false }, action) => {

    if(action.type === 'isLogin'){
        return { loggedIn: true }
    }

    if(action.type === 'notLogin'){
        return { loggedIn: false }
    }

    return state;

};