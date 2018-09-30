import React, { Component } from 'react';
import Navbar from "./Navbar"
import Product from "./Product"
import ShopingCart from "./ShopingCart"
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    cartItems:[],
    products:[]
  };

  handleAddItemToCart = product => {
    var cartItems = this.state.cartItems;

    const alreadyExists = cartItems.some(cartItem =>cartItem.product.id === product.id);

    if(alreadyExists){
      cartItems = cartItems.map(cartItem =>{
        if(cartItem.product.id === product.id){
          cartItem.quantity = cartItem.quantity + 1;
        }
        return cartItem;
      });

    }else{
     cartItems.push({
      product: product,
      quantity: 1
      }); 
    }

    this.setState({ cartItems:cartItems})
  }

  handelRemoveItemFromCart = product => {
    const cartItemsState = this.state.cartItems;
    const selectedItemIndex = cartItemsState.findIndex(cartItem =>{ return cartItem.product.id === product.id;});
    const selectedItem = cartItemsState[selectedItemIndex];
  if(selectedItem.quantity > 1){
    selectedItem.quantity -- ;
  } else {
    cartItemsState.splice(selectedItemIndex, 1);
  }
    

    this.setState({ cartItemsState:cartItemsState})
  }

  componentDidMount(){
    fetch("http://product-list.glitch.me/")
    .then(respone => respone.json())
    .then(products =>{
      this.setState({ products:products
      })
    });
  }

  render() {
    return (
      <div className="container">
      <Navbar />
  <div className="columns">
    <div className="column is-two-thirds">
      <div>
        <h3 className="title">Our Products</h3>
        <div className="columns">
        {this.state.products.map(product => 
         ( <Product key={product.id} product={product} onAddItemToCart={this.handleAddItemToCart} />)
        )}
        </div>
      </div>
    </div>
    <ShopingCart cartItems={this.state.cartItems} onRemoveItemFromCart={this.handelRemoveItemFromCart} /> 
  </div>
</div>

    );
  }
}

export default App;
