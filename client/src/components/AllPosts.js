
import { useAppContext } from '../context/appContext'
import "./Posts.css"
import { useNavigate } from 'react-router-dom'
import Alert from "./Alert.js"
import PostForm from './PostForm'
import React from 'react'
import "./AllPosts.css"
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const AllPosts = () => {


    let { user,
        showAlert,
        isLoading,AllPosts,
        posts,
        totalMemories,
        totalPages,
        searchTag,
        searchTitle,
        page,
        deletepost,
        editpost
        
          } = useAppContext()

          function del(id){
             deletepost(id)
          }

          function editfun1(id){
            // console.log( id)
            editpost(id)
          }
          function editfun2(id){
            // console.log( id)
            editpost(id)
          }

      React.useEffect(()=>{
         AllPosts()
      },[searchTag,searchTitle,page])

  return (
    <div className="all__Post">
      {
       posts.length<1 ? <p>No Post To Show..</p> : posts.map((post)=>{
            return <div className='single__Post' >
                <img src={post.image} width="100%" height="30%"/>
                <div className='single__Post__Text'>

                     <p className='p__Sans' style={{fontSize:"10px"}}>{post.tag}</p>
                    <h1 className='p__Cormorant title' >{post.title}</h1>
                    <h1 className='h__Sans message'>{post.message}</h1>
                </div>

                    <div className='single__Post__Last__Section' style={{display:"flex",justifyContent:"space-around",
                marginTop:"10px"}}>
                      <DeleteIcon style={{cursor:"pointer"}} onClick={()=>del(post._id)}/>
                      {
                        post.like==true?   <ThumbUpOffAltIcon style={{cursor:"pointer"}}  onClick={()=>editfun1(post._id)}/>:
                    <ThumbDownAltIcon style={{cursor:"pointer"}} onClick={()=>editfun1(post._id)}/>
                }
                {/* <p onClick={()=>editfun1(post._id)}>Edit</p> */}
              
                   
                    </div> 
            </div>
        })
      }




   
     
  
    </div>
  )
}

export default AllPosts
