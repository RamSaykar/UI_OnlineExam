import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { _getMyScoreDetails } from "../../data/actions/userActions";

class HomePage extends Component {
  state = {
    scoreData: [],
    pecentage: 0,
    TotalQuestions: 5,
  };

  _getMyScoreDetails = async () => {
    let sessionUser = JSON.parse(localStorage.getItem("sessionUser"));
    await this.props
      ._getMyScoreDetails({ userId: sessionUser.user_id })
      .then(async (response) => {
        if (response.data.status) {
          // let totalAttempt = response.data.totalAttempt;
          let correctCount = response.data.correctCount;
          let TotalQuestions = response.data.TotalQuestions;
          let pecentage = parseInt(correctCount) / parseInt(TotalQuestions);
          await this.setState({
            scoreData: response.data,
            pecentage: parseFloat(pecentage) * 100,
          });
        }
      })
      .catch(function (error) {
        throw error;
      });
  };

  async componentDidMount() {
    await this._getMyScoreDetails();
  }

  render() {
    const { scoreData, pecentage } = this.state;
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div className="justify-content-center resultSection">
            <div className="row">
              <div className="col-6">
                <div className="row scoreDiv">
                  <div className="col-md-auto labelresult">
                    Total Questions:
                  </div>{" "}
                  <div className="col-md-2 labelresult">5 </div>{" "}
                </div>

                <div className="row scoreDiv">
                  <div className="col-md-auto labelresult">
                    Attempted Questions:
                  </div>{" "}
                  <div className="col-md-2 labelresult">
                    {" "}
                    {scoreData.totalAttempt ? scoreData.totalAttempt : 0}{" "}
                  </div>{" "}
                </div>

                <div className="row scoreDiv">
                  <div className="col-md-auto labelresult">
                    Correct Questions:
                  </div>{" "}
                  <div className="col-md-2 labelresult">
                    {" "}
                    {scoreData.correctCount ? scoreData.correctCount : 0}{" "}
                  </div>{" "}
                </div>

                <div className="row scoreDiv">
                  <div className="col-md-auto labelresult">
                    Wrong Questions:
                  </div>{" "}
                  <div className="col-md-2 labelresult">
                    {" "}
                    {scoreData.wrongCount ? scoreData.wrongCount : 0}{" "}
                  </div>{" "}
                </div>
              </div>

              <div className="col-6">
                <div className="row scoreDiv">
                  <div className="col-md-auto labelresult text-center">
                    <span className="percentage-text"> Percentage </span>{" "}
                    <CircularProgressbar
                      value={pecentage}
                      text={pecentage + "%"}
                      styles={buildStyles({ textColor: "#f88" })}
                    />
                  </div>{" "}
                </div>{" "}
              </div>
            </div>
          </div>{" "}
        </div>{" "}
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  _getMyScoreDetails: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { _getMyScoreDetails })(HomePage));
