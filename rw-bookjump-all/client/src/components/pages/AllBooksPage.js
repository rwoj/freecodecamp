import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import BookForm from "../forms/BookForm";
import RequestsSubPage from "./RequestsSubPage"
import {Container, Segment, Header, Card, Divider} from 'semantic-ui-react'
import {loadAllBooks, exchangeRequest} from "../../actions/books"
// import {loadMyRequests} from "../../actions/requests"
import {allBooksSelector} from "../../reducers/books"

class AllBooksPage extends React.Component {
  state={
    loading: false,
    exchange: false
  }
  componentDidMount = ()=>{
    this.setState({loading: true})
    this.props.loadAllBooks()
      .then(()=>this.setState({loading: false}))
  }
  handleExchange = (book, user, e)=>{
    // console.log(book, user)
    this.setState({exchange: true})
    this.props.exchangeRequest({bookId: book._id, userId: user.userId})
  }

  render (){
    const {user, books} = this.props;
    const allBooks=books.map((book,i)=>
      <BookForm key={i} book={book} user={user} all={true}
        exchange={e=>this.handleExchange(book, user, e)} />)

    return (
      <Segment loading={this.state.loading}>
        <br></br><br></br>
        <RequestsSubPage allBooks={true} myRequestsToApprove={[]}/>
        <Container text>
          <Header as='h2'>Books from all users</Header>
        </Container>
        <Divider></Divider>
        <Card.Group>
          {allBooks}
        </Card.Group>
      </Segment>
      )
  }
}

AllBooksPage.propTypes={
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  loadAllBooks: PropTypes.func.isRequired,
  exchangeRequest: PropTypes.func.isRequired,
  // loadMyRequests: PropTypes.func.isRequired
}
function mapStateToProps(state){
  return{
    books: allBooksSelector(state),
    user: state.user
  }
}

export default connect(mapStateToProps,
      {loadAllBooks, exchangeRequest})(AllBooksPage)
