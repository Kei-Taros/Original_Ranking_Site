import { createSelector } from "reselect";

const rankingSelector = (state) => state.ranking

export const getId = createSelector(
  [rankingSelector],
  state => state.id
)

export const getTitle = createSelector(
  [rankingSelector],
  state => state.title
)

export const getExplan = createSelector(
  [rankingSelector],
  state => state.explan
)

export const getItem = createSelector(
  [rankingSelector],
  state => state.item
)

export const getTotalVote = createSelector(
  [rankingSelector],
  state => state.totalVote
)