import react,{ FC }  from 'react';

import './message.css';

type propsT = {
    readonly text: string,
    className: string
};
const Message:FC<propsT> = ({ text, className }) => {
    return (
        <div className='error_wrapper'>
            <p className={className}>{text}</p>
        </div>
    );
};
export default Message;