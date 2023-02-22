import React, { Component } from "react";
import Timer from "../home/Timer";

class Header extends Component {
  render() {
    console.log(this.props.history);
    console.log(window.location.href);
    return (
      <section className="bg-gradient">
        <div className="project-header">
          {" "}
          Online Exam
          {window.location.href === "http://localhost:3000/home" && (
            <span className="timercounter">
              <Timer />
            </span>
          )}
        </div>{" "}
      </section>
    );
  }
}

export default Header;
