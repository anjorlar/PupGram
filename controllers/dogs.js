// const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken");

const Dog = require("../models/dogs");
const User = require("../models/users");

// Gets all Dogs

exports.getDogs = (req, res, next) => {
    Dog.findAll({
        include: [
            {
                all: true,
                attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            }
        ]
    })
        .then(dogs => {
            res.json(dogs);
        })
        .catch(err => res.json({ success: false }))
};

// Gets a Single Dog by its id

exports.getDogbyId = (req, res) => {
    const dogId = req.params.id
    Dog.findByPk(dogId)
        .then(dog => {
            if (!dog) {
                res.status(404).json({ success: false, message: "JOb not found" });
            } else {
                res.json(dog)
            }
        })
        .catch(err =>
            res.status(500).json({
                success: false,
                message: "Something went wrong while getting the dog"
            })
        );
};

// Posts a Dog

exports.postDog = (req, res) => {
    const { Name, Breed, Sex, Age } = req.body;
    const userId = req.userId;
    console.log("Req userId:" + userId);
    console.log("Header" + req.header("x-access-token"));
    User.findByPk(userId)
        .then(user => {
            user
                .createDog({
                    Name,
                    Breed,
                    Sex,
                    Age
                })
                .then(dog => {
                    res.json(dog);
                });
        })
        .catch(err =>
            res
                .status(500)
                .json({ msg: "Something went wrong while adding dog", error: err })
        );
};

// Deletes a Dog

exports.deleteDog = (req, res) => {
    const dogId = req.params.id;
    Dog.findByPk(dogId)
        .then(dog => {
            if (dog.userId !== req.userId) {
                res
                    .status(401)
                    .json({ msg: "You can't delete a dog you did not create" });
            } else {
                dog
                    .destroy()
                    .then(() => {
                        res.json({ success: true });
                    })
                    .catch(err => res.json({ success: false }));
            }
        })
        .catch(err =>
            res.json({ success: false, message: "This Dog doesnt exists" })
        );
};

/**
 * Gets all job created by the a user
 */
exports.getDogsByUser = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(user => {
            user
                .getDogs()
                .then(dogs => res.json(dogs))
                .catch(err =>
                    res.status(500).json({
                        success: false,
                        msg: "Something went wrong while getting dogs",
                        error: err
                    })
                );
        })
        .catch(err =>
            res.status(500).json({
                success: false,
                msg: "Something went wrong while getting user",
                error: err
            })
        );
};