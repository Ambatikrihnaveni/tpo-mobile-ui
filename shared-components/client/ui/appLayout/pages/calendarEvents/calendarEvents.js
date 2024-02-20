import React from 'react'
import useAuth from '../../../hooks/useAuth';
import StudentcalendarEvent from './studentcalendarEvent/studentcalendarEvent';
import TutorCalendarEvents from './tutorCalendarEvents/tutorCalendarEvents'

export default function CalendarEvents() {
  const { viewer } = useAuth()
  return (
    <div>

      {(viewer?.role == "Tutor") ?
        <TutorCalendarEvents /> :
        <StudentcalendarEvent />
      }
    </div>
  )
}
