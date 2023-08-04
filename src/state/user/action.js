import axios from 'axios'

 const url = 'https://ken-goal-backend-4293616a5984.herokuapp.com/api/user';


export const _createUser = user =>{
    return async (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(url + '/createUser', user).then(response => {
                dispatch({
                    type: "SET_USER",
                    payload: response.data
                });
                resolve(response.data);
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export const _getUser = user =>{
    return async (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(url + '/login', user).then(response => {
                dispatch({
                    type: "SET_USER",
                    payload: response.data
                });
                resolve(response.data);
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export const _logoutUser = user =>{
    return async (dispatch) => {
        dispatch({
            type: "SET_USER",
            payload: null
        });
    }
}