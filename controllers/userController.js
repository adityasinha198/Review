const bcrypt = require("bcrypt");
const userSchema = require("../models/userModelSchema");
const jwt = require('jsonwebtoken')
const sendMail = require('../service/emailService')

const saveuser = async (req, res) => {
  try {

    const isEmailExists = await userSchema.findOne({ useremail: req.body.useremail });
    if (isEmailExists) {
      res.status(409).json({
        success: "failure",
        message: "Email already exits",
      });
    } else {
      const data = await new userSchema(req.body);
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(req.body.password, salt);
     const info = await data.save();
      res.status(201).json({
        sucess: "success",
        message: "User created",

      });
    }
  } catch (err) {
    return res.status(400).json({
      success: "failure",
      error: err.message
    })
  }
};


const userLogin = async (req, res) => {

  try {
    if (req.body.useremail && req.body.password) {
      const isEmailExist = await userSchema.findOne({ useremail: req.body.useremail })
     
      if (isEmailExist) {
        const comparePassword = await bcrypt.compare(req.body.password, isEmailExist.password)
        if (comparePassword) {
          const token = jwt.sign({ userId: isEmailExist._id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
          return res.status(200).json({
            success: "success",
            message: "User logged-in suceesfully",
            userdata: isEmailExist,
            token: token
          })
        } else {
          return res.status(401).json({
            success: "failure",
            error: "Invalid credentials"
          })
        }
      } else {
        return res.status(401).json({
          success: "failure",
          error: "Invalid credentials"
        })
      }
    } else {
      return res.status(400).json({
        success: "failure",
        error: "Enter data"
      })
    }
  } catch (err) {
    return res.status(400).json({
      success: "failure",
      error: "error" + err.message
    })
  }
}


const resetUserPassword = async (req, res) => {
  try {

    if (req.body.useremail) {
      const isEmailExist = await userSchema.findOne({ useremail: req.body.useremail })
      if (isEmailExist) {
        const token = await jwt.sign({ userId: isEmailExist._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" })
        const saveToken = await userSchema.updateOne({ useremail: req.body.useremail }, { token: token })
        const success = await sendMail.sendmailer(req.body.useremail, token, isEmailExist._id)
        res.status(200).json({
          success: "success",
          message: "Email sent successfully"
        })

      } else {
        res.status(401).json({
          success: 'failure',
          error: "Invalid credentials"

        })
      }
    }
  }
  catch (err) {
    res.status(400).json({
      success: 'failure',
      error: "error" + err.message

    })
  }
}


const savePassword = async (req, res) => {
  try {

    const { id, token } = req.params
    if (req.body.newpassword && req.body.confirmpassword) {
      if (req.body.newpassword == req.body.confirmpassword) {
        const userExists = await userSchema.findOne({ _id: req.params.id })
        if (userExists) {
          const verifytoken = await jwt.verify(req.params.token, process.env.JWT_SECRET_KEY)
          if (verifytoken) {
            const salt = await bcrypt.genSalt(10);
            const encryptPassword = await bcrypt.hash(req.body.newpassword, salt)
            const updatePassword = await userSchema.updateOne({ _id: req.params.id }, { password: encryptPassword })
            res.status(200).json({
              success: "success",
              message: "Password updated"
            })

          }
          else {
            res.status(401).json({
              success: "failure",
              error: "Token expired"
            })
          }

        }
      }
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message
    })

  }
}


module.exports = {
  saveuser,
  userLogin,
  resetUserPassword,
  savePassword,

};
