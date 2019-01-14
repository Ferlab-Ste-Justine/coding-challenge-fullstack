import * as React from 'react';
import {Modal,Button} from 'react-bootstrap';



const EditModal=({show,editedPost,handleChange,handleClose,update})=>{

        return(


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea  
                className='edit-post__area'
                defaultValue={editedPost.content}
                onChange={handleChange}
                />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={update}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>


        );
    
}

export default EditModal