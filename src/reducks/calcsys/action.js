export const COUNTER_A = "COUNTER_A";
export const counterAction_A = (state) => {
  return {
    type: "COUNTER_A",
    payload: {
      count_A: state.count_A
    }
  }
}

export const COUNTER_B = "COUNTER_B";
export const counterAction_B = (state) => {
  return {
    type: "COUNTER_B",
    payload: {
      count_B: state.count_B
    }
  }
}

export const COUNTER_ADD = "COUNTER_ADD";
export const counterAction_ADD = (state) => {
  return {
    type: "COUNTER_ADD",
    payload: {
      add_count: state.add_count
    }
  }
}