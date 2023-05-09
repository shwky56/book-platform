import { IsValidateEmail, IsValidatePassword } from "../../framework/index.js";
import User from '../models.js'

import jwt from "jsonwebtoken"
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()
const SECRET = process.env.SECRET;

const PASSWORD_ERROR = "Length is between 8 and 24 characters Contains at least one uppercase letter, one lowercase letter, one number and one special character";

export const signin = async (req, res) => {
    const { email, password } = req.body //Coming from formData

    try {
        const existingUser = await User.find({ email: email });

        if (!existingUser[0]) return res.status(404).json({ message: "User doesn't exist" })
        const user = existingUser[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

        //If crednetials are valid, create a token for the user
        const token = jwt.sign({ email: user.email, password: user.password, id: user.id, type: user.type }, SECRET, { expiresIn: "50h" })

        //Then send the token to the client/frontend
        res.status(200).json({ user: {...user, token: token} });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export const signup = async (req, res) => {
    const { email, password, confirmPassword, phone} = req.body;

    try {
        const existingUser = await User.find({ email: email })

        if (existingUser[0]) return res.status(400).json({ message: "User already exist" })

        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match" })

        //  cheac eamil is valide
        IsValidateEmail(email);
        //  cheac password is valide 
        IsValidatePassword(password);
        //  hash password befor saving in database
        const hashedPassword = await bcrypt.hash(password, 12)

        const user_id = await User.create({ email, password: hashedPassword, phone})
        const user = await User.get(user_id);
        //  ginerate token for using 
        const token = jwt.sign({ email: user.email, password: user.password, id: user.id, type: user.type }, SECRET, { expiresIn: "50h" })

        res.status(200).json({ user: {...user, token: token} })                            

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// export const forgotPassword = (req, res) => {

//     const { email } = req.body

//     // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
//     const transporter = nodemailer.createTransport({
//         host: HOST,
//         port: PORT,
//         auth: {
//             user: USER,
//             pass: PASS
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     })


//     crypto.randomBytes(32, (err, buffer) => {
//         if (err) {
//             console.log(err)
//         }
//         const token = buffer.toString("hex")
//         User.findOne({ email: email })
//             .then(user => {
//                 if (!user) {
//                     return res.status(422).json({ error: "User does not exist in our database" })
//                 }
//                 user.resetToken = token
//                 user.expireToken = Date.now() + 3600000
//                 user.save().then((result) => {
//                     transporter.sendMail({
//                         to: user.email,
//                         from: "Accountill <hello@accountill.com>",
//                         subject: "Password reset request",
//                         html: `
//                     <p>You requested for password reset from Arc Invoicing application</p>
//                     <h5>Please click this <a href="https://accountill.com/reset/${token}">link</a> to reset your password</h5>
//                     <p>Link not clickable?, copy and paste the following url in your address bar.</p>
//                     <p>https://accountill.com/reset/${token}</p>
//                     <P>If this was a mistake, just ignore this email and nothing will happen.</P>
//                     `
//                     })
//                     res.json({ message: "check your email" })
//                 }).catch((err) => console.log(err))

//             })
//     })
// }



// export const resetPassword = (req, res) => {
//     const newPassword = req.body.password
//     const sentToken = req.body.token
//     User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
//         .then(user => {
//             if (!user) {
//                 return res.status(422).json({ error: "Try again session expired" })
//             }
//             bcrypt.hash(newPassword, 12).then(hashedpassword => {
//                 user.password = hashedpassword
//                 user.resetToken = undefined
//                 user.expireToken = undefined
//                 user.save().then((saveduser) => {
//                     res.json({ message: "password updated success" })
//                 })
//             })
//         }).catch(err => {
//             console.log(err)
//         })
// }