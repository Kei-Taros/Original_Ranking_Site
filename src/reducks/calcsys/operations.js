import { counterAction_A, counterAction_ADD, counterAction_B } from "./action";
import * as Count from "../../templates/Counter"

export const incdecSystem = (type) => {
  return async (dispatch, getState) => {
    const state = getState()
    let counter_A = state.count.count_A
    let counter_B = state.count.count_B

    switch (type) {
      case Count.INC_A:
        dispatch(counterAction_A({
          count_A: ++counter_A
        }))
        break
      case Count.DEC_A:
        dispatch(counterAction_A({
          count_A: --counter_A
        }))
        break

      case Count.INC_B:
        dispatch(counterAction_B({
          count_B: ++counter_B
        }))
        break
      case Count.DEC_B:
        dispatch(counterAction_B({
          count_B: --counter_B
        }))
        break

      case Count.ADD:
        dispatch(counterAction_ADD({
          add_count: counter_A + counter_B
        }))
        break

      default:
        break
    }
  }
}
