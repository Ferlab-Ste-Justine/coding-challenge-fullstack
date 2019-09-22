import React from 'react';
import { connect } from 'react-redux';
import { connectUser } from '../actions/user';
import { Container, Grid } from 'semantic-ui-react';
import AuthPanel from './auth-panel';
import Messages from './messages';

class App extends React.Component {
  async componentDidMount() {
    await this.props.connectToWebsocketServer();
  }

  messageChange(evt) {
    this.props.updateMessage(evt.target.value);
  }

  render() {
    return (
      <>
        <Container>
          <Grid stackable>
            <Grid.Column width={12}>    
              <h1>{'The Wall'}</h1>
            </Grid.Column>
            <AuthPanel />
          </Grid>
        </Container>

        <Messages />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    connectToWebsocketServer: async () => {
      await dispatch(connectUser());
    }
  }
};

export default connect(null, mapDispatchToProps)(App);
