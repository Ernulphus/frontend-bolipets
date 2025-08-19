import { strict } from "assert";
import React from "react";

interface QuestionProps {
  question: string,
  fld_name: string,
}

interface ShortTextQuestionProps extends QuestionProps {
  defaultText?: string | undefined,
}

function ShortTextQuestion({question, fld_name, defaultText}: ShortTextQuestionProps) {
  return (
    <div>
      <label htmlFor={fld_name}>{question}</label>
      <input type="text" name={fld_name} />
    </div>
  )
}

interface RadioQuestionProps extends QuestionProps {
  choices: {[key: string]: {[key: string]: string}}
}

function RadioQuestion({question, fld_name, choices}: RadioQuestionProps) {
  return (
    <fieldset>
      <legend>{question}</legend>
      {Object.keys(choices).map((choice_key) => (
        <span>
          <input
            type="radio"
            id={choice_key}
            key={choice_key}
            name={fld_name}
            value={choice_key} 
          />
          <label>
            {choices[choice_key]['description']}
          </label>
        </span>
      ))}
    </fieldset>
  )
}

interface questionObj {
  fld_nm: string,
  param_type: string,
  question: string,
  choices?: {[key: string]: {[key: string]: string}},
}

interface FormProps {
  questions: [questionObj] | undefined;
}

export default function Form({ questions }: FormProps) {
  return (
    <form>
      {questions && questions.map((q: questionObj) => {
        switch (q.param_type) {
          case "radio":
            if (!q.choices) return (<div />);
            return (
              <RadioQuestion
                fld_name={q.fld_nm}
                question={q.question}
                choices={q.choices}
                key={q.fld_nm}
              />
            );
          default: return (
            <ShortTextQuestion
              fld_name={q.fld_nm}
              question={q.question}
              key={q.fld_nm} 
            />
          )
        }
      })}
    </form>
  );
}

export type {
  questionObj,
}