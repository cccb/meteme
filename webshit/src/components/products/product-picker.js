
import React from 'react'
import { connect } from 'react-redux'

import { fetchProducts } from './actions'


class ProductPicker extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }
  
  render() {
    return (
      <div className="grid grid-products">

      </div>
    );
  }
}

export default connect(
  (state) => ({
    products: state.products.all,
  })
)(ProductPicker);

