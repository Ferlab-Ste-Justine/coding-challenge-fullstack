import React from 'react';
import { connect } from 'react-redux';
import { Input, Container, Card, Icon, Grid, Divider } from 'semantic-ui-react';
import { updateMessage } from '../actions/messages';

const Messages = ({ 
  messages, 
  loggedInUser, 
  isAuthenticated, 
  updateMessage 
}) =>  {
  return (
    <Container>  
      <Grid stackable columns={3}>
        {
          messages.map(({ author, text }, i) => {
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
                                    
                  <Card.Description style={{ whiteSpace: 'pre-wrap', color: 'rgba(0,0,0,1)' }}>
                    {
                      isAuthenticated && author === loggedInUser ?
                      <div>
                        <Input placeholder="Update your message" onChange={updateMessage} />
                        <Divider />
                      </div>
                      : null
                    }

                    {text}
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
  const loggedInUser = user.username;
  const isAuthenticated = user.authenticated;
  let messagesArray = Object.keys(messages).map(author => ({ author, text: messages[author] }));

  // If the user is authenticated, sort them to the top of the card list.
  if (user.authenticated) {
    messagesArray = messagesArray.sort((a) => {
      if (a.author === loggedInUser) return -1;
      return 1;
    });
  }

  return {
    loggedInUser,
    isAuthenticated,
    messages: messagesArray
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
