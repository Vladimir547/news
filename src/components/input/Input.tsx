import react,{ FC }  from 'react';

import './input.css';

type propsT = {
    readonly type: string,
    readonly name: string,
    readonly placeholder: string,
    readonly className: string,
    readonly value: string
    change?: any;
};
const Input:FC<propsT> = ({type, name, placeholder, className, value, change }) => {
    return (
        <input 
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={(e) => change(e)}
        autoComplete="off"
        required
      />
    );
};
export default Input;