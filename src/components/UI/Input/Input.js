import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputEle = null;
  let inputClasses = [classes.InputElement];
  let icon = null;

  if(props.inValid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    icon = <i className={['fas fa-exclamation-circle' , classes.Icon ].join(' ')}/>;
  }
  switch (props.elementType) {
    case ('input'):
      inputEle = <input className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}/>;
      break;

    case ('textarea'):
      inputEle = <textarea className={inputClasses.join(' ')}
                           {...props.elementConfig}
                           value={props.value}
                           onChange={props.changed}/>;
      break;

    case ('select'):
      inputEle = (
          <select className={inputClasses.join(' ')}
                  onChange={props.changed}>
            {props.elementConfig.options.map(option => (
                <option key={option.value}
                        value={option.value}>{option.displayValue} </option>
            ))}
          </select>
      );
      break;
    default:
      inputEle = <input className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}/>;

  }

  return (
      <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {icon}
        {inputEle}
      </div>

  );

};

export default input;