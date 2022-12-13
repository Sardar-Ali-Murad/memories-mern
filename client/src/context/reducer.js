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
  SUBMIT_POST_SUCCESS,
  SUBMIT_POST_ERROR,
  GET_POST_ERROR,
  GET_POST_SUCCESS,
  GET_Post_BEGIN,
  CHANGE_PAGE

} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if(action.type===LOGOUT_USER){
    return{
      ...initialState,
      token:null,
      user:null
    }
  }

  if(action.type===UPLOAD_IMAGE){
    return{
      ...state,
      image:action.payload.image
    }
  }

  if(action.type===HANDLE_CHANGE){
    return{
      ...state,
      [action.payload.name]:action.payload.value
    }
  }

  if(action.type===CLEAR_UPLOADS){
    return{
      ...state,
      image:"",
      tag:"",
      title:"",
      message:"",
    }
  }


  if(action.type===SUBMIT_POST_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }
 
  if(action.type===SUBMIT_POST_SUCCESS){
    return{
      ...state,
      showAlert:true,
      alertText:"Post Submitted Successfully",
      alertType:"success",
      isLoading:false
    }
  }


  if(action.type===SUBMIT_POST_ERROR){
    return{
      ...state,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:"danger",
      isLoading:false
    }
  }
  
  if(action.type===GET_Post_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }
  
  if(action.type===GET_POST_SUCCESS){
    return{
      ...state,
      isLoading:false,
      posts:action.payload.posts,
      totalMemories:action.payload.totalMemories,
      totalPages:action.payload.totalPages
    }
  }

  if(action.type===CHANGE_PAGE){
    return{
      ...state,
      page:action.payload.page
    }
  }


  throw new Error(`no such action : ${action.type}`)
}

export default reducer
