export const COUNTER_CHENGE = "COUNTER_CHENGE";
export const counterAction_A = (state) => {
  return {
    type: "COUNTER_CHENGE",
    payload: {
      count_A: state.count_A
    }
  }
}

export const counterAction_B = (state) => {
  return {
    type: "COUNTER_CHENGE",
    payload: {
      count_B: state.count_B
    }
  }
}

export const counterAction_ADD = (state) => {
  return {
    type: "COUNTER_CHENGE",
    payload: {
      add_count: state.add_count
    }
  }
}