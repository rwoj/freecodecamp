import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import LoginForm from "../forms/LoginForm";
import {Container} from 'semantic-ui-react'
import {login} from "../../actions/users"

class LoginPage extends React.Component {
  submit = data =>
    this.props.login(data)
      .then(()=>this.props.history.push("/"))

  render (){
    return (
      <Container text>
        <div>
          <br></br>
          <h1>Login page</h1>
          <br></br>
          <LoginForm submit={this.submit} />
          {/* <Link to="/forgot_password">Forgot Password?</Link> */}
          </div>
        </Container>
      )
  }
}

LoginPage.propTypes={
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
}

export default connect(null, {login})(LoginPage)
