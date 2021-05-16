import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {connect} from "react-redux"
import { Container, Menu, Button} from "semantic-ui-react";
import {logout} from "../../actions/users"


class TopNavigation extends React.Component {
  logout = ()=> this.props.logout()

  render(){
    const {user} = this.props
    return (
      <Menu fixed='top' size='large'>
        <Container>
          <Menu.Item as={Link} to='/' active>
            {user.username? `Welcome ${user.username}!` : 'Welcome!'}
          </Menu.Item>
          {user.email && <Menu.Item as={Link} to='/allbooks'>All Books</Menu.Item>}
          {user.email && <Menu.Item as={Link} to='/mybooks'>My Books</Menu.Item>}
          <Menu.Menu position='right'>
            {user.email && <Menu.Item className='item'>
              <Button as={Link} to='/profile'>Profile</Button>
            </Menu.Item>}
            {user.email && <Menu.Item className='item'>
              <Button as={Link} to='/' onClick={this.logout} >Log out</Button>
            </Menu.Item>}
            {!user.email && <Menu.Item className='item'>
              <Button as={Link} to='/login'>Log in</Button>
            </Menu.Item>}
            {!user.email && <Menu.Item>
              <Button as={Link} to='/signup' primary>Sign Up</Button>
            </Menu.Item>}
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}

TopNavigation.propTypes = {
  logout: PropTypes.func.isRequired
};

function mapStateToProps (state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {logout})(TopNavigation)
