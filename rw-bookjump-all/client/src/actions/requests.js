import api from '../api'
import {LOAD_MY_REQUESTS, DELETE_MY_REQUEST, ACCEPT_REQUEST} from "./types"
import {normalize} from 'normalizr'
import {requestsSchema} from "../schemas"

const dispatchAcceptRequest = data => ({
  type: ACCEPT_REQUEST,
  data
})
const dispatchDeleteRequest = data => ({
  type: DELETE_MY_REQUEST,
  data
})
const dispatchLoadMyRequests = data => ({
  type: LOAD_MY_REQUESTS,
  data
})

export const loadMyRequests = data => dispatch =>
  api.requests.loadMyRequests(data)
    .then(requests=>dispatch(dispatchLoadMyRequests(normalize(requests,[requestsSchema]))))

export const deleteRequest = (data) => dispatch =>
  api.requests.deleteRequest(data).then((book)=>dispatch(dispatchDeleteRequest(book)))

// could be refactored. do not need to change state
export const deleteMyRequest = (data) => dispatch =>
  api.requests.deleteRequest(data).then((book)=>dispatch(dispatchAcceptRequest(book)))

export const approveRequest = (data) => dispatch =>
  api.requests.approveRequest(data).then((book)=>dispatch(dispatchAcceptRequest(book)))
