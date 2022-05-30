import { INITIALIZE, UPDATE_CORE_INFO } from 'redux/actions/types'

export default (state = null, action) => {

  switch (action.type) {
    case INITIALIZE:
      return action.payload.coreInfo

    case UPDATE_CORE_INFO:
      return action.payload

    default:
      return state
  }
}
