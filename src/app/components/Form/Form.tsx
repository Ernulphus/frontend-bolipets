import { strict } from "assert";
import React from "react";

interface ShortTextQuestionProps {
  question: string,
  fld_name: string,
  defaultText?: string | undefined,
}

function ShortTextQuestion({question, fld_name, defaultText}: ShortTextQuestionProps) {
  console.log('q props', question, fld_name);
  return (
    <div>
      <label htmlFor={fld_name}>{question}</label>
      <input type="text" name={fld_name} />
    </div>
  )
}

interface questionObj {
  fld_nm: string,
  param_type: string,
  question: string,
  choices?: {[key: string]: string},
}

interface FormProps {
  questions: [questionObj] | undefined;
}

export default function Form({ questions }: FormProps) {
  console.log('questions', questions);
  return (
    <form>
      {questions && questions.map((q: questionObj) => {
        return (
          <ShortTextQuestion fld_name={q.fld_nm} question={q.question} key={q.fld_nm} />
        )
      })}
    </form>
  );
}

export type {
  questionObj,
}