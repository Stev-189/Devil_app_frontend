import { fetchConToken } from "../../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { calendatFormat } from "../../helpers/calendarFormat";

export const eventStartAddNew = (e) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`cita`, e, "POST");
            const body = await resp.json();
            if (body?.result) {
                dispatch(eventAddNew({
                    ...e,
                    id: body?.data?.id,
                    start:new Date(body?.data?.start),
                    end:new Date(body?.data?.end),
                }));
            } else{
                throw new Error(body?.msg);
            }
            
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({type: types.eventClearActiveEvent})

export const eventStartUpdate = (e) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`cita/${e?.id}`, e, "PUT");
            const body = await resp.json();
            if (body?.result) {
                dispatch(eventUpdated({
                    ...e,
                    start:new Date(body?.data?.start),
                    end:new Date(body?.data?.end),
                }));
            } else{
                throw new Error(body?.msg);
            }
        } catch (error) {
            Swal.fire("Error", error?.message, "error");
        }
    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => {
    return async (dispatch, getState) => {
        const {id}= getState()?.calendar?.activeEvent;
        try {
            const resp = await fetchConToken(`cita/${id}`, {}, "DELETE");
            const body = await resp.json();
            if (body?.result) {
                dispatch(eventDeleted());
            } else{
                throw new Error(body?.msg);
            }
        } catch (error) {
            Swal.fire("Error", error?.message, "error");
        }
    }
}

const eventDeleted = () => ({type: types.eventDeleted})

export const eventClear=()=>({type: types.eventClear})

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`cita`);
            const body = await resp.json();
            if (body?.result) {
                dispatch(eventLoaded(calendatFormat(body?.data)));
            } else{
                throw new Error(body?.msg);
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    }
}


const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})