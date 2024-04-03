import React from 'react'
import { Provider } from 'react-redux';
import store from '../store/store'; 
import ProfileCustomerComp from '../components/ProfileCustomerComp';
export default function ProfileCustomerPage() {
  return (
    <Provider store={store}>
    <ProfileCustomerComp/>
</Provider>
  )
}