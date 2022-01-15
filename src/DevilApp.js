import React from 'react'
import { Provider } from 'react-redux'

import { store } from './manager/store/store'
import {AppRouter} from './router/AppRouter'

export const DevilApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}

