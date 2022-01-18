import React, {useEffect} from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {CalendarScreen} from '../components/layout/calendar/CalendarScreen'
import {LoginScreen} from '../components/layout/auth/LoginScreen'
import { startCheking } from '../manager/actions/authActions'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {
    const dispatch = useDispatch()
    const {cheking, userId} = useSelector(state => state.auth)

    useEffect(() => {
       dispatch(startCheking())
    }, [dispatch])

    if(cheking){
        return (<div>Loading...</div>)
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact path="/login" 
                        component={ LoginScreen } 
                        isAuthenticated={!!userId}
                        />
                    <PrivateRoute 
                        exact path="/" 
                        component={ CalendarScreen } 
                        isAuthenticated={!!userId}
                        />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}


