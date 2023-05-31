import React from 'react'
import FormDisplay from '@/components/FormDisplay'
import { AssessmentData } from './api/assessment/route'

export default async function Assessment () {
  const assessmentReq = await fetch('http://localhost:3000/api/assessment')
  const assessmentData = (await assessmentReq.json()) as AssessmentData

  return (
      <div className='bg-base-100 shadow-xl grid place-content-center h-full'>
       {assessmentData && <FormDisplay data={assessmentData} />}
      </div>
  )
}
