import React,{useContext,useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment ,Icon} from 'semantic-ui-react' 
import axios from 'axios'
import { useAlert } from 'react-alert'
import {Redirect, NavLink} from 'react-router-dom';

import {AuthContext} from '../context/auth'

export default function Register(props) {
    const context = useContext(AuthContext)
    const { error, loading} = props;
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:''
    })

    const [errors,setErrors]=useState({});
   
    const alert = useAlert()

    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(values);
        axios.post('http://127.0.0.1:5000/api/v1/register',values)
        .then(resp=>{
            if(resp.data.msg==="User successfully created"){
                context.login(values);
                alert.show(<div style={{ color: 'green' }}>"Successfully Registered"</div>)
                props.history.push('/') 
            }else{
                alert.show(<div style={{ color: 'red' }}>"Enter valid details"</div>)
            }
                     
        })
        .catch(err=>{
            alert.show(<div style={{ color: 'red' }}>"Enter a Valid Email, username, password "</div>)    
        })
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        {error && errors.map(err =>(<Message negative>{err}</Message>) )}
          <Header as='h2' color='teal' textAlign='center'>
            <Icon loading name='react' size='big'/> Sign up to your account
          </Header>

        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate>
            <Segment stacked>
               
                <Form.Input
                   fluid
                   icon='user' 
                   iconPosition='left'
                  label='Username'
                  placeholder="Name.."
                  name="name"
                  value={values.username}
                  onChange={onChange}  required />
                  <Form.Input
                //   type='email'
                fluid
                name ='email'
                icon='lock'
                iconPosition='left'
                  label='Email'
                  placeholder="Email.."
                  name="email"
                  value={values.email}
                  onChange={onChange}  required/>
                  <Form.Input
                //   type='password'
                    fluid
                  //  name ='password1'
                    icon='lock'
                    iconPosition='left'
                  label='Password'
                  placeholder="Password.."
                  name="password"
                  value={values.password1}
                  onChange={onChange} required/>

                

                  <Button type="submit" primary color='teal' fluid size='large' disabled={loading} loading={loading}>
                      Register
                  </Button>
                  </Segment>
             </Form>
                 <Message>
                    Already have a account? <NavLink to='/login'>Log in</NavLink>
       
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
