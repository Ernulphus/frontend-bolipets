import { StaticImageData } from "next/image";
import React, { useState, Dispatch } from "react";

import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert"

import styles from './Form.module.css';

interface QuestionProps {
  question: string,
  fld_name: string,
  images: {[key: string]: StaticImageData};
  setForm: Dispatch<[questionObj] | undefined>;

}

interface ShortTextQuestionProps extends QuestionProps {
  defaultText?: string | undefined,
}

function ShortTextQuestion({question, fld_name, defaultText}: ShortTextQuestionProps) {
  return (
    <div>
      <label htmlFor={fld_name}>{question}</label>
      <input type="text" name={fld_name} value={defaultText} />
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

// interface ColorWheelProps extends QuestionProps {

// }

function ColorWheelQuestion({ question, fld_name, images, setForm }: QuestionProps) {
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });

  return (
    <fieldset className={styles.color_wheel}>
      <label htmlFor={fld_name}>{question}</label>
      <Wheel color={hsva} onChange={(color) => setHsva({ ...hsva, ...color.hsva })} />
      <input
        type="text"
        id={fld_name}
        name={fld_name}
        readOnly
        value={hsvaToHex(hsva)}
        style={{borderColor: hsvaToHex(hsva)}}
      />
    </fieldset>
  );
}

interface questionObj {
  fld_nm: string,
  param_type: string,
  question: string,
  choices?: {[key: string]: {[key: string]: string}},
  value: string | undefined,
}

interface FormProps {
  questions: [questionObj] | undefined;
  onSubmit: (formData: FormData) => void;
  images: {[key: string]: {[key: string]: StaticImageData}};
  setForm: Dispatch<[questionObj] | undefined>;
}

export default function Form({ questions, onSubmit, images, setForm }: FormProps) {

  return (
    <form className={styles.form}>
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
                setForm={setForm}
              />
            );
          case "color_wheel":
            return (
              <ColorWheelQuestion
                fld_name={q.fld_nm}
                question={q.question}
                key={q.fld_nm}
                images={images[q.fld_nm]}
                setForm={setForm}
              />
            )
          default: return (
            <ShortTextQuestion
              fld_name={q.fld_nm}
              question={q.question}
              key={q.fld_nm}
              images={images[q.fld_nm]}
              setForm={setForm}

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