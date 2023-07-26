export const SIGNIN_UPDATE = "SIGNIN_UPDATE";
export const signInAction = (state) => {
  return {
    type: "SIGNIN_UPDATE",
    payload: {
      isSignedIn: true,
      type: state.type,
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
      type: '',
      uid: '',
      username: '',
      voteRanking: []
    }
  }
}