import React from 'react'
import FormDisplay from '@/components/FormDisplay'
import { AssessmentData } from './api/assessment/route'
const VERCEL_URL = '/blueprint-swart.vercel.app'
function getBaseUrl () {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  // if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  // if not in dev move use vercel url
  if (process.env.NODE_ENV !== 'development') return `https://${VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}
export default async function Assessment () {
  const assessmentReq = await fetch(`${getBaseUrl()}/api/assessment`)
  const assessmentData = (await assessmentReq.json()) as AssessmentData

  return (
      <div className='bg-base-100 shadow-xl grid place-content-center h-full'>
       {assessmentData && <FormDisplay data={assessmentData} />}
      </div>
  )
}
