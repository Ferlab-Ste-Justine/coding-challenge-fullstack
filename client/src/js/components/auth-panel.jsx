import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Form, Grid } from 'semantic-ui-react';
import { logIn, signUp, resetUser } from '../actions/user';

class AuthPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'mika',
      password: 'foobar'
    }
  }

  updatePassword(evt) {
    this.setState({ password: evt.target.value });
  }

  updateUsername(evt) {
    this.setState({ username: evt.target.value });
  }

  async login(evt) {
    evt.preventDefault();
    try {
      const { username, password } = this.state;
      await this.props.logIn(username, password);
    }

    catch (err) {
      console.error(err);
    }
  }
  
  async signUp(evt) {
    evt.preventDefault();
    try {
      const { username, password } = this.state;
      await this.props.signUp(username, password);
    }

    catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <Grid.Column width={12} >    
        {
          this.props.user.authenticated ? 
          <Button onClick={this.props.logOut}>{'Log Out'}</Button> :
          <Form>
            <Form.Field>
              <Input 
                onChange={this.updateUsername.bind(this)} 
                placeholder="username" 
                type="text" 
                value={this.state.username}
              />
            </Form.Field>
            
            <Form.Field>
              <Input 
                onChange={this.updatePassword.bind(this)} 
                placeholder="password" 
                type="password" 
                value={this.state.password}
              />
            </Form.Field>              
            
            <Button onClick={this.login.bind(this)}>{'Log In'}</Button>
            <Button onClick={this.signUp.bind(this)}>{'Sign Up'}</Button>
          </Form>
        }
      </Grid.Column>
    )
  }
}

// TODO: Do this better
const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    logIn: async (username, password) => {
      return await dispatch(logIn(username, password));
    },

    signUp: async (username, password) => {
      return await dispatch(signUp(username, password));
    },

    logOut: () => {
      return dispatch(resetUser());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPanel);
