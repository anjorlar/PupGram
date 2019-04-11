const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

exports.postlogin = (req, res, next) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
        res.status(400).json({ msg: "All Fields are required" })
    } else {
        User.findOne({
            where: {
                Email
            }
        }).then(user => {
            if (!user) {
                res.status(400).json({ msg: "Invalid Email" })
            }
            bcrypt.compare(Password, user.Password)
                .then(match => {
                    if (!match) {
                        return res.status(400).json({ msg: "Invalid Password" })
                    }
                    jwt.sign(
                        { id: user.id },
                        process.env.AUTH_SECRET_KEY,
                        (err, token) => {
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    Username: user.Username,
                                    Email: user.Email,
                                    Password: user.Password
                                }
                            })
                        });
                })
                .catch(err => {
                    next(err)
                })
        }).catch(err => next(err))
    }
}

