import axios from 'axios'

const url = 'http://localhost:8080/api/goal';

export const fetchGoals = () =>{
    return async (dispatch) => {
        const response = await axios.get(url + '/getAll');
        dispatch({
            type: "FETCH_GOALS",
            payload: response.data
        })
    }
}
export const addGoal = goalDetails =>{
    return async (dispatch) => {
        const response = await axios.post(url + '/addGoal', goalDetails);
        dispatch({
            type: "ADD_GOAL",
            payload: response.data
        })
    }
}
export const completeGoal = id =>{
    return async (dispatch) => {
        dispatch({
            type: "COMPLETE_GOAL",
            payload: id
        })
    }
}
export const failGoal = id =>{
    return async (dispatch) => {
        dispatch({
            type: "FAIL_GOAL",
            payload: id
        })
    }
}
export const moveGoal = goalDetails =>{
    return async (dispatch) => {
        dispatch({
            type: "MOVE_GOAL",
            payload: goalDetails
        })
    }
}