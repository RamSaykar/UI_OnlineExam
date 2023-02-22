import React, { Component } from "react";
import Countdown from "react-countdown";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { _saveQuestionsOptions } from "../../data/actions/userActions";
class Timer extends Component {
  _completeTimer() {
    const { getQuestionData } = this.props;
    let sessionUser = JSON.parse(localStorage.getItem("sessionUser"));
    if (getQuestionData.length > 0) {
      this.props
        ._saveQuestionsOptions({
          PostData: getQuestionData,
          userId: sessionUser.user_id,
        })
        .then(async (response) => {
          console.log("afterSaveQ");
          if (response.data.status) {
            // window.location.href='/get-my-score
            this.props.history.push("/get-my-score");
          }
        })
        .catch(function (error) {
          throw error;
        });
      return null;
    } else {
      return null;
    }
  }
  render() {
    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        console.log("completed");

        return this._completeTimer();
      } else {
        console.log("Else completed");
        return (
          <span className="showTimer">
            {" "}
            {minutes}: {seconds}{" "}
          </span>
        );
      }
    };

    return <Countdown date={Date.now() + 300000} renderer={renderer} />;
  }
}

const mapStateToProps = (state) => ({
  getQuestionData: state.UserReducer.getQuestionData,
});

export default withRouter(
  connect(mapStateToProps, { _saveQuestionsOptions })(Timer)
);
