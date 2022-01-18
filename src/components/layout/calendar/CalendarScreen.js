import React, { useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import Navbar from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent'
import { calendarToEs } from '../../../helpers/calendarToEs'
import { CalendarModal } from './CalendarModal'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { uiOpenModal } from '../../../manager/actions/uiActions'
import { eventClearActiveEvent, eventSetActive } from '../../../manager/actions/eventsActions'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'
moment.locale('es')

const localizer = momentLocalizer(moment)

/* const events =[{
    id: 1,
    title: 'Cita',
    start: moment().toDate(),
    end: moment().add(1, 'hours').toDate(),
    bgcolor: '#8B0000',
    userId: "",
    userName: "stev",
    userEmail: "",
    hora: "",
    date: "",
}]
 */
export const CalendarScreen = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const onDobleClick = (event) => {
        //console.log(event)
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (event) => {
        dispatch(eventSetActive(event));
    }
    
    const onViewChange = (view) => {
        setLastView(view)
        localStorage.setItem('lastView', view)
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: event?.bgcolor,
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }

    const onSelectSlot=(e)=>{
        dispatch(eventClearActiveEvent())
    }

    return (
        <div className='calendar-screen'>
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={calendarToEs}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDobleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={ onSelectSlot}
                selectable={true}
                defaultView={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            { activeEvent&&<DeleteEventFab />}
            <CalendarModal />
        </div>
    )
}

