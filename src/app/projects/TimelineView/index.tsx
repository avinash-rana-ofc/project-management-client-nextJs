import React from 'react'

type Props = {
  id : string,
  setIsModalNewTaskOpen : (isOpen : boolean) => void;
}

type TaskTypeItems = "task" | "milestone" | "project";

const TimelineView = ({id, setIsModalNewTaskOpen}: Props) => {
  return (
    <div>TimelineView</div>
  )
}

export default TimelineView