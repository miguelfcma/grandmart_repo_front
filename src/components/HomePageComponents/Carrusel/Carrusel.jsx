import React, { Component } from 'react';


import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';

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

const items = [
  {id: 1,src: img1},{id: 2, src: img2},{id: 3,src: img3},{id: 4,src: img4},
  {id: 5,src: img5},{id: 6,src: img6},{id: 7,src: img7},{id: 8,src: img8},
  {id: 9,src: img9},{id: 10,src: img10},{id: 11,src: img11},{id: 12,src: img12},
  {id: 13,src: img13},{id: 14,src: img14}
];

class Carrusel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item.id}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <img src={item.src} />
        </CarouselItem>
      );
    });

    return (
      <div>
        <style>
          {
            `.custom-tag {
                max-width: 100%;
                height: 500px;
                background: #AADDE7;
              }`
          }
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          interval={4000}
          ride="carousel"
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}

export default Carrusel;