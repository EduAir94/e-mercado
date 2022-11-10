import Alert from 'react-bootstrap/Alert';

function AlertBootstrap({ show, text, type }: { show: boolean; text: string; type: string }) {
  return (
    <Alert show={show} variant={type}>
      <p className="my-2">{text}</p>
    </Alert>
  );
}

export default AlertBootstrap;
