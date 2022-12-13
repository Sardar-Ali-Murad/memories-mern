import express from "express"
let router=express.Router()
import {createpost,deletePost,updatePost,getAllPosts} from "../controllers/PostController.js"
import auth from "../middleware/auth.js"
import uploadImage from "../controllers/UploadImage.js"

// by above is not working
// router.route("/:id").delete(auth,deletePost).patch(auth,updatePost)
router.route("/:id").delete(auth,deletePost).patch(auth,updatePost)
 
router.route("/").post(auth,createpost).get(auth,getAllPosts)
router.route("/upload").post(auth,uploadImage)


export default router