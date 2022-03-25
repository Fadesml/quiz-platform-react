import axios from "axios";

const API_URL = "https://ithub-quiz-platform.herokuapp.com/api/v1/auth";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.result.token) {
          localStorage.setItem("user", JSON.stringify(response.data.result));
        }

        return response.data.result;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, firstName, lastName, middleName, password) {
    return axios.post(API_URL + "/signup", {
      email,
      firstName,
      lastName,
      middleName,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAdmin() {
    return this.getCurrentUser().role === "ROLE_ADMIN"
  }
}

export default new AuthService();
