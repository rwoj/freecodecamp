import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Segment, Button} from 'semantic-ui-react'
import ListOfOutstandingRequests from "../forms/ListOfOutstandingRequests"
import ListOfRequestsToApprove from "../forms/ListOfRequestsToApprove"
import {loadMyRequests, approveRequest, deleteRequest, deleteMyRequest} from "../../actions/requests"

class RequestsSubPage extends React.Component {
  state={
    book: null,
    loading: false,
    showRequests: false,
    showApprovals: false,
    requestsToApprove:[],
    requestsApproved:[]
  }
  componentDidMount = ()=>{
    const ListOfRequestsApproved=[], ListOfRequestsToApprove=[]

    this.setState({loading: true})
    this.props.loadMyRequests(this.props.user)
    // .then(()=>this.setState({loading: false}))

    this.props.myRequestsToApprove.forEach((request, ind)=>{
      if (request.approved) {
        ListOfRequestsApproved.push(request)
      } else {
        ListOfRequestsToApprove.push(request)
      }
    })

    this.setState({requestsToApprove: ListOfRequestsToApprove,
      requestsApproved: ListOfRequestsApproved, loading: false})
  }
  requestRemove=(e, book, ind)=>{
    this.props.deleteMyRequest(book)
      .then(()=>{
        const rtap=this.state.requestsToApprove
        if(rtap.length>0 && rtap[ind] &&
          rtap[ind]._id===book._id){
          // tmpReq=this.state.requestsToApprove.splice(ind,1)
          this.setState({requestsToApprove: [...rtap.slice(0,ind), ...rtap.slice(ind+1)]})
          // console.log("toapp", ind, this.state.requestsToApprove)
        } else{
          this.setState({requestsApproved: [...this.state.requestsApproved.slice(0,ind), ...this.state.requestsApproved.slice(ind+1)]})
          // console.log("app", ind, this.state.requestsApproved)
        }
    })
  }
  requestApprove=(e, book, ind)=>{
    this.props.approveRequest(book)
      .then(()=>{
        book.approved=true
        this.setState({requestsToApprove: [...this.state.requestsToApprove.slice(0,ind), ...this.state.requestsToApprove.slice(ind+1)],
                      requestsApproved: [...this.state.requestsApproved, book]})
      })
  }
  requestOustandingRemove=(e, book)=>this.props.deleteRequest(book)
  requestOustandingApprove=(e, book)=>this.props.approveRequest(book)
  showRequests=()=>this.setState({showRequests: !this.state.showRequests, showApprovals: false})
  showApprovals=()=>this.setState({showApprovals: !this.state.showApprovals, showRequests: false})

  render (){
    const {requests, allBooks} = this.props;
    const {showRequests, showApprovals, requestsToApprove, requestsApproved} = this.state;

    return (
      <Segment >
        <Button loading={this.state.loading} onClick={this.showRequests}>
          You have {requests.length} outstanding requests</Button>
        {!allBooks && <Button loading={this.state.loading} onClick={this.showApprovals}>
          You have {requestsToApprove.length} requests to approve ({requestsApproved.length} approved)</Button>}
        {showRequests&&<ListOfOutstandingRequests
          requests={requests}
          requestApprove={this.requestOustandingApprove}
          requestRemove={this.requestOustandingRemove} />}
        {showApprovals&&
        <ListOfRequestsToApprove
          requestsToApprove={requestsToApprove}
          requestsApproved={requestsApproved}
          requestApprove={this.requestApprove}
          requestRemove={this.requestRemove} />}
      </Segment>
      )
  }
}
RequestsSubPage.propTypes={
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired
  // }).isRequired,
  loadMyRequests: PropTypes.func.isRequired,
  approveRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  deleteMyRequest: PropTypes.func.isRequired,
  allBooks: PropTypes.bool.isRequired,
  myRequestsToApprove: PropTypes.array.isRequired
}
function mapStateToProps(state, ownProps) {
  return{
    requests: Object.values(state.requests),
    user: state.user,
    myRequestsToApprove: ownProps.myRequestsToApprove,
    allBooks: ownProps.allBooks
  }
}

export default connect(mapStateToProps,
  {loadMyRequests, approveRequest, deleteRequest, deleteMyRequest})(RequestsSubPage)
