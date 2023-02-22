import { STORE_SOLVED_QUESTION_DATA } from '../actions/types';
const initialState = {
    getQuestionData: [],

};

export const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case STORE_SOLVED_QUESTION_DATA:
            return {
                ...state,
                getQuestionData: action.payload,             
            }
           
        default:
            return state;
    }
}