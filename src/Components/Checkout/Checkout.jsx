import React from 'react';
import './Checkout.css';
import { CardElement } from '@stripe/react-stripe-js';

const Checkout = () => {

  return (
    <div className='checkout'>
      <CardElement className='card' />
    </div>
  )
}

export default Checkout
