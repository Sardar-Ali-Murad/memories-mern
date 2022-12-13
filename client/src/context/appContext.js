import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPLOAD_IMAGE,
  HANDLE_CHANGE,
  CLEAR_UPLOADS,
  SUBMIT_POST_BEGIN,
  SUBMIT_POST_ERROR,
  SUBMIT_POST_SUCCESS,
  GET_POST_ERROR,
  GET_POST_SUCCESS,
  GET_Post_BEGIN,
  CHANGE_PAGE
 
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')


const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  image:"",
  tag:"",
  title:"",
  message:"",
  searchTag:"",
  searchTitle:'',
  totalPages:1,
  totalMemories:0,
  posts:[],
  page:1
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  

  function logoutUser(){
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalStorage()
  }



  const uploadImage=async (event)=>{
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image',imageFile)
    try {
    //  const {data:{image:{src}}} = await axios.post("/api/v1/post/upload"

     const {data:{image:{src}}} = await authFetch.post("/post/upload"
    
     ,formData,{
      headers:{
       'Content-Type':'multipart/form-data'
      }
     }
     )
     dispatch({type:UPLOAD_IMAGE,
      payload:{
        image:src
      }
    })

    console.log(src)
    } catch (error) {
      
     console.log(error.response.data.msg);
    }
  }

  function changeFunction(e){
    // console.log(e.target.name,e.target.value)
    dispatch({type:HANDLE_CHANGE,
    payload:{
      name:e.target.name,
      value:e.target.value
    }})
  }


  function clearuploads(){
    dispatch({type:CLEAR_UPLOADS})
  }



 const submitpost=async (req,res)=>{
    dispatch({type:SUBMIT_POST_BEGIN})

    try {
      let {tag,message,image,title}=state
      let data=await axios.post("/api/v1/post",
      {
        tag,message,image,title
      },
      {
        headers:{
          Authorization:`Bearer ${state.token}`
        }
      }
      )

       dispatch({type:SUBMIT_POST_SUCCESS})
       AllPosts()
       clearuploads()

       
      } catch (error) {
        
        dispatch({type:SUBMIT_POST_ERROR,payload:{
          msg:error.response.data.msg
        }})
    }
    clearAlert()
  }

  const AllPosts=async ()=>{
    dispatch({type:GET_Post_BEGIN})

    try {
      let {data}=await axios.get(`/api/v1/post?page=${state.page}&searchTag=${state.searchTag}&searchTitle=${state.searchTitle}`,{
        headers:{
          Authorization:`Bearer ${state.token}`
        }
      }
      )

      // console.log(data)
      dispatch({type:GET_POST_SUCCESS,payload:{posts:data.posts,totalMemories:data.totalMemories,totalPages:data.totalPages}})
    } catch (error) {
      // dispatch({type:GET_POST_ERROR,payload:{msg:error.response.data.msg}})
      logoutUser()
    }
  }

  function changepage(page){
      dispatch({type:CHANGE_PAGE,payload:{page:page}})
  }


  const deletepost=async (id)=>{
    // console.log(id)

    try {
       let data=await axios.delete(`/api/v1/post/${id}`,{headers:{Authorization:`Bearer ${state.token}`}}) 
       AllPosts()     
      } catch (error) {
      logoutUser()
    }
  }
  
 

  const editpost=async (id)=>{
  
    try {
      await authFetch.patch(`/post/${id}`)
      AllPosts()
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }


  

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        uploadImage,
        changeFunction,
        clearuploads,
        submitpost,
        AllPosts,
        changepage,
        deletepost,
        editpost
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
