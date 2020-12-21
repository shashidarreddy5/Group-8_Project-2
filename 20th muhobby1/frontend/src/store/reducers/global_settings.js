import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
    user: {},
    profile:{},
    hobbies: [],
    mates: []
};

const setGlobal = (state, action) => {
    action = action.data.data
    console.log(action)
    return updateObject(state, {
        user: action.profile.user?action.profile.user:{},
        hobbies: action.hobbies,
        profile: action.profile,
        mates:action.profile.mates?action.profile.mates:[]
    });
};

const getGlobalFail = (state, action) => {
    return updateObject(state, {
    });
};

const setProfile =(state,action)=>{
    console.log(action)
    return updateObject(state, {
        profile:action.data,
        user:action.data.user
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_GLOBAL_SUCCESS:
            return setGlobal(state, action);
        case actionType.GET_GLOBAL_FAIL:
            return getGlobalFail(state, action);
        case actionType.GET_PROFILE_SUCCESS:
            return setProfile(state, action);
        default:
            return state;
    }
};

export default reducer;