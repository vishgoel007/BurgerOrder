import React, {Component} from 'react';
import classes from './ContactForm.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order'

class ContactForm extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: ''
    },
    loading: false
  };

  orderHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'testName',
        address: {
          street: 'testStreet',
          zipCode: '12345',
          country: 'Germany'
        },
        email: 'test@email.com'
      },
      deliveryMethod: 'standard'
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

  render () {
    console.log('contactForm', this.state.ingredients);

    let form = (<form>
      <input type='text' name='name' placeholder='Your name' />
      <input type='email' name='email' placeholder='Your email' />
      <input type='text' name='street' placeholder='Street' />
      <input type='text' name='zipCode' placeholder='Zip Code' />
      <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
    </form>);

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