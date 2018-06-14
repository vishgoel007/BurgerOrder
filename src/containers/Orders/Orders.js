import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount () {
    axios.get('/orders.json')
        .then(response => {
          const fetchOrders = [];
          for(let key in response.data){
            fetchOrders.push({
                ...response.data[key],
                id: key
            });
          }

          this.setState({orders: fetchOrders, loading: false});
        })
        .catch(error => {
          console.log(error);
          this.setState({loading: false});

        })

  }

  render () {

    let order = <Spinner/>;
    if(this.state.orders.length !== 0){
      order = this.state.orders.map(order => {
        return <Order key={order.id}
                      ingredients={order.ingredients}
                      price={order.price}/>
      });
      console.log(this.state.orders);
    }



    return (
        <div style={{paddingTop: '10px'}}>
          {order}
        </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
