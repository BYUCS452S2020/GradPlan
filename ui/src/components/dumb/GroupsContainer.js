import React, {useState, useEffect} from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import {GroupTabs} from './GroupTabs'
import { TabContainer } from './TabContainer'
import {GetGroupsData} from '../../ApiCalls'
import { useStateValue } from '../../context'


export const GroupsContainer = (props) => {
  const [state, dispatch] = useStateValue()
  const [activeTab, setActiveTab] = useState()

  const toggle = tab => {
    if(activeTab !== tab) {
      setActiveTab(tab)
    }
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
                courses={group.course}/>)
          })
        }
      </TabContent>
    </Card>
  )
}