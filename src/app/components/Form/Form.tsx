import { strict } from "assert";
import React from "react";

function ShortTextQuestion(props: any) {
  console.log(props);
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" name={props.name} />
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
  questions: any,
) {
  console.log('questions', questions);
  return (
    <form>
      {questions.map && questions.map((q: questionObj) => {
        return (
          <ShortTextQuestion props={q} />
        )
      })}
    </form>
  );
}

export type {
  questionObj,
}