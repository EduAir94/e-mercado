import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { ProductFull } from '../../types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CarrouselMain(
  { images, setActiveIndex }: { images: ProductFull['images']; setActiveIndex: any },
  ref: any
) {
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState('');

  useImperativeHandle(ref, () => ({
    changeImage(index: number) {
      setIndex(index);
      setActiveIndex(index);
    },
  }));

  if (!images.length) return <></>;

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
    setActiveIndex(selectedIndex);
  };

  const openPopup = (image: string) => {
    setImage(image);
  };

  const handleClose = () => {
    setImage('');
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {images.map((image, index) => (
          <Carousel.Item role="button" key={index} onClick={() => openPopup(image)}>
            <img className="d-block w-100" src={image}></img>
          </Carousel.Item>
        ))}
      </Carousel>
      <Modal fullscreen show={image ? true : false} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img className="w-100 h-100 image-contain" src={image} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const Carrousel: any = forwardRef(CarrouselMain as any);

export default Carrousel;
