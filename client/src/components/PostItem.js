import * as React from 'react';
import {Button} from 'react-bootstrap';

const PostItem=({id,username,content,editMessage})=>{
   return  <li className="post-item">
                    <div className="post-item__sender">
                        {username}
                    </div>
                    <div className="post-item__container">
                        <div className="post-item__content">
                            {content}
                        </div> 
                    <div className="post-item__options">
                        {localStorage.username===username && id?
                            <Button 
                            className="edit-post__btn"
                            variant="secondary"
                            onClick={(e)=>{editMessage(id,content)}}>edit</Button>
                        :
                        null
                        }
                        </div>
                    </div>
            </li> 
}

export default PostItem;