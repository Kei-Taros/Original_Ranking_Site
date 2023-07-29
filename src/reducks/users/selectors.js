import { createSelector } from "reselect";

const usersSelector = (state) => state.users

export const getIsSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
)

export const getVoteRanking = createSelector(
  [usersSelector],
  state => state.voteRanking
)

export const getUid = createSelector(
  [usersSelector],
  state => state.uid
)