import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initState = {
    user: null
}

//is authToken exists in the localstorage?
if (localStorage.getItem('authToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('authToken'));

    // has expired?
    // @fixme Date.now is the current browser time that can be different from server time
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('authToken');
    } else {
        initState.user = decodedToken;
    }
}


const AuthContext = createContext({
    user: null,
    login: () => {

    },
    logout: () => {

    }
});

function authReducer(state, action) {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [ state, dispatch ] = useReducer(authReducer, initState);

    function login(data) {
        localStorage.setItem('authToken', data.token);
        dispatch({
            type: 'LOGIN',
            payload: data,
        });
    }

    function logout() {
        localStorage.removeItem('authToken');
        dispatch({
            type: 'LOGOUT'
        });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
}

export { AuthContext, AuthProvider }