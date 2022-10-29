import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PaymentMethod({
  validate,
  setValid,
  valid,
}: {
  validate: boolean;
  setValid: any;
  valid: any;
}) {
  const [show, setShow] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [form, setForm] = useState({
    card_number: '',
    cvv: '',
    expiration: '',
    account_number: '',
  });

  const handleClose = () => {
    const form = document.getElementById('form_payment_method');
    if (form) {
      const isValid = (form as any).checkValidity();
      setValid(isValid);
    }
    setShow(false);
  };
  const handleShow = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setShow(true);
  };

  const paymentMethodNames: any = {
    bank_transfer: 'Transferencia Bancaria',
    credit_card: 'Tarjeta de crédito',
  };

  return (
    <>
      <div id="payment_method_top">
        <p className="mt-3 d-flex">
          {paymentMethod ? paymentMethodNames[paymentMethod] : ' No ha seleccionado'}{' '}
          <a className="d-block ms-4" href="#" onClick={(e) => handleShow(e)}>
            Seleccionar
          </a>
        </p>
        <div className={'invalid-feedback mb-3' + (validate && !valid ? ' d-block' : '')}>
          Debe seleccionar una forma de pago
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forma de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="form_payment_method"
            noValidate
            className={'needs-validation' + (validate ? ' was-validated' : '')}
          >
            <div className="px-3">
              <div>
                <Form.Check
                  required
                  checked={paymentMethod === 'credit_card'}
                  name="payment_method"
                  type="radio"
                  onChange={(c) => setPaymentMethod(c.target.value)}
                  label="Tarjeta de Crédito"
                  value="credit_card"
                  id="credit_card"
                />
                <hr />
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="card_number">
                      <Form.Label className="mb-1">Número de tarjeta</Form.Label>
                      <Form.Control
                        required={paymentMethod === 'credit_card'}
                        disabled={paymentMethod !== 'credit_card'}
                        name="card_number"
                        type="number"
                        defaultValue={form.card_number}
                        onChange={(c) => setForm({ ...form, card_number: c.target.value })}
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} lg={4}>
                    <Form.Group className="mb-3" controlId="cvv">
                      <Form.Label className="mb-1">Código de seg.</Form.Label>
                      <Form.Control
                        required={paymentMethod === 'credit_card'}
                        disabled={paymentMethod !== 'credit_card'}
                        name="cvv"
                        defaultValue={form.cvv}
                        onChange={(c) => setForm({ ...form, cvv: c.target.value })}
                        type="number"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} lg={6}>
                    <Form.Group className="mb-3" controlId="expiration">
                      <Form.Label className="mb-1">Vencimiento (MM/AA)</Form.Label>
                      <Form.Control
                        required={paymentMethod === 'credit_card'}
                        disabled={paymentMethod !== 'credit_card'}
                        name="expiration"
                        type="text"
                        placeholder=""
                        defaultValue={form.expiration}
                        onChange={(c) => setForm({ ...form, expiration: c.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <div>
                <Form.Check
                  required
                  name="payment_method"
                  type="radio"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={(c) => setPaymentMethod(c.target.value)}
                  label="Transferencia Bancaria"
                  value="bank_transfer"
                  id="bank_transfer"
                />
                <hr />
                <Row>
                  <Col xs={12} lg={6}>
                    <Form.Group className="mb-3" controlId="expiration">
                      <Form.Label className="mb-1">Número de cuenta</Form.Label>
                      <Form.Control
                        required={paymentMethod === 'bank_transfer'}
                        disabled={paymentMethod !== 'bank_transfer'}
                        name="account_number"
                        type="text"
                        placeholder=""
                        defaultValue={form.account_number}
                        onChange={(c) => setForm({ ...form, account_number: c.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PaymentMethod;
