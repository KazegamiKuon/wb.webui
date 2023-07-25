import { createLogger } from "redux-logger";

// /**
//  * Logs all actions and states after they are dispatched.
//  */
// const logger = store => next => action => {
//   console.group(action.type)
//   console.info('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   console.groupEnd()
//   return result
// }

const logger = createLogger({});
export default logger;
