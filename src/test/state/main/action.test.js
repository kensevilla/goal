import * as actions from '../../../state/main/action'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from "axios"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Main actions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({})
    });

    it('handles fetchGoals', () => {
        const expectedActions = [{
            type: "FETCH_GOALS"
        }];
        const mockReturnValue = [{
            "id" : 1,
            "description": "wow",
            "targetDate": "2018-12-12",
            "finishDate": "",
            "status": "In-Progress"
        }];
        const expectedURL = 'http://localhost:8080/api/goal/getAll';
        jest.spyOn(axios, "get").mockReturnValueOnce(Promise.resolve({mockReturnValue}));

        return store.dispatch(actions.fetchGoals()).then(()=>{
            expect(axios.get).toHaveBeenCalledWith(expectedURL)
            expect(store.getActions()).toEqual(expectedActions)
            axios.get.mockReset()
        });
    })

    it('handles addGoal', () => {
        const expectedActions = [{
            type: "ADD_GOAL"
        }];
        const mockReturnValue = {
            "id" : 1,
            "description": "wow",
            "targetDate": "2018-12-12",
            "finishDate": "",
            "status": "In-Progress"
        };

        const goalDetails = {
            "description": "wow",
            "targetDate": "2018-12-12",
            "finishDate": "",
            "status": "In-Progress"
        };

        const expectedURL = 'http://localhost:8080/api/goal/addGoal';
        jest.spyOn(axios, "post").mockReturnValueOnce(Promise.resolve(mockReturnValue));

        return store.dispatch(actions.addGoal(goalDetails)).then(()=>{
            expect(axios.post).toHaveBeenCalledWith(expectedURL, goalDetails)
            expect(store.getActions()).toEqual(expectedActions)
            axios.post.mockReset()
        });
    })

    it('handles completeGoal', () => {
        const expectedActions = [{
            type: "COMPLETE_GOAL",
            payload : 1
        }];
        const mockReturnValue = {
            "id" : 1,
            "description": "wow",
            "targetDate": "2018-12-12",
            "finishDate": "2018-02-03",
            "status": "Completed"
        };

        const id = 1;

        const expectedURL = 'http://localhost:8080/api/goal/completeGoal/'+ id;
        jest.spyOn(axios, "post").mockReturnValueOnce(Promise.resolve({data: mockReturnValue}));

        return store.dispatch(actions.completeGoal(id)).then(()=>{
            expect(axios.post).toHaveBeenCalledWith(expectedURL)
            expect(store.getActions()).toEqual(expectedActions)
            axios.post.mockReset()
        });
    })

    it('handles failGoal', () => {
        const expectedActions = [{
            type: "FAIL_GOAL",
            payload : 1
        }];
        const mockReturnValue = {
            "id" : 1,
            "description": "wow",
            "targetDate": "2018-12-12",
            "finishDate": "",
            "status": "Fail"
        };

        const id = 1;

        const expectedURL = 'http://localhost:8080/api/goal/failGoal/'+ id;
        jest.spyOn(axios, "post").mockReturnValueOnce(Promise.resolve({data: mockReturnValue}));

        return store.dispatch(actions.failGoal(id)).then(()=>{
            expect(axios.post).toHaveBeenCalledWith(expectedURL)
            expect(store.getActions()).toEqual(expectedActions)
            axios.post.mockReset()
        });
    })

    it('handles moveGoal', () => {
        const expectedActions = [{
            type: "MOVE_GOAL",
            payload : {id : 1, newTargetDate : "2020/02/03"}
        }];
        const mockReturnValue = {
            "id" : 1,
            "description": "wow",
            "targetDate": "2020/02/03",
            "finishDate": "",
            "status": "In-Progress"
        };

        const id = 1;
        const newTargetDate = {targetDate : "2020/02/03"};

        const expectedURL = 'http://localhost:8080/api/goal/moveGoal/'+ id;
        jest.spyOn(axios, "post").mockReturnValueOnce(Promise.resolve({data: mockReturnValue}));

        return store.dispatch(actions.moveGoal(id, newTargetDate.targetDate)).then(()=>{
            expect(axios.post).toHaveBeenCalledWith(expectedURL, newTargetDate)
            expect(store.getActions()).toEqual(expectedActions)
            axios.post.mockReset()
        });
    })
})