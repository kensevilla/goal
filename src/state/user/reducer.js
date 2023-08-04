const initialState = {
    userId : null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_USER":
            return {...state, userId: action.payload};
        default:
            return state;
    }
};
