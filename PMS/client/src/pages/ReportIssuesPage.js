import React from 'react'
import { Provider } from 'react-redux';
import store from '../store/store'; 
import ReportIssues from '../components/ReportIssues';
export default function ReportIssuesPage() {
  return (
    <Provider store={store}>
    <ReportIssues/>
    </Provider>
  )
}
