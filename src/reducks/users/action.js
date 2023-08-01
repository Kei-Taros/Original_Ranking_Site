export const SIGNIN_UPDATE = "SIGNIN_UPDATE";
export const signInAction = (state) => {
  return {
    type: "SIGNIN_UPDATE",
    payload: {
      isSignedIn: true,
      spType: state.spType,
      uid: state.uid,
      username: state.username,
      voteRanking: state.voteRanking
    }
  }
}

export const updateVoteAction = (state) => {
  return {
    type: "SIGNIN_UPDATE",
    payload: {
      voteRanking: state.voteRanking
    }
  }
}

export const SIGNOUT = "SIGNOUT";
export const signOutAction = (state) => {
  return {
    type: "SIGNOUT",
    payload: {
      isSignedIn: false,
      spType: false,
      uid: '',
      username: '',
      voteRanking: []
    }
  }
}