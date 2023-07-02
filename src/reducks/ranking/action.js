export const RANKING_CREATE = "RANKING_CREATE";
export const createRankingAction = (rankingData) => {
  return {
    type: "RANKING_CREATE",
    payload: rankingData
  }
}

export const RANKING_RESET = "RANKING_RESET";
export const resetRankingAction = (resetData) => {
  return {
    type: "RANKING_RESET",
    payload: resetData
  }
}
