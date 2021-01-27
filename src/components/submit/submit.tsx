import react,{ FC }  from 'react';

import './submit.css';

type propsT = {
    readonly name: string,
    readonly text: string,
    readonly className: string,
    disabled?: boolean
};
const Submit:FC<propsT> = ({name, text, className, disabled }) => {
    return (
        <button 
            type='submit'
            name={name}
            disabled={disabled}
            className={className}
      >{text}</button>
    );
};
export default Submit;