export const RANKING_UPDATE = "RANKING_UPDATE"
export const updateRankingAction = (rankingData) => {
  return {
    type: "RANKING_UPDATE",
    payload: rankingData
  }
}

export const RANKING_RESET = "RANKING_RESET"
export const resetRankingAction = (resetData) => {
  return {
    type: "RANKING_RESET",
    payload: resetData
  }
}

export const TMP_RANKING_RESET = "TMP_RANKING_RESET";
export const resetTmpRankingAction = (resetData) => {
  return {
    type: "TMP_RANKING_RESET",
    payload: resetData
  }
}