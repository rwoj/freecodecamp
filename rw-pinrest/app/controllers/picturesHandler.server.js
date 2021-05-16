'use strict';

const User = require('../models/users.js');
const Picture = require('../models/pictures.js')

function PicturesHandler () {
  this.getAll=function (req, res) {
    Picture
      .find({})
      .exec(function (err, results)
      {
  		    if (err){throw err}
          res.json(results)
        })
  },
  this.getSomeones=function (req, res) {
    Picture
      .find({userId: req.body.userId})
      .exec(function (err, results)
      {
  		    if (err){throw err}
          res.json(results)
        })
  },
  this.getMy=function (req, res) {
    Picture
      .find({userId: req.user._id})
      .exec(function (err, results)
      {
  		    if (err){throw err}
          res.json(results)
        })
  },
  this.addMy=function (req, res) {
    // console.log(req.body.picture, req.user)
    var pic=new Picture({
      url: req.body.picture.url,
    	description: req.body.picture.description,
      likes: 0,
      users: [],
      userId: req.user.id,
      userUrl: req.user.twitter.url
    })
    pic.save(function (err, picRecord)
    {
			if(err) throw err;
    	res.json(picRecord)
    })
  },
  this.deleteMy=function (req, res) {
    Picture
      .findOneAndRemove({'_id':req.body._id}, function (err, result) {
        if (err) { throw err; }
 		// 	console.log(result)
        res.json(result);
      });
  },
  this.modifyLike=function (req, res) {
    // console.log(req.body)
    Picture
      .findOne({_id: req.body._id}, function (err, picRecord) {
        if (err) {throw err}
        var existUser=picRecord.users.findIndex(function (x) {
                return x===req.user.id })
        // console.log(existUser)
        if( existUser !==-1 ){
          picRecord.likes-=1;
          picRecord.users.splice(existUser,1)
        } else {
          picRecord.likes+=1;
          picRecord.users.push(req.user.id)
        }
        picRecord
          .save(function (err, result) {
            if(err) {throw err}
            // console.log(result)
            res.json(result)
          })
      })
  }
}

module.exports = PicturesHandler;
