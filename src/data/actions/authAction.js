var configData = require("../config.js");
var Api = configData.Api;

export const _signIn = async (data) => {
    return dispatch => {
      return Api.post(
        "/user-checkin",
        data
      );
    };
  }