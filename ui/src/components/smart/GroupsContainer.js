import React, {useState} from 'react'
import { TabContent, Card} from 'reactstrap'
import {GroupTabs, TabContainer, SelectSemesterModal, AddSemesterModal} from '../dumb'
import { useStateValue } from '../../context'
import { AddClassToPlanned, GetPlannedCourses } from '../../ApiCalls'

export const GroupsContainer = (props) => {
  const [state, dispatch] = useStateValue()
  const [activeTab, setActiveTab] = useState('1')
  const [modal, setModal] = useState(false)
  const [semesterSelected, setSemesterSelected] = useState(`${state.plannedCourses[0].semester} ${state.plannedCourses[0].year}`)
  const [clickCourseId, setClickCourseId] = useState()
  const [addSemesterModal, setAddSemesterModal] = useState(false)
  const [semesterInput, setSemesterInput] = useState('')
  const [yearInput, setYearInput] = useState('')

  const onChangeSemesterInput = (e) => setSemesterInput(e.target.value)
  const onChangeYearInput = (e) => setYearInput(e.target.value)

  const addSemesterModalSwitch = () => {
    modalToggle()
    setAddSemesterModal(!addSemesterModal)
  }

  const addSemesterModalToggle = () => {
    setAddSemesterModal(!addSemesterModal)
  }

  const createSemester = async () => {
    let data = {
      course_id: clickCourseId,
      year: yearInput,
      semester: semesterInput
    }

    await AddClassToPlanned(data, dispatch)
    await GetPlannedCourses(dispatch)
    addSemesterModalToggle()
  }

  const toggle = tab => {
    if(activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const selectOnChange = (e) => {
    setSemesterSelected(e.target.value)
  }

  const modalToggle = () => setModal(!modal)

  const onClassClick = (courseId) => {
    setClickCourseId(courseId)
    setModal(true)
  }

  const onAddCourseToPlanned = async () => {
    let data = {
      course_id: clickCourseId,
      year: semesterSelected.match(/\d+/g).map(Number)[0],
      semester: semesterSelected.replace(semesterSelected.match(/\d+/g).map(Number)[0], '').trim()
    }

    await AddClassToPlanned(data, dispatch)
    await GetPlannedCourses(dispatch)
    modalToggle()
  }


  return (
    <Card className=' m-4 p-4 w-75'>
      <GroupTabs activeTab={activeTab} toggle={toggle} data={state.groupData}/>
      <TabContent activeTab={activeTab}>
        {
          state.groupData.map((group) => {
            return (
              <TabContainer
                key={group.id}
                tabId={group.id.toString()}
                courses={group.course}
                onClick={onClassClick}/>)
          })
        }
      </TabContent>
      <SelectSemesterModal
        modal={modal}
        toggle={modalToggle}
        semesters={state.plannedCourses}
        selectedSemester={semesterSelected}
        setSemesterSelected={selectOnChange}
        onAddCourseToPlanned={onAddCourseToPlanned}
        onSemesterModal={addSemesterModalSwitch}/>
      <AddSemesterModal
        toggle={addSemesterModalToggle}
        modal={addSemesterModal}
        onChangeSemester={onChangeSemesterInput}
        onChangeYear={onChangeYearInput}
        onAdd={createSemester}/>
    </Card>
  )
}