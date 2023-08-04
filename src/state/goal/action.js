import axios from 'axios'

const url = 'https://ken-goal-backend-4293616a5984.herokuapp.com/api/goal';

export const fetchGoals = userId =>{
    return async (dispatch) => {
        const response = await axios.get(url + '/getAll/' + userId);
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
        const response = await axios.post(url + '/completeGoal/' + id);
        dispatch({
            type: "COMPLETE_GOAL",
            payload: response.data.id
        })
    }
}
export const failGoal = id =>{
    return async (dispatch) => {
        const response = await axios.post(url + '/failGoal/' + id);
        dispatch({
            type: "FAIL_GOAL",
            payload: response.data.id
        })
    }
}
export const moveGoal = (id, newTargetDate) =>{
    return async (dispatch) => {
        console.log(newTargetDate);
        const response = await axios.post(url + '/moveGoal/' + id, {targetDate: newTargetDate});
        dispatch({
            type: "MOVE_GOAL",
            payload: {id : response.data.id, newTargetDate : response.data.targetDate}
        })
    }
}