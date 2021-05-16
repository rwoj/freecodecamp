import {schema} from "normalizr"

export const bookSchema = new schema.Entity(
  "books",
  {},
  {idAttribute: "_id"}
)
export const requestsSchema = new schema.Entity(
  "requests",
  {},
  {idAttribute: "_id"}
)
