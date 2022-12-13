import express from "express"
let router=express.Router()

import {Login,Register,Logout} from "../controllers/Users.js"

router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/Logout").get(Logout)

export default router