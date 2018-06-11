import React, {Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  };
  componentWillUpdate() {
    console.log("Modal is updated");
  }

  render() {
    return(
        <Aux>
          <Backdrop show={this.props.show} clicked={this.props.modalClose} />
          <div
              className={classes.Modal}
              style={{opacity: this.props.show? '1': '0',
                transform: this.props.show? 'translateY(0)': 'translateY(-150vh)'}}>
            {this.props.children}
          </div>
        </Aux>
    );
  };

}

export default Modal;