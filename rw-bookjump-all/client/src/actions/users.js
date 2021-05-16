import api from '../api'
import {USER_SIGNED_UP, USER_LOGGED_IN, USER_LOGGED_OUT, USER_PROFILE_UPD} from "./types"

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const signup = data => dispatch =>
  api.user.signup(data).then(user=>dispatch({type: USER_SIGNED_UP}))

export const profileUpdate = data => dispatch =>
  api.user.profileUpdate(data).then(user=>dispatch({type: USER_PROFILE_UPD}))

export const login = data => dispatch =>
  api.user.login(data).then(user=>{
    localStorage.bookjump=JSON.stringify(user)
    dispatch(userLoggedIn(user))
  })

export const logout = data => dispatch =>{
  localStorage.bookjump=""
  api.user.logout(data).then(dispatch({type: USER_LOGGED_OUT}))
}
