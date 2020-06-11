
import {ACTIONTYPES} from './const'
import axios from 'axios'

export let client = axios.create()
// TODO: Change BaseURL depending on if it is in DEVELOPMENT or PRODUCTION
export const LoginAPI = async (email, password, dispatch) => {
  try {
    let resp = await client.post('http://localhost:8000/student/login', {username: email, password: password})
    client.defaults.headers.common['Authorization'] = `token ${resp.data.token}`
    await dispatch({type: ACTIONTYPES.isAuthenticated, payload: true})

  } catch (e) {
    console.log(e)
  }
}

export const RegisterAPI = async (email, password, name, dispatch) => {
  try {
    let resp = await client.post('http://localhost:8000/student/register', {
      email: email,
      password: password,
      first_name: name.first_name,
      last_name: name.last_name})
    client.defaults.headers.common['Authorization'] = `token ${resp.data.token}`
    await dispatch({type: ACTIONTYPES.isAuthenticated, payload: true})
  } catch (e) {
    console.log(e)
  }
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

export const AddClassToPlanned = async (data) => {
  try {
    let resp = await client.post('http://localhost:8000/student/planned', data)
  } catch (e) {
    console.log('FAILED TO CREATE PLANNED COURSE')
    console.log(e)
  }

}

export const GetPlannedCourses = async (dispatch, setSemesterSelected) => {
  try {
    let resp = await client.get('http://localhost:8000/student/planned')
    console.log(resp.data)
    let data = resp.data
    // let mymap = new Map();
    // let unique = resp.data.filter(el => {
    //   const val = mymap.get(el.semester);
    //   if(val) {
    //     if(el.year !== val) {
    //       mymap.delete(el.semester);
    //       mymap.set(el.semester, el.year);
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    //   mymap.set(el.semester, el.year);
    //   return true;
    // });

    // let data = []
    // for(let sem of unique) {
    //   let semester = {year: 0, semester: '', courses: []}
    //   semester.year = sem.year
    //   semester.semester = sem.semester
    //   for (let plannedCourse of resp.data) {
    //     if(plannedCourse.year === sem.year && plannedCourse.semester === sem.semester) {
    //       semester.courses.push(plannedCourse.course)
    //     }
    //   }
    //   data.push(semester)
    // }
    let initSemester = data.length > 0 ? data[0].semester : ''
    if (setSemesterSelected !== undefined) {
      setSemesterSelected(initSemester)
    }

    dispatch({type: ACTIONTYPES.replacePlannedCourses, payload: data})
  } catch (e) {
    console.log('FAILED')
    console.log(e)
  }
}

export const DeletePlannedCourses = async (courseID) => {
  try {
    let resp = await client.delete(`http://localhost:8000/student/planned/` + courseID)
    return resp.status
  } catch (e) {
    console.log('FAILED DELETEING PLANNED COURSE')
    console.log(e)
  }
}