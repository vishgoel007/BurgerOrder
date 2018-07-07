import * as actionTypes from './actionTypes';
import axios from "../../axios-order";

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
};

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }

};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }

};

export const purchaseBurgerProcess = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
          dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
          dispatch(purchaseBurgerFail(error))
        });
    }
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
};

export const fetchOrdersProcess = (token, userId) => {
  return dispatch => {                               // token can also get by using getState here
    dispatch(fetchOrdersStart());
    const queryParms = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json' + queryParms)
        .then(response => {
          const fetchOrders = [];
          for(let key in response.data){
            fetchOrders.push({
              ...response.data[key],
              id: key
            });
          }
          dispatch(fetchOrdersSuccess(fetchOrders));
        })
        .catch(error => {
          dispatch(fetchOrdersFail(error))
        });
  }
};



