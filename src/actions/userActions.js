import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL } from "../constants/userConstants";

export const signup = (fname, lname, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNUP_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/register/',
            { 'fname': fname, 'lname': lname, 'email': email, 'password': password }, config)
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        })
    } catch (error) {
        const errorMessage = error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message;

        // console.log("Signup Failure Payload:", errorMessage);
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: errorMessage,
        })
    }

}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login/',
            { 'username': email, 'password': password }, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}
