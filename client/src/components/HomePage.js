import * as React from 'react';
import {Link} from 'react-router-dom';
import './styles/homepage.css';
import {Button,Container} from 'react-bootstrap';
import websocket from 'socket.io-client';
import * as axios from 'axios';
import PostItem from './PostItem';
import EditModal from './Modals/EditModal';

class HomePage extends React.Component{


    constructor(){
        super();
        this.state={
            socket:{},
            messageContent:"",
            posts:[],
            typings:[],
            isEditing:false,
            editedPost:{
                id:-1,
                content:''
            }
        }
    }

    handlChnage=(e)=>{
        this.setState({messageContent:e.target.value});
        // broadcasting the message the  current user is typing 
        this.state.socket.emit("typing",{
            username:localStorage.username,
            message:e.target.value
        })
    }

    // methode that logs a user out and clears the localstorage 
    logout=()=>{
        // clearing all the data in the localstorage
        localStorage.clear();
    }
    componentDidMount(){
       const socket = websocket("http://localhost:8080");
       this.setState({socket})
        socket.on("create",(data)=>{
        if(data.action==="create"){
            this.displayPost(data.post);
        }
    });
    socket.on("typing",data=>{
        const typings = this.state.typings;
        const index = typings.findIndex(user=>user.username===data.username);
        if(index>=0){
            if(!(data.message==="")){
                typings[index]=data;
            }else{
                // the user removed what they were typing 
                // so we remove that user from the list
                typings.splice(index,1);
            }
        }else{
            typings.push(data);
        }
        this.setState({typings});
       
    });
       this.getPosts();
    }

    // methode that retrieves all the post 
    getPosts=()=>{
       axios
        .get("/post/getAll")
        .then(response=>{
            const posts = response.data.posts;
            this.setState({
                posts
            })
        })
        .catch(error=>{
            alert(error.message);
        })
    }

    displayPost=(post)=>{
        const posts = this.state.posts;
        posts.push(post);
        // we need to remove the message that was being typed 
        // from the list since the user has finished typing 
        // and sent the mesage
        const index = this.state.typings.findIndex(msg=>msg.username===post.username);
        const typings = this.state.typings;
        typings.splice(index,1);
        this.setState({typings},()=>{
            this.setState({
                posts
            })
        })
       
    }

    // methode that creates a post 
    addPost=(post)=>{
        const body = {
            content:this.state.messageContent
        }
         let instance=axios.create({
            headers: {
              post: {     
                token:localStorage.getItem("token")
              }
            }
          });

        instance.post("/post/create",body)
       .then(response=>{
         console.log("response is ",response);
       })
       .catch(error=>{
           alert(error.message);
       })
    }

    // displayed the edit post modal 
    openModal=(messsageId,content)=>{
       this.setState({
            editedPost:{
                id:messsageId,
                content
            },
            isEditing:true
        });
    }

    changePostContent=(e)=>{
        this.setState({
            editedPost:{
            ...this.state.editedPost,
            content:e.target.value
        }
    });
     
    }

    // updates the content of a post 
    UpdatePost=(e)=>{
        e.preventDefault();
        let instance=axios.create({
            headers: {
              put: {     
                token:localStorage.getItem("token")
              }
            }
          });

        instance
        .put(`/post/edit/${this.state.editedPost.id}`,{
            content:this.state.editedPost.content
        })
        .then(response=>{
           
            //updating the edited message on the screen 
            const posts = this.state.posts;
            const editedPost = posts.find(post=>post.id===this.state.editedPost.id);
            editedPost.content=this.state.editedPost.content;
            this.setState({
                posts,
                isEditing:false,
                editedPost:{}
            });
            console.log(response);
        })  
        .catch(error=>{
            alert("couldn't edit post");
        })  
    }
    // closes the edit modal 
    handleClose=()=>{
        this.setState({isEditing:false});
    }
    render(){
        return (
            <div id="homepage-wrapper">
            <Container>
            <header className="top-bar__menu">
                    
                    <div className="homepage-wall">
                        <h3>The Wall</h3>
                    </div>
                    <div className="login-form__container">
                    {!localStorage.username?
                        <Link to={"/login"}>
                        <Button 
                            onClick={this.handleClick} 
                            variant="secondary"
                            className="homepage-button__slbtn"
                            >
                            Login/SignUp
                            </Button>
                        </Link>
                        :
                        <Link to={"/"} onClick={this.logout}>
                            <Button 
                                onClick={this.handleClick} 
                                variant="secondary"
                                className="homepage-button__slbtn"
                                >
                                Logout
                                </Button>
                        </Link>
                    }
                        
                    </div>
                   
                </header>

                <div className="posts-container__wrapper">
                <ul className="post-list__item">

                    { this.state.posts.map((post,i)=>{
                        return<PostItem 
                                username={post.username} 
                                content={post.content}
                                id={post.id}
                                editMessage={this.openModal}
                                key={i}
                                 />
                    })}

                    {this.state.typings.length>0 && this.state.typings.map((t,i)=>{
                        return <PostItem 
                                username={t.username} 
                                content={t.message}
                                key={i}
                             />
                    })}



                </ul>
                </div>
                    
                {localStorage.username
                ?
                     <div className="chat-box__area">
                     <textarea
                     className="mesage-field__input"
                     value={this.state.messageContent}
                     placeholder="enter a message"
                     onChange={this.handlChnage}
                     draggable="false"
                     >
                     </textarea>
                 <div className="send-message__button"
                      onClick={this.addPost}
                 >  
                     send
                 </div>
                 </div>
                 :null 
                }
                {this.state.isEditing?
                    <EditModal 
                    editedPost={this.state.editedPost}
                    handleChange={this.changePostContent}
                    show={this.state.isEditing}
                    handleClose={this.handleClose}
                    update={this.UpdatePost}
                    />
                    :null 
                }
               
                </Container>
            </div>

        );
    }


}


export default HomePage;