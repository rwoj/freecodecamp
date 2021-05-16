import React from 'react'
import {connect} from 'react-redux'
import {loadStories, clear} from '../actions/index'

export function Stories(props) {
  return (<div>
            <button type="button" onClick={props.loadStories}>Load 3 stories</button>
            <button type="button" onClick={props.clear}>Clear</button>
            <StoryList {...props}/>
          </div>)
}
function StoryList(props) {
  if (props.items.length===0) return null;
  return(<div>
          {props.items.map(item=><Story {...item} key={item.id}/>)}
  </div>)
}
function Story(props) {
  return <p>{props.title}</p>
}
function mapState(state) {
  return state;
}
function mapDisatch(dispatch) {
  return {
    loadStories: ()=>dispatch(loadStories()),
    clear: ()=>dispatch(clear())
  }
}

export default connect(mapState, mapDisatch)(Stories)
