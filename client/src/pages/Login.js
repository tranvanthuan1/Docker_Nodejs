import React,{useState,useEffect,useContext} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment,Icon } from 'semantic-ui-react' 
import axios from 'axios'
import { useAlert } from 'react-alert'
import {Redirect, NavLink} from 'react-router-dom';

import {AuthContext}  from "../context/auth"
import userEvent from '@testing-library/user-event'
//import '../assets/images'


export default function Login(props) {
    const context = useContext(AuthContext)
    const [values,setValues]=useState({
        email:'',
        password:''
        // password:''
    })

    const [posts,setPosts]=useState([])
    const alert = useAlert()
    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/api/v1/users')
        .then(res=>{
            // console.log(res)
            setPosts(res.data)
            // console.log(posts)
           
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const [errors]=useState({});
   


    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }

    const onSubmit=(e)=>{
        e.preventDefault();

        axios.post("http://127.0.0.1:5000/api/v1/login",values).
        then((res)=>{ console.log(values);
            if(res.data.status==="User exists"){
                context.login({"name":res.data.username})
                props.history.push('/')
                alert.show("Logged in successfully")}
            else{
                alert.show("Unable to login check your email_id and password")
            }}
            )
    }

       


   
    

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
            
        <Grid.Column style={{ maxWidth: 450 }}>       
        <Header as='h2' color='teal' textAlign='center'>
        <Icon loading name='react' size='big'/> Log-in to your account
          </Header>
          
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate>
            <Segment stacked>
                
                  <Form.Input
                  fluid
                  icon='user'
                  severity="Description"
                  iconPosition='left'
                  label='Email'
                  placeholder="Email.."
                  name="email"
                  value={values.email}
                  onChange={onChange} required='true'/>
                  <Form.Input
                   fluid
                   icon='lock'
                   iconPosition='left'
                  label='Password'
                  placeholder="Password.." 
                  name="password"
                  severity="Description"
                  value={values.password}
                  onChange={onChange} required='true'/>

                  <Button type="submit" primary color='teal' fluid size='large' severity="contained">
                      Login
                  </Button>
                  </Segment>
                 </Form>
                 <Message>
                   New to use? <NavLink to='/register'>Register</NavLink>
                  </Message>

                  <Header  >
                      
                  <Segment>
                  Liên hệ
                  <Icon.Group size='large'>
                    <Icon loading name=' ' />
                    </Icon.Group>

                     <Icon.Group size='large'>
                    <Icon loading name='facebook' />
                    </Icon.Group>
                    Facebook  
                    <Icon.Group size='large'>
                    <Icon loading name=' ' />
                    </Icon.Group>

                        <Icon.Group size='large'>
                    <Icon loading name='google' />
                    </Icon.Group>
                        Google
                       

                </Segment>
                </Header>
           


                  {Object.keys(errors).length>0 &&(
                    <div className="ui error message">
                     <ul className="list">
                        {Object.values(errors).map(value=>(
                            <li key={value}>{value}</li>
                        ))}
                     </ul>

                 </div>
                  )}

                 
        </div>
        </Grid.Column>
  </Grid>
    )
}
