import { combineReducers } from 'redux';
import main from "./main/reducer"
import goal from "./goal/reducer"
import user from "./user/reducer"

export default combineReducers({
    main,
    goal,
    user
});