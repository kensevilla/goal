
export const showModal = goalToBeMove =>{
    return async (dispatch) => {
        dispatch({
            type: "SHOW_MODAL",
            payload: goalToBeMove
        })
    }
}

export const hideModal = () =>{
    return async (dispatch) => {
        dispatch({
            type: "HIDE_MODAL",
        })
    }
}