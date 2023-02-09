import UserModel from "../model/User.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import ENV from "../config.js"

// middleware for verify user

export async function verifyUser (req, res, next) {
    try {
        const { username } = req.method == "GET" ? req.query : req.body

        // check the user existence
        let exist = await UserModel.findOne({ username })
        if (!exist) {
            return res.status(404).send({ error : "Cannot find User" })
        }
        next()

    } catch (error) {
        return res.status(404).send({ error : "Authentication Error" })
    }
}


export async function register(req, res) {
    // res.json("Register Router")
    try {
        const { username, password, profile, email } = req.body

        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function (err, user) {
                if (err) reject(new Error(err))
                if(user) reject({ error : "Please Use Unique Username" })
                resolve()
            })
        })

        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function (err, email) {
                if (err) reject(new Error(err))
                if(email) reject({ error : "Please Use Unique Email" })
                resolve()
            })
        })

        Promise.all([existUsername, existEmail])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10)
                        .then( hashedPassword => {

                            const user = new UserModel({
                                username,
                                password : hashedPassword,
                                profile : profile || "",
                                email
                            })

                            user.save()
                                .then(result => res.status(201).send({ msg : "User Registered Successfully" }))
                                .catch(error => res.status(500).send({error}))

                        } ).catch (error => {
                            return res.status(500).send({
                                error : "Enable to Hashed Password"
                            })
                        })
                }
            }).catch (error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        res.status(500).send(error)
    }
}

export async function login(req, res) {
    // res.json("login Router")
    const { username, password } = req.body

    try {
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) return res.status(400).send({ error : "Don't have password" })

                        const token = jwt.sign({
                            userId : user._id,
                            username : user.username
                        }, ENV.JWT_SECRET, { expiresIn : "24h" })


                        return res.status(200).send({
                            msg : "Login Successful",
                            username : user.username,
                            token
                        })
                    })
                    .catch(error => {
                        return res.status(400).send({ error : "Password Does Not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error : "Username Not Found" })
            })
    } catch (error) {
        return res.status(500).send({ error })
    }
}

export async function getUser(req, res) {
    // res.json("getUser Router")
    const { username } = req.params
    try {
        if (!username) {
            return res.status(501).send({ error : "Invalid Username" })
        }

        UserModel.findOne({ username }, function (err, user) {
            if (err) {
                return res.status(500).send({ error : "Could Not Find the User" })
            }

            if (!user) {
                res.status(501).send({ error })
            }

            const { password, ...rest } = Object.assign({}, user.toJSON())

            return res.status(201).send(rest)
        })
    } catch (error) {
        return res.status(404).send({ error : "Cannot find User Data" })
    }
}

export async function updateUser(req, res) {
    // res.json("updateUser Router")
    try {
        // const id = req.query.id
        const { userId } = req.user

        if (userId) {
            const body = req.body
            UserModel.updateOne({ _id : userId }, body, function (err, data) {
                if (err) throw err

                return res.status(201).send({ msg : "Record Updated Successfully" })
            })
        } else {
            return res.status(401).send({ error : "User Not Found" })
        }

    } catch (error) {
        return res.status(401).send({ error : "Something went wrong" })
    }
}

export async function generateOTP(req, res) {
    res.json("generateOTP Router")
}

export async function verifyOTP(req, res) {
    res.json("verifyOTP Router")
}

export async function createResetSession(req, res) {
    res.json("createResetSession Router")
}

export async function resetPassword(req, res) {
    res.json("resetPassword Router")
}