import axios from 'axios'

export default{
  user: {
    signup: user =>
      axios.post("api/signup", {user}).then(res=>res.data.user),
    login: userCredentials =>
      axios.post("api/login", userCredentials).then(res=>res.data.user),
    logout: userCredentials =>
      axios.get("api/logout").then(res=>res.data.user),
    getUserProfile: () =>
      axios.get("api/user/profile").then(res=>res.data.user),
    profileUpdate: profile =>
      axios.post("api/user/profile", {profile}).then(res=>res.data.user)
  },
  books: {
    addMyBook: book =>
      axios.post("api/books/my", {book}).then(res=>res.data.book),
    deleteBook: data =>
      axios.post("api/books/delete", {data}).then(res=>res.data.book),
    loadMyBooks: user =>
      axios.get("api/books/my").then(res=>res.data.books),
    loadAllBooks: ()=>
      axios.get("api/books/all").then(res=>res.data.books),
    exchangeRequest: data =>
      axios.post("/api/books/exchange/new", {data}).then(res=>res.data.book)
  },
  requests: {
    approveRequest: data =>
      axios.post("api/books/exchange/approve", {data}).then(res=>res.data.book),
    deleteRequest: data =>
      axios.post("api/books/exchange/delete", {data}).then(res=>res.data.book),
    loadMyRequests: data =>
      axios.post("api/books/exchange/my", {data}).then(res=>res.data.requests)
  }
}
