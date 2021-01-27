import react,{ FC }  from 'react';

import './Button.css';

type propsT = {
    readonly title: string
    click?: () => void;
};
const Button = (props: propsT) => {
    return (
        <button className='btn-auth' onClick={props.click}>{props?.title}</button>
    );
};
export default Button;