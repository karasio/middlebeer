import {useState} from 'react';

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const reset = () => {
        setValue('');
    };

    return {reset, setValue, object: {type, value, onChange}};
};