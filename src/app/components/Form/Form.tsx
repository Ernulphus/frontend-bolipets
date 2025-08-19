import { strict } from "assert";
import { StaticImageData } from "next/image";
import React from "react";
import styles from './Form.module.css';

interface QuestionProps {
  question: string,
  fld_name: string,
  images: {[key: string]: StaticImageData};
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

function RadioQuestion({question, fld_name, images, choices}: RadioQuestionProps) {
  return (
    <fieldset className={styles.radio_question}>
      <legend>{question}</legend>
      {Object.keys(choices).map((choice_key) => (
        <span
          className="flex flex-row items-center mt-5"
          key={choice_key}
        >
          <input
            type="radio"
            id={choice_key}
            name={fld_name}
            value={choice_key} 
          />
          <label htmlFor={choice_key}>
            {choices[choice_key]['description']}
            {images && choice_key in images && (
              <img alt={choice_key} src={images[choice_key].src} />
            )}
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
  onSubmit: (formData: FormData) => void;
  images: {[key: string]: {[key: string]: StaticImageData}};
}

export default function Form({ questions, onSubmit, images }: FormProps) {

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
                images={images[q.fld_nm]}
              />
            );
          default: return (
            <ShortTextQuestion
              fld_name={q.fld_nm}
              question={q.question}
              key={q.fld_nm}
              // images={images[q.fld_nm]}
            />
          )
        }
      })}
      <input
        type="submit"
        formAction={onSubmit}
      />
    </form>
  );
}

export type {
  questionObj,
}