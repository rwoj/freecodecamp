import User from '../models/User'
import {parseErrors} from '../utils/parseErrors'

export default function UserHandler(){
  this.signUp=(req,res)=>{
    const {username, password, email} = req.body.user
    User
      .find({'email': email})
      .then(result=>{
        if (result.length===0) {
          const user=new User({username, email})
          user.setPassword(password)

          user
            .save()
            .then(userRecord=>res.json(
              {"user":
                {"email":userRecord.email}
              }))
            .catch(err=>res.status(400).json({"errors": parseErrors(err.errors)}))
        } else {
          res.status(401).json({"errors": {"global": "User already exists"}})
        }
      })
    },
    this.getProfile=(req,res)=>{
      console.log("heja", req.user, req.user._id)
      User
        .findById(req.user._id)
        .then(user=>res.json({user}))
        // .cath(err=>res.status(400).json({"errors": parseErrors(err.errors)}))
    },
    this.updateProfile=(req,res)=>{
      const {city, state} = req.body.profile
      console.log(req.body.profile)
      User
        .findById(req.user._id)
        .then(userRecord=>{
            userRecord.city=city
            userRecord.state=state
            userRecord
              .save()
              .then(user=>res.json({user}))
              // .catch(err=>res.status(400).json({"errors": parseErrors(err.errors)}))
        })
    }
    // this.login = (req,res)=>{
    //   const {email, password} = req.body.user
    //   User
    //     .findOne({'email': email})
    //     .then(user=>{
    //       if (user && user.isValidPassword(password) ) {
    //         res.json(user)
    //       } else {
    //         res.status(400).json({"errors": {"global": "user already exists"}})
    //       }
    //     })
    // }
}
