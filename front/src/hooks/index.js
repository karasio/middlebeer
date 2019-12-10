import {useState} from 'react';

/**
 * Custom hook for form handling
 * @param type
 * @returns {{setValue: *, reset: *, object: {onChange: *, type: *, value: *}}}
 */

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        const illegalChar = ['?', '(', ')', '[', ']', '*', '\\'];
        if (illegalChar.some(el => e.target.value.includes(el))){
            //TODO Tänne joku hieno juttu, kun yrittää syöttää virheellisiä merkkejä. virheilmotus tms.
            console.log("JEEEE");
        }else {
            setValue(e.target.value);
        }
    };

    const reset = () => {
        setValue('');
    };

    return {reset, setValue, object: {type, value, onChange}};
};