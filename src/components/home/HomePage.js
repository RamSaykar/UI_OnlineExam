import React, { Component } from "react";
import RenderQuestion from "./RenderQuestion";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";

import {
  _getAllQuestions,
  setQuesReducer,
  _saveQuestionsOptions,
} from "../../data/actions/userActions";

class HomePage extends Component {
  state = {
    questions: [],
    currentQuestion: [],
    prevIndex: null,
    currentIndex: null,
    isSuccess: null,
  };

  _responseUserAnswer = async () => {
    await this.setState({
      isSuccess: (
        <SweetAlert
          success
          style={{ display: "block" }}
          title="Test submitted Successfully"
          onConfirm={() => this.submitNext()}
          confirmBtnBsStyle="info deleteuserbtn"
          confirmBtnText={"click To See Result"}
        ></SweetAlert>
      ),
    });
  };

  submitNext = async () => {
    window.location.href = "/get-my-score";
    // await this.props.history.push('/get-my-score');
  };

  _getAllQuestions = async (e) => {
    await this.props
      ._getAllQuestions()
      .then(async (response) => {
        if (response.data.status) {
          console.log(response.data);
          await this.setState({
            questions: response.data.result,
            currentIndex: 1,
            prevIndex: 0,
          });
        }
      })
      .catch(function (error) {
        throw error;
      });
  };

  async componentDidMount() {
    await this._getAllQuestions();
  }

  _loadNextQues = async (e) => {
    const { currentIndex } = this.state;
    if (currentIndex < 10 && currentIndex > 0) {
      await this.setState({
        prevIndex: currentIndex,
        currentIndex: currentIndex + 1,
      });
    }
  };

  _loadPrevQues = async (e) => {
    const { prevIndex } = this.state;
    if (prevIndex > 0 && prevIndex < 10) {
      await this.setState({
        prevIndex: prevIndex - 1,
        currentIndex: prevIndex,
      });
    }
  };

  _setOptions = async (value, data) => {
    const { questions } = this.state;
    new Promise((resolve, reject) => {
      var exist = false;
      for (var i = 0; i < questions.length; i++)
        if (questions[i].question_id === data.question_id) {
          exist = true;
          break;
        }
      if (exist) {
        var addQueRes = {
          option1: questions[i].option1,
          option2: questions[i].option2,
          option3: questions[i].option3,
          option4: questions[i].option4,
          question: questions[i].question,
          question_id: questions[i].question_id,
          selectedOption: value,
        };

        var index = questions.findIndex(
          (item) => item.question_id === data.question_id
        );
        questions.splice(index, 1, addQueRes);
        resolve(questions);
      }
    }).then((questions) => {
      this.props.setQuesReducer(questions);
      this.setState({ questions: questions });
    });
  };

  _submitTest = async (e) => {
    const { getQuestionData } = this.props;
    let sessionUser = JSON.parse(localStorage.getItem("sessionUser"));

    if (getQuestionData.length > 0) {
      await this.props
        ._saveQuestionsOptions({
          PostData: getQuestionData,
          userId: sessionUser.user_id,
        })
        .then(async (response) => {
          if (response.data.status) {
            await this._responseUserAnswer();
          }
        })
        .catch(function (error) {
          throw error;
        });
    }
  };

  render() {
    const { questions, prevIndex, currentIndex } = this.state;

    return (
      <React.Fragment>
        {" "}
        {this.state.isSuccess}{" "}
        <div className="container mt-5">
          <div className="d-flex justify-content-center row">
            <div className="col-md-10 col-lg-10">
              <div className="border">
                <div className="question bg-white p-3 border-bottom">
                  <div className="d-flex flex-row justify-content-between align-items-center mcq">
                    <h4> MCQ Quiz </h4>{" "}
                  </div>{" "}
                </div>
                <RenderQuestion
                  questions={questions ? questions : []}
                  currentIndex={currentIndex}
                  prevIndex={prevIndex}
                  setOptions={this._setOptions}
                />
                <div className="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                  <button
                    className="btn btn-primary d-flex align-items-center btn-danger"
                    type="button"
                    onClick={(e) => this._loadPrevQues(e)}
                  >
                    <i className="fa fa-angle-left mt-1 mr-1"> </i>
                    &nbsp;previous
                  </button>
                  <button
                    className="btn btn-primary d-flex align-items-center btn-info"
                    type="button"
                    onClick={(e) => this._submitTest(e)}
                  >Submit Test{" "}
                  </button>
                  <button
                    className="btn btn-primary border-success align-items-center btn-success"
                    type="button"
                    onClick={(e) => this._loadNextQues(e)}
                  >
                    {" "}
                    Next <i className="fa fa-angle-right ml-2"> </i>{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  _getAllQuestions: PropTypes.func.isRequired,
  setQuesReducer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getQuestionData: state.UserReducer.getQuestionData,
});
export default withRouter(
  connect(mapStateToProps, {
    _getAllQuestions,
    setQuesReducer,
    _saveQuestionsOptions,
  })(HomePage)
);
