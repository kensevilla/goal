export const checkReducerFn = (reducer, initialStateClone, initialState, action, newState, newInitialState) => {
    let startingState = initialState
    if (newInitialState)
        startingState = newInitialState

    expect(reducer(startingState, action)).toEqual(newState)
    // test that initialState is not mutated
    expect(initialState).toEqual(initialStateClone)
}

export const clone = (source) => {
    return JSON.parse(JSON.stringify(source))
}