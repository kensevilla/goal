const initialState = {
    modalVisible : false,
    goalToBeMove : null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "SHOW_MODAL":
            return {...state, modalVisible: true, goalToBeMove : action.payload};
        case "HIDE_MODAL":
                return {...state, modalVisible: false};
        default:
            return state;
    }
};