import {ACTIONTYPES} from './const'
export const reducer = (state, action) => {
  switch(action.type) {
    case ACTIONTYPES.isAuthenticated:
      return {
        ...state,
        isAuthenticated: action.payload
      }
    case ACTIONTYPES.replaceGroupData:
      return {
        ...state,
        groupData: action.payload
      }
    case ACTIONTYPES.replacePlannedCourses:
      return {
        ...state,
        plannedCourses: action.payload
      }
  }
}