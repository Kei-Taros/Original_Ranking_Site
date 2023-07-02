export const SIGN_IN = "SIGN_IN";
export const signInAction = (state) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      type: state.type,
      uid: state.uid,
      username: state.username
    }
  }
}

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = (state) => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      type: '',
      uid: '',
      username: ''
    }
  }
}