import React, {Component} from 'react';
import classes from './ContactForm.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order'
import Input from '../../../components/UI/Input/Input';

class ContactForm extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ''
      },

      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ''
      },

      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your ZipCode'
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        value: ''
      },

      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ''
      },

      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email-id',
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ''
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
        validation: {},
        valid: true,
        touched: false,
        value: 'fastest'
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const formData = {};
    for(let key in this.state.orderForm){
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });


  };

  checkValidity = (inputElement) => {
    if(!inputElement.validation) { //for delivery
      return true;
    }
    if(inputElement.elementConfig.type === 'email'){ // for email
      return inputElement.value.match(inputElement.elementConfig.pattern);
    }

    let isValid = true; // for rest
    if(inputElement.validation.required){
      isValid = inputElement.value.trim() !== '' && isValid;
    }
    if(inputElement.validation.minLength && inputElement.validation.maxLength){ // for zipCode
      isValid = inputElement.value.length >= inputElement.validation.minLength &&
                inputElement.value.length <= inputElement.validation.maxLength && isValid;
    }

    return isValid;


  };

  inputChangeHandler = (event, inputType) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormEle = {...updatedOrderForm[inputType]};
    updatedFormEle.value = event.target.value;
    updatedFormEle.valid = this.checkValidity(updatedFormEle);
    updatedFormEle.touched = true;
    updatedOrderForm[inputType] = updatedFormEle;

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
    console.log(formElementsArray);


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

      if(this.state.loading) {
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

export default ContactForm;