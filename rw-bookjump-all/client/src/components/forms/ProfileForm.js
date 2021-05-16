import React from "react";
// import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import api from '../../api'

class ProfileForm extends React.Component {
  state = {
    profile: {},
    newprofile: {
      city: "",
      state: ""
    },
    loading: false,
    errors: {}
  };
  componentDidMount=()=>{
      api.user.getUserProfile()
        .then(user=>this.setState({profile: user, newprofile: {city:user.city, state: user.state}}))
  }

  onChange = e =>
    this.setState({
      newprofile: { ...this.state.newprofile, [e.target.name]: e.target.value }
    });

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    console.log(this.state.newprofile)
    api.user.profileUpdate(this.state.newprofile)
      .then(user => this.setState({profile: user, loading: false}))
      .catch(err =>{
        console.log(err.response.data.errors)
        this.setState({ errors: err.response.data.errors, loading: false })
      }
      );
  };

  render() {
    const { profile, newprofile, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field>
          <label htmlFor="username">Username</label>
          <input
            placeholder={profile.username}
            readOnly
            // onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="email">Email</label>
          <input
            placeholder={profile.email}
            readOnly
            // onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={newprofile.city}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field >
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={newprofile.state}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button primary>Save your profile</Button>
      </Form>
    );
  }
}

// ProfileForm.propTypes = {
//   submit: PropTypes.func.isRequired
// };

export default ProfileForm;
