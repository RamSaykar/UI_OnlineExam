import React, { Component } from 'react';
class RenderQuestion extends Component {

    _onchangeQues = async (e,que) => {
        await this.props.setOptions(e.target.value,que);
    }

  render() {
    const {questions,prevIndex,currentIndex} = this.props;
    return (
        <React.Fragment>
            {questions && questions.length > 0 && questions.slice(prevIndex,currentIndex).map((que)=>(
            <div className="question bg-white p-3 border-bottom" key={que.question_id}>
                <div className="d-flex flex-row align-items-center question-title">
                    <h3 className="text-danger">Q.</h3>
                    <h5 className="mt-1 ml-2">{que.question}</h5>
                </div>
                <div className="ans ml-2">
                 <label className="radio">
                     <input type="radio" 
                            value={que.option1} 
                            checked={que.selectedOption === que.option1} 
                            onChange={(e)=> this._onchangeQues(e,que)} /> 
                            <span>{que.option1}</span>
                    </label>
                </div>
                <div className="ans ml-2">
                    <label className="radio"> 
                    <input type="radio" 
                            value={que.option2} 
                            checked={que.selectedOption === que.option2} 
                            onChange={(e)=> this._onchangeQues(e,que)} /> 
                            <span>{que.option2}</span>
                    </label>
                </div>
                <div className="ans ml-2">
                    <label className="radio"> 
                        <input type="radio" 
                                value={que.option3} 
                                checked={que.selectedOption === que.option3} 
                                onChange={(e)=> this._onchangeQues(e,que)} /> 
                                <span>{que.option3}</span>
                    </label>
                </div>
                <div className="ans ml-2">
                    <label className="radio"> 
                    <input type="radio" 
                            value={que.option4} 
                            checked={que.selectedOption === que.option4} 
                            onChange={(e)=> this._onchangeQues(e,que)} /> 
                            <span>{que.option4}</span>

                    </label>
                </div>
            </div>))}
        </React.Fragment>
    );
  }
}



export default RenderQuestion;