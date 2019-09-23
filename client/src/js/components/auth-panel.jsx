import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Form, Grid, Message, Dimmer, Loader, Container, Segment } from 'semantic-ui-react';
import { logIn, signUp, resetUser } from '../actions/user';

class AuthPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      interval: null,
      isLoading: false
    }
  }

  // Gotta clean up after ourselves when we use timers
  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
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
    this.setState({ isLoading: true });
    try {
      const { username, password } = this.state;
      await this.props.logIn(username, password);
      this.setState({ isLoading: false });

    } catch (err) {
      console.error(err);
      this.handleError(err.message);
    }
  }
  
  async signUp(evt) {
    evt.preventDefault();
    this.setState({ isLoading: true });
    try {
      const { username, password } = this.state;
      await this.props.signUp(username, password);
      this.setState({ isLoading: false });
      
    } catch (err) {
      console.error(err);
      this.handleError(err.message);
    }
  }

  handleError(errorMessage) {
    this.setState({ isLoading: false });

    const delay = setTimeout(() => {
      this.setState({ errorMessage: '', interval: null });
    }, 5000);

    this.setState({ errorMessage, interval: delay });
  }

  render() {
    const { isAuthenticated, logOut } = this.props;
    const { username, password, errorMessage, isLoading } = this.state;

    if (isLoading) {
      return (
        <Dimmer inverted active>
          <Container>
            <Loader inverted active>      
              {'Logging in...'}         
            </Loader>
          </Container>
        </Dimmer>
      );
    }

    if (isAuthenticated) {
      return (
        <Button onClick={logOut}>{'Log Out'}</Button>
      );
    }

    return (
      <Segment>
        <Form>
          <Form.Field>
            <Input 
              onChange={this.updateUsername.bind(this)} 
              placeholder="username" 
              type="text" 
              value={username}
            />
          </Form.Field>
          
          <Form.Field>
            <Input 
              onChange={this.updatePassword.bind(this)} 
              placeholder="password" 
              type="password" 
              value={password}
            />
          </Form.Field>  

          {
            errorMessage ? 
            <Message negative>
              <Message.Header>{'An error occured'}</Message.Header>
              <p>{errorMessage}</p>
            </Message>
            : null
          }            
          
          <Button onClick={this.login.bind(this)}>{'Log In'}</Button>
          <Button onClick={this.signUp.bind(this)}>{'Sign Up'}</Button>
        </Form>
      </Segment>
    )
  }
}

// TODO: Do this better
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.authenticated
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
