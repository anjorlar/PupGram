const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require("../models/users");

exports.getUser = (req, res, next) => {

    User.findOne()
        .then(user => {
            res.json(user)
        })
        .catch(err => res.json({ success: false }))
}

exports.postUser = (req, res) => {
    const { Name, Username, Password, Email, Bio, Location, imageurl } = req.body;
    if (!Username || !Password || !Email || !Location) {
        res.status(400).json({ msg: "All fields are required" })
    } else {
        let hashedPassword;
        User.findOne({
            where: { Email }
        }).then(user => {
            if (user) {
                return res.status(400).json({ msg: "User already exist" })
            }
        }).catch(err => (err))
        try {
            const salt = bcrypt.genSaltSync(10);
            hashedPassword = bcrypt.hashSync(Password, salt)
        } catch (error) {
            throw (error)
        }
        User.create({
            Name,
            Username,
            Email,
            Password: hashedPassword,
            Bio,
            Location,
            imageurl
        }).then(user => {
            jwt.sign(
                { id: user.id },
                process.env.AUTH_SECRET_KEY,
                { expiresIn: "2h" },
                (err, token) => {
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            Name: user.Name,
                            Username: user.Username,
                            Password: user.Password,
                            Email: user.Email,
                            Bio: user.Bio,
                            Location: user.Location,
                            imageurl: user.imageurl
                        }
                    })
                });
        }).catch(err => res.status(500).json({ msg: "An error occured", error: err }))
    }
}