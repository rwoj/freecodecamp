import React from "react";
// import PropTypes from "prop-types";
import Request from "./Request"
import { Card, Header, Divider } from "semantic-ui-react";

const ListOfRequestsToApprove =({requestsToApprove, requestsApproved,
                                requestRemove, requestApprove})=> {

    // console.log(requestsToApprove, requestsApproved)
    const ListOfRequestsApproved=requestsApproved.map((request, ind)=>(
        <Request key={'a'+request._id} request={request}
          toApprove={true}
          requestApprove={e=>requestApprove(e, request, ind)}
          requestRemove={e=>requestRemove(e,request, ind)}/>))
    const ListOfRequestsToApprove=requestsToApprove.map((request, ind)=>(
        <Request key={'t'+request._id} request={request}
          toApprove={true}
          requestApprove={e=>requestApprove(e,request, ind)}
          requestRemove={e=>requestRemove(e,request, ind)}/>))
    return(
      <div>
        {requestsToApprove.length>0 && <div>
          <Divider></Divider>
          <Header as='h2'>Requests for your approval</Header>
          <Card.Group>
            {ListOfRequestsToApprove}
          </Card.Group>
        </div>}
        {requestsApproved.length>0 && <div>
          <Divider></Divider>
          <Header as='h2'>Requests approved</Header>
          <Card.Group>
            {ListOfRequestsApproved}
          </Card.Group>
        </div>}
      </div>
    )
}


// ListOfRequestsToApprove.propTypes = {
//   book: PropTypes.object.isRequired,
//   exchange: PropTypes.func,
//   deleteBook: PropTypes.func
// };
// function mapStateToProps(state, ownProps) = {
//   return {
//
//   }
// }
//
// export default connect(mapStateToProps,{})(ListOfRequestsToApprove);
export default ListOfRequestsToApprove
