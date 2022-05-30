import App from './App'
import configureStore from 'redux/configureStore'
import {
  initialize,
  updateCoreInfo,
  updateTheme,
  updateUserStatus
} from 'redux/actions/actionCreators'
import 'styles/index.global.scss'
import './styles/variables.scss'

const store = configureStore()

const {
  libraries: {
    React,
    ReactDOM,
    ReactRedux: { Provider },
  },
  utilities: { onceInitialize, onCoreInfoUpdated, onThemeUpdated, onUserStatusUpdated },
} = NEXUS

onceInitialize(data => {
  store.dispatch(initialize(data))
})

onCoreInfoUpdated(coreInfo => {
  store.dispatch(updateCoreInfo(coreInfo))
})

onThemeUpdated(theme => {
  store.dispatch(updateTheme(theme))
})

onUserStatusUpdated(userStatus => {
  //if null == not logged in
  store.dispatch(updateUserStatus(userStatus))
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
