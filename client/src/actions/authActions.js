import axios from 'axios';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from '../actions/types';
import {returnErrors} from './errorActions';

// register user
export const register = ({name, email, password}) => dispatch => {
    // hearders
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // request body
    const body = JSON.stringify({ name, email, password });

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// Login user
export const login = ({ email, password}) => dispatch => {
    // hearders
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // request body
    const body = JSON.stringify({ email, password });

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}


// logout
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// check token and load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });


    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err  => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })
};

// setup config/headfers and token
export const tokenConfig = getState => {
        // get token from local storage
        const token = getState().auth.token;

        // headers
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
    
        // if token, add to heasers
        if(token) {
            config.headers['x-auth-token'] = token;
        }

        return config;
}