
import PostSchema from "../models/Post.js"
import User from "../models/Auth.js"

import {BadRequestError,UnAuthenticatedError,NotFoundError} from "../errors/index.js"

import {StatusCodes} from "http-status-codes"




let createpost=async (req,res)=>{
     let {tag,message,image,title}=req.body

     if(!tag || !title || !message){
         throw new BadRequestError("Please fill out all the information")
    }

    if(!image){
        throw new BadRequestError("Please Wait for the image to upload")
    }
        
        let userID=req.user.userId

        req.body.user=userID     
        
        let Post=await PostSchema.create({...req.body})

        res.status(StatusCodes.CREATED).json({Post})
}

let getAllPosts=async (req,res)=>{
    

    let {searchTitle,searchTag}=req.query

    
    let queryObject={
        user:req.user.userId
    }

   

    if(searchTag){
        queryObject.tag={ $regex: searchTag }
    }
    if(searchTitle){

       queryObject.title ={ $regex: searchTitle }
    }
      

    let result=PostSchema.find(queryObject)
    // let result=PostSchema.find({user:req.user.userId})

    let page=(req.query.page) || 1
    let limit=(req.query.limit) || 4
    let skip=(page-1)*limit 

    result= result.limit(limit).skip(skip)

    let finalResult=await result

    let totalMemories=await PostSchema.countDocuments(queryObject)
    let totalPages=Math.ceil(totalMemories/limit)


    res.status(StatusCodes.OK).json({posts:finalResult,totalMemories,totalPages})
}

let deletePost=async (req,res)=>{
    let {id}=req.params
    // console.log(req.params.id)

    let postExists=await PostSchema.findOne({_id:id})

    if(!postExists){
        throw new BadRequestError("The Post Does Not Exits")
    }

    if(postExists.user!=req.user.userId){
        throw new UnAuthenticatedError("You are not authorize to delete this post")
    }

    await postExists.remove()

    res.status(StatusCodes.OK).json({postExists})

}


let updatePost=async (req,res)=>{
    let {id}=req.params
    

    let post=await PostSchema.findOne({
        _id:id
    })

    if(!post){
        throw new BadRequestError('The post doesnot exists')
    }
    // if(post.user!=req.user.userId){
    //     throw new UnAuthenticatedError("You are not authorized to to this")
    // }

    if(post.like==true){
        post.like=false
        await post.save()
    }

    else{
        post.like=true
        await post.save()
    }

    res.status(StatusCodes.OK).json({post})
}


export {createpost,getAllPosts,deletePost,updatePost}