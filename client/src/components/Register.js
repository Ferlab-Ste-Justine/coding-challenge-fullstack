import * as React from 'react';
import { Formik, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Form,Button,Container} from 'react-bootstrap';
import './styles/Register.css';
import * as axios from 'axios';
import {Redirect} from 'react-router-dom';

class Register extends React.Component{
    constructor(){
        super();
        this.state={
            username:"",
            email:"",
            password:"",
            passConfirmation:"",
            redirect:false
        }

    }

    validate=()=>{
        return Yup.object().shape({
            username:Yup
                    .string()
                    .required('required'),
            email :Yup
                    .string()
                    .email("enter a valide email")
                    .required("required"),
            password:Yup 
                    .string()
                    .min(6,"password needs to be at least 6 charachters")
                    .required('required'),
            passConfirmation:Yup
                            .string()
                            .min(6)
                            .required("required")
        });
    }
    
    handleSubmit=({errors,values})=>{
       
        if(Object.keys(errors).length>0){
            alert("please fix the errors in the form");
        }else{
            axios
            .post("admin/signup",{
                "user":{
                    "username":values.username,
                    "email":values.email,
                    "password":values.password,
                    "passwordConfirmation":values.passConfirmation
                }
            })
            .then(response=>{
                const res=response.data;
                if(response.status===201){
                    localStorage.setItem("username",res.username);
                    localStorage.setItem("email",res.userEmail);
                    localStorage.setItem("token",res.token);
                    this.setState({redirect:true});
                }else{
                    alert(res.errors);
                }
            })
            .catch(error=>{
                alert("an error ocured ");
            })
        }
    

    }

    render(){
        return (
            <React.Fragment>
            {!this.state.redirect?
            <div id='register-form'>
                
             <Formik
                initialValues={this.state}
                validationSchema={this.validate()}
                onSubmit={(values, actions) => {
                    
                  this.handleSubmit(values);
                }}
                render={(values) => (
                    <Container>
                    <div className="form-register__holder">
                    <div className="title"><h2>Register</h2></div>
                    <Form onSubmit={(e)=>{
                        e.preventDefault()
                        this.handleSubmit(values);
                        }}>
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
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
                      <Form.Label>Email address</Form.Label>
                      <Field
                        name="email"
                        render={({field}) => (
                        <Form.Control {...field} type="email" placeholder="email" />
                    )}
                    />
                      <ErrorMessage name="email" >
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
                    <Form.Group >
                      <Form.Label>password confirmation</Form.Label>
                      <Field name="passConfirmation" >
                        {({field})=>{
                            return <Form.Control {...field} type="password" placeholder="confirm password" />
                        }}
                      </Field>
                      <ErrorMessage name="passConfirmation" >
                      { (message)=>{
                           return <div style={{color:"red"}}>{message}</div>
                      }}
                    </ErrorMessage> 
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Register
                    </Button>
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


export default Register;