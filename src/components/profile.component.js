import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import {getRoleLocalization} from "../common/localization";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { email: "" },
      firstName: { firstName: "" },
      lastName: { lastName: "" },
      middleName: { middleName: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            Профиль: <strong>{currentUser.lastName + " " + currentUser.firstName + " " +currentUser.middleName}</strong>
          </h3>
        </header>
        <p>
          <strong>Токен:</strong>{" "}
          {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.token.substr(currentUser.token.length - 20)}
        </p>
        <p>
          <strong>Идентификатор:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Почта:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Роль:</strong>{" "}
          {getRoleLocalization(currentUser.role)}
      </div>: null}
      </div>
    );
  }
}
