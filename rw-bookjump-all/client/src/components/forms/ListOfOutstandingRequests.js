import React from "react";
// import PropTypes from "prop-types";
import Request from "./Request"
import {Card, Header, Divider} from "semantic-ui-react";

const ListOfOutstandingRequests =({requests, requestApprove, requestRemove})=>{
  const listOfRequests=requests.map(request=>
      <Request key={'or'+request._id} request={request}
        toApprove={false}
        requestApprove={e=>requestApprove(e,request)}
        requestRemove={e=>requestRemove(e,request)}/>)

  return(
    <div>
      <Divider></Divider>
      <Header as='h2'>Your outstanding requests</Header>
      <Card.Group>
        {listOfRequests}
      </Card.Group>
    </div>
  )
}


// ListOfOutstandingRequests.propTypes = {
//   book: PropTypes.object.isRequired,
//   exchange: PropTypes.func,
//   deleteBook: PropTypes.func
// };

export default ListOfOutstandingRequests;
