import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import moment from "moment";
import DatePicker, { registerLocale } from "react-datepicker";
import Swal from 'sweetalert2'

import { hoursConfig } from '../../../helpers/configBase';
import { uiCloseModal } from '../../../manager/actions/uiActions';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate} from '../../../manager/actions/eventsActions';

import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

export const CalendarModal = () => {

  const { modalOpen } = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);
  const { userId, userName, userEmail } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [cita, setCita] = useState({
    date: new Date(),
    hora: "",
    userId: "",
    userName: "",
    userEmail: "",
    title: "Cita",
  })

  useEffect(() => {
    if(activeEvent){
      setCita(activeEvent)
    } else {
      setCita({
        date: new Date(),
        hora: "",
        userId,
        userName,
        userEmail,
        title: "Cita",
      })
    }
  }, [activeEvent, setCita, userId, userName, userEmail])

  const handleDate=(data, name)=>{
    setCita({
      ...cita,
      [name]: new Date(data)
    })
  }
  
  const handleSelect=({target}, name)=>{
    setCita({...cita, [name]: target?.value})
  }

  //tengo que crear la funcio que elimna las fechas ya tomadas

  const isWeekday = (date) => {
    const day = moment(date).day();
    return day !== 0 && day !== 6;
  };


  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setCita({
      ...cita,
      hora: "",
    })
  }

  const handleCita = (e) => {
    e.preventDefault();
    if(cita?.hora===""){
      return Swal.fire("Error", "Select Hour", "error")
    }
    //console.log(cita);

    const createCita = {
      ...cita,
      start: moment(`${moment(cita?.date).format("YYYY-MM-DD")} ${cita?.hora}:00`).format("YYYY-MM-DD HH:mm:ss"),
      end: moment(`${moment(cita?.date).format("YYYY-MM-DD")} ${cita?.hora}:00`).add(1, "hours").format("YYYY-MM-DD HH:mm:ss"),
      date: moment(cita?.date).format("YYYY-MM-DD HH:mm:ss"),
    }
    if(activeEvent){
      dispatch(eventStartUpdate(createCita))
    } else {
      dispatch(eventStartAddNew(createCita))
    }
    closeModal();

    //Falta el dispatch de creacion de cita
  }
  
  return (
    <Modal
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <h3
          className="text-center mb-3 mt-3"
        > { (activeEvent)?`Edit your time` :`Take your time`} </h3>
        <hr />
        <form className="container" onSubmit={handleCita}>

            <div className="form-group pb-3">
                <DatePicker 
                  selected={new Date(cita?.date)} 
                  onChange={(e)=>handleDate(e, "date")} 
                  //customInput={<CustomInput />}
                  dateFormat="dd/MM/yyyy"
                  startDate={new Date()}
                  minDate={new Date()}
                  filterDate={isWeekday}
                  locale="es"
                  className='form-control'
                />
            </div>

            <div className="form-group pb-2 mb-2">
                <select 
                  onChange={(e)=>handleSelect(e, "hora")}
                  className='form-control'
                >
                  <option 
                    //defaultValue 
                    value={cita?.hora}
                    style={{display:"none"}}
                    placeholder='Select one hour...'
                  >{(cita?.hora)?`${cita?.hora}`:'Select one hour...'}
                  </option>
                  {/* <option 
                    value={"vacio"}
                  >Select one hour...</option> */}
                  {
                    hoursConfig.map((e,i)=><option value={e} key={i}>{e}</option>)
                  }

                </select>
            </div>
            {
              (activeEvent?.id) && (
                <>
                  <div className="form-group">
                        <label>User: {activeEvent?.userName}</label>
                  </div>
                  <div className="form-group">
                        <label>Email: {activeEvent?.userEmail}</label>
                  </div>
                </>
              )
            }

            <button 
                type="submit"
                className="cita-btn-submit form-control mt-5"
            >
                <i className="far fa-save"></i>
                <span> Save </span>
            </button>

        </form>
    </Modal>
  )
}
