import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Segment, Card, Header, Divider} from 'semantic-ui-react'
// import axios from 'axios'
import SearchBookForm from "../forms/SearchBookForm"
import BookForm from "../forms/BookForm"
import RequestsSubPage from "./RequestsSubPage"
import {addMyBook} from "../../actions/books"
import {loadMyBooks, deleteBook} from "../../actions/books"
import {allBooksSelector} from "../../reducers/books"

class MyBooksPage extends React.Component {
  state={
    book: null,
    loading: false
  }
  componentDidMount = ()=>{
    this.setState({loading: true})
    this.props.loadMyBooks()
      .then(()=>this.setState({loading: false}))
  }

  onBookSelect = (data) => {
    // console.log(data)
    const book=JSON.parse(data)
    this.props.addMyBook(book)
      .then(()=>{
        this.setState({loading: true})
        this.props.loadMyBooks()
          .then(()=>this.setState({loading: false}))
        });
  };
  deleteBook=(e, book)=>{
    this.setState({loading: true})
    this.props.deleteBook(book)
      .then(()=>this.setState({loading: false}))
  }

  render (){
    const {mybooks, user} = this.props;
    const myRequestsToApprove=mybooks.filter(x=>x.requested)
    // console.log("a", myRequestsToApprove)
    const myBooks=mybooks.map((book,i)=>
    <BookForm key={i} book={book} user={user} all={false}
      deleteBook={e=>this.deleteBook(e,book)}/>)

    return (
      <Segment>
        <br></br><br></br>
        {!this.state.loading&&<RequestsSubPage myRequestsToApprove={myRequestsToApprove} allBooks={false}/>}
        <Container text>
          <Header as='h2'>Manage your books</Header>
        </Container>
        <Divider></Divider>
        <Segment>
          <SearchBookForm onBookSelect={this.onBookSelect} />
          {/* {this.state.book && <BookForm submit={this.addBook} book={this.state.book} />} */}
        </Segment>
        <Segment loading={this.state.loading}>
          <Card.Group>
            {myBooks}
          </Card.Group>
        </Segment>
      </Segment>
      )
  }
}
MyBooksPage.propTypes={
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  addMyBook: PropTypes.func.isRequired,
  loadMyBooks: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return{
    mybooks: allBooksSelector(state),
    user: state.user
  }
}

export default connect(mapStateToProps,
              {addMyBook, loadMyBooks, deleteBook})(MyBooksPage)
