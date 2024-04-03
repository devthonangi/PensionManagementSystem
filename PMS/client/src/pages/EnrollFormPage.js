import React from 'react'
import { Provider } from 'react-redux'
import EnrollForm from '../components/EnrollForm'
import store from '../store/store'; 
export default function EnrollFormPage() {
  return (
    <Provider  store={store}>
        <EnrollForm/>
    </Provider>
  )
}
