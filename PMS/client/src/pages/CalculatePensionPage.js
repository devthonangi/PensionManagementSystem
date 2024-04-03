import React from 'react'
import CalculatePension from '../components/CalculatePension'
import store from '../store/store'; 
import { Provider } from 'react-redux';
export default function CalculatePensionPage() {
  return (
    <Provider store={store}><CalculatePension/></Provider>
  )
}
