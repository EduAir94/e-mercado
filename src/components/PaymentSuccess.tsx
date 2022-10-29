import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function PaymentSuccess({ show }: { show: boolean }) {
  return (
    <Alert show={show} className="payment_success_alert" variant="success">
      <p className="my-2">¡Has Comprado con éxito!</p>
    </Alert>
  );
}

export default PaymentSuccess;
