
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchProducts } from './actions'

import defaultProductPicture1 from './img/bottle1.png'
import defaultProductPicture2 from './img/bottle2.png'
import defaultProductPicture3 from './img/bottle3.png'
import defaultProductPicture4 from './img/bottle4.png'
import defaultProductPicture5 from './img/bottle5.png'
import defaultProductPicture6 from './img/bottle6.png'

import './product-picker.css'


function rnd1d(x) {
  return Math.abs((Math.sin(x+4293) * 400399481) % 1);
}


const productPictures = [
  defaultProductPicture1,
  defaultProductPicture2,
  defaultProductPicture3,
  defaultProductPicture4,
  defaultProductPicture5,
  defaultProductPicture6,
];

const ProductPicture = (props) => {
  const {product} = props;
  let picture = product.picture;
  let style = {}; 
  if (!picture) {
    picture = productPictures[product.id % productPictures.length];
    style = {
      transform: `rotateZ(${(-23 + 2*23*rnd1d(product.id)).toFixed()}deg)`,
    }
  }

  return (
    <div className="product-picture">
      <img src={picture} style={style}
           alt="product"
           title="A real product picture" />
    </div>
  );
}

const Product = (props) => {
  const product = props.product;
  return (
    <button className="product"
         onClick={props.onClick}>
      <ProductPicture product={product} />
      <div className="product-info">
        <p className="name">{product.name}</p>
        <p className="price">{product.price}</p>
      </div>
    </button>
  );
}


const ProductPicker = (props) => {
  useEffect(() => {
    props.dispatch(fetchProducts());
  }, []);
  
  return (
    <div className="grid grid-products">
      {props.products.map((product) =>
        <Product key={product.id}
                 product={product}
                 onClick={() => props.onClick(product)} />)}
    </div>
  );
}

export default connect(
  (state) => ({
    products: state.products.all,
  })
)(ProductPicker);

