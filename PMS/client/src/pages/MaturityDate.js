import React from 'react'
import { Provider } from 'react-redux';
import store from '../store/store'; 
import MaturityDateComp from '../components/MaturityDateComp';
export default function MaturityDate() {
  return (
    <Provider store={store}>
        <MaturityDateComp/>
        </Provider>
  )
}
