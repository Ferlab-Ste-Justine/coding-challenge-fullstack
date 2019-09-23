import React from 'react';
import { connect } from 'react-redux';
import { Input, Container, Card, Icon, Grid } from 'semantic-ui-react';
import { updateMessage } from '../actions/messages';

const Messages = ({ 
  messages, 
  loggedInUser, 
  isAuthenticated, 
  updateMessage 
}) =>  {
  return (
    <Container>  
      <Grid centered stackable columns={3}>
        {
          Object.keys(messages).map((author, i) => {
            return (
              <Grid.Column key={i}>
              <Card fluid color={ author === loggedInUser ? 'green' : 'blue'}>
                <Card.Content>
                  <Card.Header>
                    { 
                      author === loggedInUser ? 
                      <Icon name='star' color="green"/> 
                      : null 
                    }
                    {`${author}`}
                  </Card.Header>
                  <Card.Meta>

                  </Card.Meta>
                  <Card.Description style={{ whiteSpace: 'pre-wrap' }}>
                    {
                      isAuthenticated && author === loggedInUser ?
                      <Container><Input placeholder="thoughts" onChange={updateMessage} /></Container>
                      : null
                    }
                    {messages[author]}
                  </Card.Description>
                </Card.Content>
              </Card>
              </Grid.Column>
            );
          })
        }
      </Grid>
    </Container>
  )
}


const mapStateToProps = (state) => {
  const { user, messages } = state;
  return {
    loggedInUser: user.username,
    isAuthenticated: user.authenticated,
    messages: messages
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessage: async (evt) => {
      dispatch(updateMessage(evt.target.value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
