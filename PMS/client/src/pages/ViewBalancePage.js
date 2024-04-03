import React from 'react'
import { Provider } from 'react-redux';
import store from '../store/store'; 
import ViewBalance from '../components/ViewBalance';

export default function ViewBalancePage() {
  return (
    <Provider store={store}>
    <ViewBalance/>
</Provider>
  )
}
