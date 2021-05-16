import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ProfileForm from "../forms/ProfileForm";
import {Container} from 'semantic-ui-react'
import {profileUpdate} from '../../actions/users'

class ProfilePage extends React.Component{

  submit = data =>
    this.props.profileUpdate(data)
      .then(()=>this.props.history.push("/mybooks"))

  render(){
    return (
      <Container text>
        <div>
          <br></br>
          <h1>Your profile</h1>
          <br></br>
          <ProfileForm submit={this.submit} />
        </div>
      </Container>
    )
  }
}
ProfilePage.propTypes={
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  profileUpdate: PropTypes.func.isRequired 
  // getUserProfile: PropTypes.func.isRequired
}

export default connect(null, {profileUpdate})(ProfilePage)
