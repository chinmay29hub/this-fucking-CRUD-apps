let Userdb = require("../model/model")

// create and save new user

exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message : "Content cannot be empty" })
        return
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    // save user
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect("/add_user")
        })
        .catch(err => res.status(500).send({
            message : err.message || "Some error occured while creating a User"
        })
        )
}

// retrieve and return all users or single user
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id

        Userdb.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({
                        message : `Not found a user with id ${id}`
                    }
                    )
                } else {
                    res.send(data)
                }
            }).catch(err => {
                res.status(500).send({message : `Error retrieving with id ${id}`})
            })
    } else {
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Error Occured while retrieving user"
            })
        })
    }
}

// update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message : "Content cannot be empty" })
        return
    }
    const id = req.params.id
    Userdb.findByIdAndUpdate(id, req.body, {
        useFindAndModify : false
    }).then(data => {
        if (!data) {
            res.status(404).send({
                message : `Cannot update user with id ${id}. Maybe user not found`
            })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({
            message : "Error Update user information"
        })
    })
}

// delete the user with specifies user id in the request
exports.delete = (req, res) => {
    const id = req.params.id
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                res.send(404).send({
                    message : `Cannot Delete with id ${id}. Maybe id is wrong`
                })
            } else {
                res.send({
                    message : "User was deleted succesfully"
                })
            }
        }).catch(err => {
            res.status(500).send({
                message : `Could not delete User with id=${id}`
            })
        })

}