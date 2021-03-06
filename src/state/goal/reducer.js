import {getCurrentDate} from '../../components/util/util'

const initialState = {
    goals : []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_GOALS":
            return {...state, goals: action.payload};
        case "ADD_GOAL":
            return {...state, goals: [...state.goals, action.payload]};
        case "COMPLETE_GOAL":
            return {...state, 
                goals: state.goals.map(goal => {
                    if(goal.id === action.payload){
                        goal.finishDate = getCurrentDate();
                        goal.status = 'Completed';
                    }
                    return goal;
                })
            };
        case "FAIL_GOAL":
            return {...state, 
                goals: state.goals.map(goal => {
                    if(goal.id === action.payload){
                        goal.finishDate = getCurrentDate();
                        goal.status = 'Fail';
                    }
                    return goal;
                })
            };
        case "MOVE_GOAL":
            return {...state, 
                goals: state.goals.map(goal => {
                    if(goal.id === action.payload.id){
                        goal.targetDate = action.payload.newTargetDate;
                    }
                    return goal;
                })
            };
        default:
            return state;
    }
};
