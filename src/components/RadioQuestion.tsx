import React from 'react'

interface RadioQuestionProps {
    questionData: {prompt: string, value: null| number, question_id: string};
  options: { title: string; value: number }[];
  updateResponses: (value: number, question_id: string) => void;

}
export default function RadioQuestion ({
  questionData,
  options,
  updateResponses
}: RadioQuestionProps) {
  return (
    <fieldset className="form-control">
      <legend>{questionData.prompt}</legend>

      {options.map((option) => (
        <div key={option.title}>
          <label className="label cursor-pointer">
            <span className="label-text">{option.title}</span>
            <input
              type="radio"
              name="current-language"
              id={questionData.question_id}
              value={option.value}
              className="radio radio-primary"
              checked={option.value === questionData.value}
              onChange={(event) => {
                updateResponses(Number(event.target.value), questionData.question_id)
              }}
            />
          </label>
        </div>
      ))}
    </fieldset>
  )
}
