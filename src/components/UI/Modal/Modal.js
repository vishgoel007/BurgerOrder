import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const modal = (props) => (

    <Aux>
      <Backdrop show={props.show} clicked={props.modalClose} />
      <div
          className={classes.Modal}
          style={{opacity: props.show? '1': '0',
            transform: props.show? 'translateY(0)': 'translateY(-150vh)'}}>
        {props.children}
      </div>
    </Aux>

);

export default modal;