import React, {useState} from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import {GroupTabs} from './GroupTabs'
import { TabContainer } from './TabContainer'

// Testing Purposes
import data from '../../groupsData'


export const GroupsContainer = (props) => {

  const [activeTab, setActiveTab] = useState('1')
  const toggle = tab => {
    if(activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  return (
    <Card className=' m-4 p-4 w-75'>
      <GroupTabs activeTab={activeTab} toggle={toggle} data={data}/>
      <TabContent activeTab={activeTab}>
        {
          data.CourseGroups.map((group) => {
            return (
              <TabContainer
                key={group.id}
                tabId={group.id.toString()}
                courses={group.course}/>)
          })
        }
      </TabContent>
    </Card>
  )
}