import * as React from 'react';
import { Formik, Field,ErrorMessage } from 'formik';
import {Container ,Form,Button} from 'react-bootstrap';
import * as Yup from 'yup';
import {Link,Redirect} from 'react-router-dom';
import Axios from 'axios';

class Login extends React.Component{
    constructor(){
        super ();
        this.state={
            username:"",
            password:"",
            redirect:false
        }   
    
    }

    validateSchema=()=>{
        return  Yup.object().shape({
            username:Yup
                    .string()
                    .required('required'),
            password:Yup 
                    .string()
                    .min(6,"password needs to be at least 6 charachters")
                    .required('required')   
        });
    }

    handleSubmit=({errors,values})=>{
        if(Object.keys(errors).length>0){
            alert("please fix the form issues");
        }else{
            Axios
                .post("/admin/login",{
                    user:{
                        username:values.username,
                        password:values.password
                    }
                })
                .then(response=>{
                    const res= response.data;
                    if(response.status===200){
                        // request was succesful
                        localStorage.setItem("username",res.username);
                        localStorage.setItem("email",res.userEmail);
                        localStorage.setItem("token",res.token);
                        this.setState({redirect:true});
                    }
                })
                .catch(error=>{
                    console.log("an error occured");
                })
        }
    }

    render(){
        return (
            <React.Fragment>
            {!this.state.redirect?
            
            <div>
                 <Formik
                initialValues={this.state}
                validationSchema={this.validateSchema()}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                    }, 1000);
                }}
                render={values => (
                    <Container>
                    <div className="form-register__holder">
                    <div className="title"><h2>Login</h2></div>
                    <Form onSubmit={(e)=>{
                        e.preventDefault();
                        this.handleSubmit(values);
                    }}>
                    <Form.Group>
                      <Form.Label>username</Form.Label>
                      <Field
                        name="username"
                        render={({field}) => (
                        <Form.Control {...field} type="text" placeholder="username" />
                    )}
                    />
                      <ErrorMessage name="username" >
                      { (message)=>{
                           return <div style={{color:"red"}}>{message}</div>
                      }}
                     
                      </ErrorMessage>

                    </Form.Group>
                    <Form.Group >
                      <Form.Label>password</Form.Label>
                      <Field name="password" >
                        {({field})=>{
                            return <Form.Control {...field} type="password" placeholder="password" />
                        }}
                      </Field>
                      <ErrorMessage name="password" >
                      { (message)=>{
                           return <div style={{color:"red"}}>{message}</div>
                      }}
                    </ErrorMessage> 
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                    <Link to={"/register"} style={{marginLeft:"10px"}}>new member?</Link>
                  </Form>
                  </div>
                  </Container>
                )}
                />
            </div>
            :
            <Redirect to={"/"} />
            }
            </React.Fragment>
        );
       
    }


}


export default Login;