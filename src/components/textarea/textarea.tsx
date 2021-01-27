import react,{ FC }  from 'react';

//import './input.css';

type propsT = {
    readonly placeholder: string,
    readonly className: string,
    readonly value: string
    change?: any;
};
const Textarea:FC<propsT> = ({  placeholder, className, value, change }) => {
    return (
        <textarea placeholder={placeholder} className={className} onChange={(e) => change(e)} value={value}></textarea>

    );
};
export default Textarea;