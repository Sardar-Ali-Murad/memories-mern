import React from 'react'
import { useAppContext } from '../context/appContext'
import "./Posts.css"
import { useNavigate } from 'react-router-dom'
import Alert from "./Alert.js"
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';






const PostForm = () => {
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
      isLoading,
      totalPages,
      changepage
    } = useAppContext()

    const [page, setPage] = React.useState(1);
    const handleChangefun = (event, value) => {
      setPage(value);
      changepage(value)
    };


    function handleimage(event){
        uploadImage(event)
      }
      
      function  handleChange(event){
        // console.log(event.target.name,event.target.value)
        changeFunction(event)
       }
  return (
    <div className='section__padding Form__BigMain' style={{width:"20%",marginLeft:"20px",padding:"0px 0px 0px 20px"}} >
      
      <div className='post__Form Form__Main'  >

<div className="memories__Overlay" style={{marginBottom:"30px"}}>
  <p className='p__Cormorant'>Search for the memeories</p>
  <input placeholder='title' value={searchTitle} onChange={handleChange} name="searchTitle"/>
  <input placeholder='tag' value={searchTag} onChange={handleChange} name="searchTag"/>
  <button className='btn'>Search</button>
</div>

<div className='upload__Memories memories__Overlay'>
  {showAlert && <Alert/>}
  <input placeholder='tag' value={tag} onChange={handleChange} name="tag"/>
  <input placeholder='title' value={title} onChange={handleChange} name="title"/>
  <textarea placeholder='message' value={message} onChange={handleChange} name="message">
    </textarea>
  <div class="form-row">
      <input type="file" id="image" accept="image/*" onChange={handleimage} />
 </div>
  
  <div className='upload__Memories__Buttons'>

    <button className='btn'  onClick={submitpost}>{isLoading?"Loading...":"Submit"}</button>
    <button className='btn' style={{marginTop:"10px"}} onClick={clearuploads}>Clear</button>
  </div>
</div>


</div>

<Pagination count={totalPages} page={page} onChange={handleChangefun}  className="pagination"/>

    </div>
  )
}

export default PostForm
