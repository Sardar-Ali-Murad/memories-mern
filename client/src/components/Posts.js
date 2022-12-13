import React from 'react'
import { useAppContext } from '../context/appContext'
import "./Posts.css"
import { useNavigate } from 'react-router-dom'
import Alert from "./Alert.js"
import PostForm from './PostForm'
import AllPosts from './AllPosts'

import img from "../assets/images/meme.png"


const Posts = () => {
  let { user, logoutUser,uploadImage,
    tag,
    title,
    message,
    searchTag,
    searchTitle,
    changeFunction,
    clearuploads,
    submitpost,
    showAlert,
    isLoading
  } = useAppContext()


  
  

  function logout() {
    logoutUser()
  }
  
  
 
  return (
    <div className='post__Main'>


      <div className='post__Header'>
        <h1 className='h__Cormorant memories__h1'>
          <img src={img} style={{height:"70px",width:"70px",borderRadius:"50%",marginTop:"26px"}}/>
        </h1>

        <div className='header__Last__Overlay'>

          <div className='header__Circle'>
            <h1>  {user.name.charAt(0)}</h1>
          </div>

          <button className='btn' onClick={logout}>Logout</button>


        </div>
      </div>


      <div className='post__Form__Main' >
        <div className='post__Wrapper'>
          <PostForm/>
          <AllPosts/>
        </div>




      </div>
    </div>
  )
}

export default Posts
