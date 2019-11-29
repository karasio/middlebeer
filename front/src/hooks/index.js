import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return { reset, object: { type, value, onChange } };
};