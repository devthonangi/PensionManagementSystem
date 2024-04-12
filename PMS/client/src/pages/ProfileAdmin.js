import React from 'react'
import { Provider } from 'react-redux';
import store from '../store/store'; 
import ProfileAdminComp from '../components/ProfileAdminComp';
export default function ProfileAdminPage() {
  return (
    <Provider store={store}>
    <ProfileAdminComp/>
</Provider>
  )
}