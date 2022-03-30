import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios'
// import DataFetching from './DataFetching'
import { Grid,Card,Feed,Container,Header,Divider, Image, Icon } from 'semantic-ui-react'
import './index.css'

import PostCard from '../component/PostCard'
import PostForm from '../component/PostForm'
import {AuthContext} from '../context/auth'
import Userdetails from '../component/Userdetails';


export default function Home() {
    const [posts,setPosts]=useState([])
    const {user}=useContext(AuthContext)
    const [blogs,setblogs]=useState([])

    // console.log(user.name)
    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/api/v1/users')
        .then(res=>{
            // console.log(res)
            setPosts(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/api/v1/users/allblogs')
        .then(res=>{
            // console.log()
            setblogs(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])


    return (

        
            <Grid >
              <Grid.Column width={4}>
               
              {user && (
                          <Grid.Column>
                              <Userdetails user={user.name}/>
                          </Grid.Column>
                      )}

               {!user &&
                   <Grid.Column>
                        <Divider section />
                    <Header> 
                        <Icon name='address card outline'></Icon>
                   <Card    
                
                        fluid
                        header='Team'  
                         
                        description='Trần Văn Thuần , Sữ Hoài Giang , Trần Văn Quy'                       
                        color="grey"
                        
                    />  
                    </Header>
                     
                  
                     <Divider section />      
          </Grid.Column>  
               }                 
              

              </Grid.Column>
              <Grid.Column width={5}>
               
                          {user && (
                          <Grid.Column>
                              <PostForm/>                
                          </Grid.Column>
                      )}

                 {!user &&
                    <Grid.Column>
                         <Divider section />
                         <Header> 
                        <Icon name='book'></Icon>
                                   <Card
                                        raised = "True"
                                        color="blue"
                                        fluid
                                        header='Môn học'   
                                        description='Lập Trình Web'
                                    /> 
                                     <Divider section />
                                     </Header>
                                     <Icon name='mail outline' size='big'></Icon>
                                     <Card className='test'
                                        raised = "True"
                                        color="blue"
                                        fluid
                                        header='Trường Đại Học Kiến Trúc Đà Nẵng'   
                                   // image='https://upload.wikimedia.org/wikipedia/commons/6/64/Logo_dhktdn.png' 
                                    //src='https://upload.wikimedia.org/wikipedia/commons/6/64/Logo_dhktdn.png'
                                       // description=' Journey is designed to enable you to write anything about your life, experiences and private memories. Instead of viewing it as a boring writing session, it actually feels more like you are confiding in a friend who definitely won’t blab. Also, with the Journey digital diary app, you can write on the go. Simply put down the highlights of your day or any reflections on your device.'
                                    /> 
                        
                                    
                                     <Divider section />
                                     
                          </Grid.Column> 
                 } 
                         


              </Grid.Column>
              <Grid.Column width={5}>
              <Grid.Row>

              <Divider section />


              <Icon name='user circle outline' size='big'></Icon>
                       <Card>
                      
                            <Card.Content>
                                
                            <Card.Header>Users</Card.Header>
                            </Card.Content>
                            <Card.Content>
                            
                                     {  posts && posts.map(post=>(
                                            <Feed.Summary key={post.user_id} style={{marginBottom:20}} >
                                                <PostCard post={post}/>
                                            </Feed.Summary>
                                        ))
                                        }
                                   
                                   
                            </Card.Content>
                        </Card>


                  </Grid.Row>
                  <Divider section />
              </Grid.Column>
              
            </Grid>
          )































        // <div>
        //    {/* <DataFetching/> */}
        //    <Grid columns={3}>
        //           <Grid.Row>
        //             <h1>Recent Posts</h1>
        //           </Grid.Row>
        //           <Grid.Row>
        //               {user && (
        //                   <Grid.Column>
        //                       <PostForm/>
        //                   </Grid.Column>
        //               )}
        //             { 
        //                 posts && posts.map(post=>(
        //                     <Grid.Column key={post.user_id} style={{marginBottom:20}} >
        //                         <PostCard post={post}/>
        //                     </Grid.Column>
        //                 ))
        //             }
        //           </Grid.Row>
        //     </Grid>
           
        // </div>
    
}
