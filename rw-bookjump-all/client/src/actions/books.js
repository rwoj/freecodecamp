import api from '../api'
import {ADD_MY_BOOK, LOAD_MY_BOOKS, LOAD_ALL_BOOKS,
      EXCHANGE_REQUEST, DELETE_MY_BOOK} from "./types"
import {normalize} from 'normalizr'
import {bookSchema} from "../schemas"

const dispatchAddMyBook = data => ({
  type: ADD_MY_BOOK,
  data
})
const dispatchExchangeRequest = data => ({
  type: EXCHANGE_REQUEST,
  data
})
const dispatchDeleteBook = data => ({
  type: DELETE_MY_BOOK,
  data
})
const dispatchLoadMyBooks = data => ({
  type: LOAD_MY_BOOKS,
  data
})
const dispatchLoadAllBooks = data => ({
  type: LOAD_ALL_BOOKS,
  data
})

export const addMyBook = data => dispatch =>
  api.books.addMyBook(data).then(book=>dispatch(dispatchAddMyBook(normalize(book, bookSchema))))

export const loadMyBooks = data => dispatch =>
  api.books.loadMyBooks(data).then(books=>dispatch(dispatchLoadMyBooks(normalize(books, [bookSchema]))))

export const loadAllBooks = data => dispatch =>
  api.books.loadAllBooks(data).then(books=>dispatch(dispatchLoadAllBooks(normalize(books, [bookSchema]))))

export const exchangeRequest = (data) => dispatch =>
  api.books.exchangeRequest(data).then(book=>dispatch(dispatchExchangeRequest(normalize(book, bookSchema))))

export const deleteBook = (data) => dispatch =>
  api.books.deleteBook(data).then(()=>dispatch(dispatchDeleteBook({bookId: data._id})))
