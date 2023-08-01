const initialState = {
  users: {
    isSignedIn: false,
    spType: false,
    uid: '',
    username: '',
    voteRanking: []
  },
  ranking: {
    title: '',
    explan: '',
    item: [],
    id: '',
    totalVote: 0,
    createrUid: ''
  },
  tmpRanking: {
    updateVotedItem: [],
    votedItemTmpSave: []
  }
}

export default initialState