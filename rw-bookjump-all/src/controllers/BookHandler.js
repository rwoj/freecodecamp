import Book from '../models/Book'
import request from 'request-promise'
import {parseString} from 'xml2js'
import {parseErrors} from '../utils/parseErrors'

export default function BookHandler(){
  this.getAll=(req,res)=>{
    Book.find({}).then(books => res.json({books}));
  },
  this.getMy=(req,res)=>{
    Book.find({ userId: req.user._id }).then(books => res.json({books}));
  },
  this.addMy=(req,res)=>{
    // console.log(req.body.book, req.user._id)
    Book.create({...req.body.book, userId: req.user._id,
      requested: false, requestedUserId: null, approved: false })
        .then(book => res.json({ book }))
        .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
  },
  this.deleteBook=(req,res)=>{
    // console.log(req.body.data, req.body.data._id)
    Book.deleteOne({'_id': req.body.data._id})
      .then(()=>res.json({'bookId': req.body.data._id}))
      .catch(err=>res.status(400).json(err))
  },
  this.exchangeRequest=(req,res)=>{
    Book.findById(req.body.data.bookId).then(bookFound=>{
      bookFound.requested=true;
      bookFound.requestedUserId=req.body.data.userId;
      bookFound.save().then(book=>{
        // console.log(book)
        res.json({book})})
  })},
  this.deleteExchange=(req,res)=>{
    // console.log(req.body.data)
    Book.findById(req.body.data._id).then(bookFound=>{
      bookFound.requested=false;
      bookFound.requestedUserId=null;
      bookFound.approved=false;
      bookFound.save().then(book=>{
        // console.log(book)
        res.json({book})})
  })},
  this.approveExchange=(req,res)=>{
    // console.log(req.body.data)
    Book.findById(req.body.data._id).then(bookFound=>{
      bookFound.approved=true;
      bookFound.save().then(book=>{
        // console.log(book)
        res.json({book})})
  })},
  this.myExchanges=(req,res)=>{
    // console.log("heja", req.body.data)
    Book.find({requestedUserId: req.body.data.userId})
      .then(requests=>res.json({requests}))
  },
  this.search=(req,res)=>{
    request
      .get(
        `https://www.goodreads.com/search/index.xml?key=${process.env.GOODREADS_KEY}&q=${req.query.q}`
      )
      .then(result =>
        parseString(result, (err, goodreadsResult) =>
          res.json({
            books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
              work => ({
                goodreadsId: work.best_book[0].id[0]._,
                title: work.best_book[0].title[0],
                authors: work.best_book[0].author[0].name[0],
                cover: work.best_book[0].image_url[0]
              })
            )
          })
        )
      );
  }
}
