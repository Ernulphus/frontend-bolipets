import { strict } from "assert";
import React from "react";

function shortTextQuestion(
  name='text',
  label='text_question',
) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} />
    </div>
  )
}

interface questionObj {
  fld_nm: string,
  param_type: string,
  question: string,
  choices?: {[key: string]: string},
}

export default function Form(
  questions: [questionObj],
) {
  return (
    <form>
      {questions.map && questions.map((question: questionObj) => {
        const q = question;
        return (
          <shortTextQuestion name={question.fld_nm} label={question.question}/>
        )
      })}
    </form>
  );
}