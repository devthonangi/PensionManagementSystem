import React from 'react'
import RequestWithdrawal from '../components/RequestWithdrawal'
import { Provider } from 'react-redux';
import store from '../store/store'; 
export default function RequestWithdrawalPage() {
  return (
    <Provider store={store}>
    <RequestWithdrawal/>
</Provider>
  )
}
