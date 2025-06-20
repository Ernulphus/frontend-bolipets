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

export default function Form() {
  return (
    <form>
      
    </form>
  );
}