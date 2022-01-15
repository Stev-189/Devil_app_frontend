import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import {CalendarScreen} from '../components/layout/calendar/CalendarScreen'
import {LoginScreen} from '../components/layout/auth/LoginScreen'

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={ LoginScreen } />
                    <Route exact path="/" component={ CalendarScreen } />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}


