import React from "react";
import {Segment, Grid, Icon, Container, Header, Divider} from "semantic-ui-react"
// import PropTypes from "prop-types";

const HomePage = () => (
  <div>
    <Segment>
      <br></br><br></br><br></br>
      <Container text>
        <Header as='h1'>Good books exchange forum</Header>
      </Container>
      <h2>Features:</h2>
      <Divider></Divider>
      <Grid columns={2} divided >
        <Grid.Row>
          <Grid.Column>
            <p> You can catalogue your books</p>
            <p> You can see books from all users</p>
          </Grid.Column>
          <Grid.Column>
            <Icon name='exchange' size='large'/>
            You can request to borrow other users' book.
            <br></br>
            <Icon name='thumbs up' size='large'/>
            You can approve a request to borrow your book.
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </div>
);

// MainPageInfo.propTypes = {
//   text: PropTypes.string.isRequired
// };

export default HomePage;
