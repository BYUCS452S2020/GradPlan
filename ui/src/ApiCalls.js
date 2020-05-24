
import {ACTIONTYPES} from './const'
import axios from 'axios'

export let client = axios.create()
export const LoginAPI = async (email, password, dispatch) => {
  console.log('Login')
  try {
    let resp = await client.post('http://localhost:8000/student/login', {username: email, password: password})
    console.log(resp.data)
    client.defaults.headers.common['Authorization'] = `token ${resp.data.token}`
    dispatch({type: ACTIONTYPES.isAuthenticated, payload: true})
  } catch (e) {
    console.log(e)
  }

  GetGroupsData(dispatch)
  GetPlannedCourses(dispatch)
}

export const GetGroupsData = async (dispatch) => {
  try {
    let resp = await axios.get('http://localhost:8000/major/d4e83698-a5ce-46c4-9d51-ded5af55c5f1/groups')
    let data = resp.data
    for (let value of data) {
      let respCourses = await axios.get(`http://localhost:8000/group/${value.id}/courses`)
      value['course'] = respCourses.data
    }
    dispatch({type: ACTIONTYPES.replaceGroupData, payload: data})
  } catch (e) {
    console.log(e)
  }
}

export const GetPlannedCourses = async (dispatch) => {
  try {
    let resp = await client.get('http://localhost:8000/student/planned')
    let mymap = new Map();
    let unique = resp.data.filter(el => {
      const val = mymap.get(el.semester); 
      if(val) { 
        if(el.year !== val) {
          mymap.delete(el.semester);
          mymap.set(el.semester, el.year);
          return true;
        } else {
          return false;
        }
      } 
      mymap.set(el.semester, el.year);
      return true;
    });

    let data = []
    for(let sem of unique) {
      let semester = {year: 0, semester: '', courses: []}
      semester.year = sem.year
      semester.semester = sem.semester
      for (let plannedCourse of resp.data) {
        if(plannedCourse.year === sem.year && plannedCourse.semester === sem.semester) {
          semester.courses.push(plannedCourse.course)
        }
      }
      data.push(semester)
    }
    console.log('______________')
    console.log(data)
    dispatch({type: ACTIONTYPES.replacePlannedCourses, payload: data})
  } catch (e) {
    console.log('FAILED')
    console.log(e)
  }
}