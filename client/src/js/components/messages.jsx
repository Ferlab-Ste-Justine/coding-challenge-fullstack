import React from 'react';
import { connect } from 'react-redux';
import { Input, Container, Card } from 'semantic-ui-react';
import { updateMessage } from '../actions/messages';

const Messages = ({ 
  messages, 
  loggedInUser, 
  isAuthenticated, 
  updateMessage 
}) =>  {
  return (
    <Container>  
      <Card.Group>
        {
          Object.keys(messages).map((author, i) => {
            return (
              <Card color='blue' key={i}>
                <Card.Content>
                  <Card.Header>{`${author} ${author === loggedInUser ? ' | You' : ''}`}</Card.Header>
                  <Card.Meta>
                    {
                      isAuthenticated && author === loggedInUser ?
                      <Input placeholder="thoughts" onChange={updateMessage} /> 
                      : null
                    }
                  </Card.Meta>
                  <Card.Description>
                    {messages[author]}
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          })
        }
      </Card.Group>
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
