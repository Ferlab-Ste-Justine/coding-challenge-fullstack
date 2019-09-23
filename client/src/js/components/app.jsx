import React from 'react';
import { connect } from 'react-redux';
import { connectUser } from '../actions/user';
import { Container, Grid, Menu, Dimmer, Loader, Divider } from 'semantic-ui-react';
import AuthPanel from './auth-panel';
import Messages from './messages';

class App extends React.Component {
  async componentDidMount() {
    await this.props.connectToWebsocketServer();
  }

  render() {
    if (!this.props.isConnected) {
      return (
        <Dimmer inverted active>
          <Container>
            <Loader inverted active>      
              {'Connecting ...'}         
            </Loader>
          </Container>
        </Dimmer>
      );
    }

    return (
      <>
        <Container>
          <Menu secondary>
            <Menu.Item>
              <h1>{'The Wall'}</h1>
            </Menu.Item>
          </Menu>
          <AuthPanel />
          <Divider />
        </Container>

        <Messages />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isConnected: state.user.connected
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    connectToWebsocketServer: async () => {
      await dispatch(connectUser());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
