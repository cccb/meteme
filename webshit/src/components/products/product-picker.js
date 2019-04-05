
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchProducts } from './actions'

import defaultProductPicture from './img/default_product.png'

import './product-picker.css'

const ProductPicture = (props) => {
  let picture = props.product.picture;
  if (!picture) {
    picture = defaultProductPicture;
  }

  return (
    <div className="product-picture">
      <img src={picture} 
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

