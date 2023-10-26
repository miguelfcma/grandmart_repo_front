//Este componente crea un carrusel de imágenes que se desplazarán automáticamente cada 4 segundos que es el intervalo de tiempo especificado

import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

// Importa las imágenes que se mostrarán en el carrusel
import img1 from './imgs/1.png';
import img2 from './imgs/2.png';
import img3 from './imgs/3.png';
import img4 from './imgs/4.png';
import img5 from './imgs/5.png';
import img6 from './imgs/6.png';
import img7 from './imgs/7.png';
import img8 from './imgs/8.png';
import img9 from './imgs/9.png';
import img10 from './imgs/10.png';
import img11 from './imgs/11.png';
import img12 from './imgs/12.png';
import img13 from './imgs/13.png';
import img14 from './imgs/14.png';

// Crea un array de objetos que contienen información sobre cada imagen como su id
const items = [
  {id: 1, src: img1},
  {id: 2, src: img2},
  {id: 3, src: img3},
  {id: 4, src: img4},
  {id: 5, src: img5},
  {id: 6, src: img6},
  {id: 7, src: img7},
  {id: 8, src: img8},
  {id: 9, src: img9},
  {id: 10, src: img10},
  {id: 11, src: img11},
  {id: 12, src: img12},
  {id: 13, src: img13},
  {id: 14, src: img14}
];

 // Maneja el cambio de índice del carrusel
export class Carrusel extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
    this.handleSelect = this.handleSelect.bind(this);
  }

  //La función handleSelect se encarga de actualizar el estado con el índice seleccionado cuando se cambia la imagen visible
  handleSelect(selectedIndex, e) {
    this.setState({ index: selectedIndex });
  }

  render() {
    const { index } = this.state;

    // Mapea los objetos del array "items" a elementos de carrusel
    const slides = items.map((item) => {
      return (
        <Carousel.Item key={item.id}>
          <img
            className="d-block w-100"
            src={item.src}
            alt={`Slide ${item.id}`}
          />
        </Carousel.Item>
      );
    });

    return (
      <div>
        <Carousel
          activeIndex={index}
          onSelect={this.handleSelect}
          interval={4000} // Intervalo de cambio de imágenes en milisegundos
        >
          {slides}
        </Carousel>
      </div>
    );
  }
}


