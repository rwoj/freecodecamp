import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SignUpForm from "../forms/SignUpForm";
import {Container} from 'semantic-ui-react'
import {signup} from '../../actions/users'

class SignUpPage extends React.Component{

  submit = data =>
    this.props.signup(data)
      .then(()=>this.props.history.push("/login"))

  render(){
    return (
      <Container text>
        <div>
          <br></br>
          <h1>Sign Up</h1>
          <br></br>
          <SignUpForm submit={this.submit} />
        </div>
      </Container>
    )
  }
}
SignUpPage.propTypes={
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
}

export default connect(null, {signup})(SignUpPage)
