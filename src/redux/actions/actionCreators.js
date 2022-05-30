import {
  INITIALIZE,
  UPDATE_CORE_INFO,
  UPDATE_THEME,
  UPDATE_USER_STATUS,
  SHOW_CONNECTIONS,
  HIDE_CONNECTIONS,
  UPDATE_INPUT,
} from './types'

export const initialize = data => ({
  type: INITIALIZE,
  payload: data,
})

export const updateCoreInfo = coreInfo => ({
  type: UPDATE_CORE_INFO,
  payload: coreInfo,
})

export const updateTheme = theme => ({
  type: UPDATE_THEME,
  payload: theme,
})

export const updateUserStatus = userStatus => ({
  type: UPDATE_USER_STATUS,
  payload: userStatus,
})

export const showConnections = () => ({
  type: SHOW_CONNECTIONS,
})

export const hideConnections = () => ({
  type: HIDE_CONNECTIONS,
})

export const updateInput = inputValue => ({
  type: UPDATE_INPUT,
  payload: inputValue,
})
