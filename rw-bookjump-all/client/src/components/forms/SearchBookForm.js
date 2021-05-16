import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button, List, Image } from "semantic-ui-react";

class SearchBookForm extends React.Component {
  state = {
    query: '',
    loading: false,
    books: []
  };

  onChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  handleSubmit=()=>{
    const {query}=this.state;
    this.setState({loading: true})
    // console.log(this.state)
    axios
      .get(`/api/books/search?q=${query}`)
      .then(res => res.data.books)
      .then(books => {
        const allBooks = [];
        books.forEach(book => {
          allBooks.push({
            goodreadsId: book.goodreadsId,
            title: book.title,
            cover: book.cover,
            authors: book.authors
          });
        });
        this.setState({ loading: false, books: allBooks});
        // console.log("result", this.state.books)
      });
  }
  handleBookClick=(e, data)=>{
    // console.log(data.value, data)
    this.props.onBookSelect(data.value)
    this.setState({books: [], query: ""})
  }

  render() {
    const {query, loading, books} = this.state
    let listOfBooks

    if(books.length>0) {
      listOfBooks = books.map((book)=>
        (
          <List.Item key={book.goodreadsId} value={JSON.stringify(book)} onClick={this.handleBookClick}>
            <Image avatar src={book.cover} />
            <List.Content >
              <List.Header as="a">{book.title}</List.Header>
              <List.Description>{book.authors}</List.Description>
            </List.Content>
          </List.Item>
          //
        )
      )
    }
    return (
      <Form loading={loading}>
        <Form.Group>
          <Form.Input
            placeholder="book title" name="query"
            value={query}
            onChange={this.onChange}
          />
          <Button primary onClick={this.handleSubmit}>Search to add a new book</Button>
        </Form.Group>
        <List>
          {!!books && listOfBooks}
        </List>
      </Form>
    );
  }
}

SearchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired
};

export default SearchBookForm;
