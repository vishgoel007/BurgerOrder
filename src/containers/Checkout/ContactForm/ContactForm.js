import React, {Component} from 'react';
import classes from './ContactForm.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order'
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {updateObject, checkValidity} from "../../../shared/utility";

class ContactForm extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your ZipCode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true
        },
        valid: false,
        touched: false,
      },

      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email-id',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },

      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value:'fastest', displayValue:'Fastest'},
            {value:'standard', displayValue:'Standard'},
            {value:'cheapest', displayValue:'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true,
        touched: false
      }
    },
    formIsValid: false
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for(let key in this.state.orderForm){
      formData[key] = this.state.orderForm[key].value;
    }

    const orderData = {
      ingredients: this.props.ingreds,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };
    this.props.onBurgerOrder(orderData, this.props.token);

  };

  inputChangeHandler = (event, inputType) => {
    const updatedFormEle = updateObject(this.state.orderForm[inputType], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[inputType].validation),
      touched: true
    });
    const updatedOrderForm = updateObject(this.state.orderForm, { [inputType]: updatedFormEle });

    let formIsValid = true;
    for(let input in updatedOrderForm){
      formIsValid = updatedOrderForm[input].valid && formIsValid;
    }

    this.setState({orderForm:updatedOrderForm, formIsValid: formIsValid});
  };

  render () {

    let formElementsArray = [];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }


    let form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formEle => (
              <Input key={formEle.id}
                     elementType={formEle.config.elementType}
                     elementConfig={formEle.config.elementConfig}
                     value={formEle.config.value}
                     changed={(event)=>this.inputChangeHandler(event, formEle.id)}
                     inValid={!formEle.config.valid}
                     shouldValidate={formEle.config.validation}
                     touched={formEle.config.touched}/>
          ))}
          <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
        </form>
    );

      if(this.props.loading) {
        form = <Spinner/>
      }

    return (
      <div className={classes.ContactForm}>
        <h2>Enter your Contact Details</h2>
        {form}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    ingreds: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerOrder: (orderData, token) => dispatch(actions.purchaseBurgerProcess(orderData, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactForm, axios));