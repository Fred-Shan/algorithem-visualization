import React from 'react';

import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    switch (props.type) {
        case "input":
            inputElement = <input />;
            break;
        default: 
            inputElement = <input />;
    }
    return (
        <div>
            <span>{props.label}</span>
            {inputElement}
        </div>
    )
}