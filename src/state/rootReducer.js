import { combineReducers } from 'redux';
import main from "./main/reducer"
import goal from "./goal/reducer"

export default combineReducers({
    main,
    goal
});