export const addGoal = goalDetails =>{
    return async (dispatch) => {
        dispatch({
            type: "ADD_GOAL",
            payload: goalDetails
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