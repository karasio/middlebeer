import {useState} from 'react';

/**
 * Custom hook for form handling
 * @param type
 * @returns {{setValue: *, reset: *, object: {onChange: *, type: *, value: *}}}
 */

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