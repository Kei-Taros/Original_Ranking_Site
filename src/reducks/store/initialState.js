const initialState = {
  users: {
    isSignedIn: false,
    type: '',
    uid: '',
    username: '',
    voteRanking: []
  },
  ranking: {
    title: '',
    explan: '',
    item: [],
    id: '',
    totalVote: 0
  }
}

export default initialState