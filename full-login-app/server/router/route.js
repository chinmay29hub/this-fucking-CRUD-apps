import { Router } from "express";
const router = Router()

// importing all controller
import * as controller from "../controllers/appController.js"
import Auth from "../middleware/auth.js";

// post requests
router.route("/register").post(controller.register)

router.route("/registerMail").post()

router.route("/authenticate").post((req, res) => {
    res.end()
})

router.route("/login").post(controller.verifyUser, controller.login)

// get methods
router.route("/user/:username").get(controller.getUser)
router.route("/generateOTP").get(controller.generateOTP)
router.route("/verifyOTP").get(controller.verifyOTP)
router.route("/createResetSession").get(controller.createResetSession)


// put requests
router.route("/updateuser").put(Auth, controller.updateUser)
router.route("/resetPassword").put(controller.resetPassword)



export default router