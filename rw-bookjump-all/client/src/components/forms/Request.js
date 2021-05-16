import React from "react";
// import PropTypes from "prop-types";
import { Card, Icon } from "semantic-ui-react";

const Request =({request, requestApprove, requestRemove, toApprove})=>{

  return(
    <Card>
      <Card.Content>
        {toApprove && !request.approved &&
          <Icon size='large' color='blue' name='checkmark' onClick={requestApprove} />}
        <Icon size='large' color='red' name='remove' onClick={requestRemove} />
          {request.title}
      </Card.Content>
      {/* < textAlign='left'>

      </Container>
      <Container textAlign='right'>
      </Container> */}
    </Card>
  )
}


// ListOfRequests.propTypes = {
//   book: PropTypes.object.isRequired,
//   exchange: PropTypes.func,
//   deleteBook: PropTypes.func
// };

export default Request;
