import reducer from '../../../state/goal/reducer'
import {clone, checkReducerFn} from '../../testHelper'
import {getCurrentDate} from '../../../components/util/util'

describe('Main reducers', () => {
    let checkReducer;

    const initialState = {
        goals : []
    };

    const newInitialState = {
        goals : [{
            "id" : 1,
            "description": "wow",
            "targetDate": "2018-12-12",
            "finishDate": "",
            "status": "In-Progress"
        }]
    };

    const initialStateClone = clone(initialState);

    beforeEach(()=>{
        checkReducer = checkReducerFn.bind(null, reducer, initialStateClone, initialState)
    })

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('handles fetch goals', () => {
        const action = {
            type: "FETCH_GOALS",
            payload: [{
                "id" : 1,
                "description": "wow",
                "targetDate": "2018-12-12",
                "finishDate": "",
                "status": "In-Progress"
            }]
        };
        const expectedState = clone(initialState);
        expectedState.goals = [{
            "id" : 1,
            "description": "wow",
            "targetDate": "2018-12-12",
            "finishDate": "",
            "status": "In-Progress"
        }];
        checkReducer(action, expectedState);
    })

    it('handles add goal', () => {
        const action = {
            type: "ADD_GOAL",
            payload: {
                "id" : 2,
                "description": "another goal",
                "targetDate": "2018-12-12",
                "finishDate": "",
                "status": "In-Progress"
            }
        };
        const expectedState = clone(newInitialState);
        expectedState.goals = [{
            "id" : 1,
            "description": "wow",
            "targetDate": "2018-12-12",
            "finishDate": "",
            "status": "In-Progress"
        },
        {
            "id" : 2,
            "description": "another goal",
            "targetDate": "2018-12-12",
            "finishDate": "",
            "status": "In-Progress"
        }];
        checkReducer(action, expectedState, newInitialState);
    })

    it('handles complete goal', () => {
        const action = {
            type: "COMPLETE_GOAL",
            payload: 1
        };
        const expectedState = clone(newInitialState);
        expectedState.goals = [{
            "id" : 1,
            "description": "wow",
            "targetDate": "2018-12-12",
            "finishDate": getCurrentDate(),
            "status": "Completed"
        }];
        checkReducer(action, expectedState, clone(newInitialState));
    })

    it('handles fail goal', () =>{
        const action = {
            type: "FAIL_GOAL",
            payload: 1
        }
        const expectedState = clone(newInitialState);
        expectedState.goals = [{
            "id" : 1,
            "description": "wow",
            "targetDate": "2018-12-12",
            "finishDate": getCurrentDate(),
            "status": "Fail"
        }];
        checkReducer(action, expectedState, clone(newInitialState));
    })

    it('handles move goal', () =>{
        const action = {
            type: "MOVE_GOAL",
            payload: {id : 1, newTargetDate : "2020-02-03"}
        }
        const expectedState = clone(newInitialState);
        expectedState.goals = [{
            "id" : 1,
            "description": "wow",
            "targetDate": "2020-02-03",
            "finishDate": "",
            "status": "In-Progress"
        }];
        checkReducer(action, expectedState, clone(newInitialState));
    })
})