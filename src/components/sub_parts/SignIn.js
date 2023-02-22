import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


import {_signIn } from "../../data/actions/authAction";

class SignIn extends Component {
    state = {
        Name : "",
   
    };

 

      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };

      _submitDetails = async (e) => {
          const {Name} = this.state;
          const PostData = {
                name : Name,
            };

          await this.props._signIn(PostData).then(async(response) => {
              console.log(response.data);
            if (response.data.status) {
                localStorage.setItem("sessionUser", JSON.stringify(response.data.result[0]));
                // await this.props.history.push('/home');
                window.location.href='/home';
            }
        }).catch(function (error) {
             throw error;
        });
      }

  render() {
     const { Name } = this.state;
     const enabled = Name  != "";

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                
                <div className="form-outline mb-3">
                    <label className="form-label"> Name</label>
                        <input type="text" 
                          name="Name"
                          value={Name}
                          onChange={this.handleChange}
                          className="form-control form-control-lg"
                        placeholder="Please enter your name" />
                    </div>
                   
                <div className="row">
                    <div className="col text-center">
                        <button type="button" className="btn btn-primary" disabled={!enabled} onClick={(e)=>this._submitDetails(e)}>Start Test</button>
                        </div>
                    </div>
                    </div>
                </div>   
            </div>
        </section>
    );
  }
}

SignIn.propTypes = {
    _signIn: PropTypes.func.isRequired,
  };

  
export default withRouter(
    connect(null, { _signIn, })(SignIn)
  );
  