import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Image, Container } from "semantic-ui-react";

const BookForm =({book, exchange, all, user, deleteBook})=>{
    return(
      <Card >
        <Card.Content >
          <Image floated='right' src={book.cover} size='tiny' />
          <Card.Header>{book.title}</Card.Header>
          <Card.Meta>{book.authors}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          {all && !book.requested && user.userId!==book.userId &&
            <a onClick={exchange} >
              <Icon name='exchange' />
            Request to borrow that book </a>}
          {!all && <Container textAlign='right'>
            <a onClick={deleteBook}>
              <Icon color='red' name='delete' /> </a>
          </Container>}

        </Card.Content>
      </Card>
    )
  }


BookForm.propTypes = {
  book: PropTypes.object.isRequired,
  exchange: PropTypes.func,
  deleteBook: PropTypes.func
};

export default BookForm;
