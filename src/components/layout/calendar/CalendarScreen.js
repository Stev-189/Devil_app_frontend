import React, { useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import Navbar from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent'
import { calendarToEs } from '../../../helpers/calendarToEs'
import { CalendarModal } from './CalendarModal'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { uiOpenModal } from '../../../manager/actions/uiActions'
moment.locale('es')

const localizer = momentLocalizer(moment)

const events =[{
    title: 'Cita',
    start: moment().toDate(),
    end: moment().add(1, 'hours').toDate(),
    bgcolor: '#8B0000',
    hora: "",
    usuarioId: "",
    usuarioNombre: "",
    usuarioEmail: "",
    hora: "",
    date: "",
}]

export const CalendarScreen = () => {

    const dispatch = useDispatch()

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const onDobleClick = (event) => {
        //console.log(event)
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (event) => {
        console.log(event)
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
                defaultView={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <CalendarModal />
        </div>
    )
}

