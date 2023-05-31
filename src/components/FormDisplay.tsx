/* eslint-disable camelcase */
'use client'

import React, { useState } from 'react'
import RadioQuestion from '@/components/RadioQuestion'
import { AssessmentData } from '@/app/api/assessment/route'
interface FormDisplayProps {
  data: AssessmentData;
}
interface FormResults {
  results: string[];
}

export default function FormDisplay ({
  data: assessmentData
}: FormDisplayProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [sectionNumber] = useState(1)
  const section = assessmentData.content.sections[sectionNumber - 1]
  const radioOptions = assessmentData.content.sections[0].answers
  const [formResults, setFormResults] = useState<FormResults | null>(null)
  interface QuestionResponse {
    value: number | null;
    question_id: string;
    prompt: string;
  }
  // keep track of question responses & init with null responses
  const [responses, setResponses] = useState<QuestionResponse[]>(
    section.questions.map((question) => ({
      value: null,
      prompt: question.title,
      question_id: question.question_id
    }))
  )

  function previousQuestion () {
    setQuestionNumber(questionNumber - 1)
    setFormResults(null)
  }
  function nextQuestion () {
    if (questionNumber === section.questions.length) {
      return
    }
    setQuestionNumber(questionNumber + 1)
  }
  const VERCEL_URL = '/blueprint-swart.vercel.app'
  function getBaseUrl () {
    if (typeof window !== 'undefined') return '' // browser should use relative url
    // if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
    // if not in dev move use vercel url
    if (process.env.NODE_ENV !== 'development') return `https://${VERCEL_URL}` // SSR should use vercel url
    return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
  }
  async function submitForm (data: QuestionResponse[]) {
    setIsSubmitting(true)
    const formRequest = await fetch(`${getBaseUrl()}/api/assessment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answers: data
      })
    })
    // log body's ReadableStream
    const formResult = await formRequest.json()
    setFormResults(formResult)
    console.log('formResult:', formResult)
    setIsSubmitting(false)
  }

  const missingResponses = responses.some(
    (response) => response.value === null
  )

  function updateResponses (value: number, question_id: string) {
    // update responses with new responseObject
    // if response object exists update it
    // if it doesn't exist create a new one

    const newResponses = [...responses]
    const index = newResponses.findIndex(
      (response) => response.question_id === question_id
    )
    newResponses[index] = { ...newResponses[index], value, question_id }
    setResponses(newResponses)
    setTimeout(() => {
      nextQuestion()
    }, 350)
  }
  const percentageComplete = (questionNumber / section.questions.length) * 100
  return (
    <div>
      <form
        className="prose px-10 py-6 card w-96 bg-base-100 shadow-xl"
       >
        <h3>{section.title}</h3>

        <div className="flex flex-col">
          <h3>
            Question {questionNumber} of {section.questions.length}
          </h3>
          <progress
            className="progress progress-primary "
            value={percentageComplete}
            max="100"
          />

          <RadioQuestion
            key={questionNumber}
            options={radioOptions}
            questionData={responses[questionNumber - 1]}
            updateResponses={updateResponses}
          />
        </div>
        <div className='flex justify-between pt-2'>
          <button
            type="button"
            disabled={questionNumber <= 1}
            onClick={previousQuestion}
            className="btn btn-primary">
            Back
          </button>

          {questionNumber === section.questions.length &&
            (
            <button
              disabled={isSubmitting || missingResponses}
              onClick={() => submitForm(responses)}
              type="button"
              className="btn btn-success">
              Submit
            </button>
            )
            }
        </div>
      </form>

      {formResults && (
        <div className="prose flex flex-col text-red-600">
          <p>Open the console to see results</p>
        </div>
      )}
    </div>
  )
}
