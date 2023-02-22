import { STORE_SOLVED_QUESTION_DATA } from './types';

var configData = require("../config.js");
var Api = configData.Api;

export const _getAllQuestions = async () => {
    return dispatch => {
      return Api.get(
        "/get-all--questions"
      );
    };
  }

  export const _saveQuestionsOptions = async (data) => {
    return dispatch => {
      return Api.post(
        "/collect-user-questions",
        data
      );
    };
  }

  
  export const _getMyScoreDetails = async (data) => {
    return dispatch => {
      return Api.post(
        "/get-user-score-details",
        data
      );
    };
  }


  export function setQuesReducer(data) {
    return dispatch => {
          return dispatch({ type: STORE_SOLVED_QUESTION_DATA,
                            payload : data });
           };
      }