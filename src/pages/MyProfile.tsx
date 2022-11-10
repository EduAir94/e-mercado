import { useState } from 'react';
import { Form, Row, Col, ListGroup, Button } from 'react-bootstrap';
import AuthService, { User } from '../services/authService';
import AlertBootstrap from '../components/AlertBootstrap';
import { ImageUpload } from '../components/ImageUpload';

function MyProfile() {
  const [user, setUser] = useState<User>(AuthService.user());
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('FORM SUBMIT');
    const form = e.target as HTMLFormElement;
    e.preventDefault();
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
      e.stopPropagation();
      return;
    }
    const values = new FormData(form);
    const data = {
      first_name: values.get('first_name') as string,
      second_name: values.get('second_name') as string,
      first_surname: values.get('first_surname') as string,
      second_surname: values.get('second_surname') as string,
      profile_image: values.get('profile_image') as string,
      email: values.get('email') as string,
      phone: values.get('phone') as string,
    };
    AuthService.saveProfile(data);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  // Usar cloudinary para subir la imagen.
  return (
    <main className="pb-5">
      <div className="container">
        <div className="text-center p-4">
          <Row>
            <Col xs={12} lg={6}>
              <h2 className="text-start mb-4">Perfil</h2>
            </Col>
            <Col xs={12} lg={6}>
              <div className="d-flex justify-content-md-end">
                <img className="profile_image border p-2 " src="/img/img_perfil.png"></img>
              </div>
            </Col>
          </Row>
        </div>
        <hr />
        <Form onSubmit={(c) => formSubmit(c)} noValidate={true} className="needs-validation">
          <div>
            <Row>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <span>Primer nombre</span>
                    <b className="ms-2 text-danger">*</b>
                  </Form.Label>
                  <Form.Control
                    name="first_name"
                    required
                    type="text"
                    defaultValue={user.first_name}
                  />
                  <div className="invalid-feedback">Ingresa primer nombre</div>
                </Form.Group>
              </Col>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Segundo nombre</Form.Label>
                  <Form.Control name="second_name" type="text" defaultValue={user.second_name} />
                  <div className="invalid-feedback">Ingresa segundo nombre</div>
                </Form.Group>
              </Col>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <span>Primer apellido</span>
                    <b className="ms-2 text-danger">*</b>
                  </Form.Label>
                  <Form.Control
                    name="first_surname"
                    required
                    type="text"
                    defaultValue={user.first_surname}
                  />
                  <div className="invalid-feedback">Ingresa primer apellido</div>
                </Form.Group>
              </Col>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Segundo apellido</Form.Label>
                  <Form.Control
                    name="second_surname"
                    type="text"
                    defaultValue={user.second_surname}
                  />
                  <div className="invalid-feedback">Ingresa segundo apellido</div>
                </Form.Group>
              </Col>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <span>E-mail</span>
                    <b className="ms-2 text-danger">*</b>
                  </Form.Label>
                  <Form.Control required name="email" type="email" defaultValue={user.email} />
                  <div className="invalid-feedback">Ingresa un e-mail</div>
                </Form.Group>
              </Col>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Imagen de Perfil</Form.Label>
                  <ImageUpload></ImageUpload>
                  <div className="invalid-feedback">Ingresa una imagen de perfil</div>
                </Form.Group>
              </Col>
              <Col xs={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono de contacto</Form.Label>
                  <Form.Control name="phone" type="phone" defaultValue={user.phone} />
                  <div className="invalid-feedback">Teléfono de contacto</div>
                </Form.Group>
              </Col>
            </Row>
          </div>
          <hr className="mb-4 mt-5" />
          <div className="mb-5">
            <Button type="submit" variant="primary">
              Guardar Cambios
            </Button>
          </div>
        </Form>
        <AlertBootstrap
          type="success"
          text="Datos de Usuario guardados con éxito"
          show={showSuccess}
        ></AlertBootstrap>
      </div>
    </main>
  );
}

export default MyProfile;
