import React, { useState } from 'react';
import pizzaCart from '../pages/Pizza';
import '../assets/css/Cart.css';

const Cart = () => {
    const [cart, setCart] = useState(pizzaCart);

    const increaseQuantity = (id) => {
        const updatedCart = cart.map(pizza =>
            pizza.id === id ? { ...pizza, quantity: pizza.quantity + 1 } : pizza
        );
        setCart(updatedCart);
    };

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(pizza => {
            if (pizza.id === id) {
                const newQuantity = pizza.quantity - 1;
                return newQuantity > 0 ? { ...pizza, quantity: newQuantity } : { ...pizza, quantity: 0 };
            }
            return pizza;
        });
        setCart(updatedCart.filter(pizza => pizza.quantity > 0)); 
    };

    const totalAmount = cart.reduce((total, pizza) => total + (pizza.price * pizza.quantity), 0);

    return (
        <div className="cart">
            <h2>Carrito de Compras</h2>
            <div className="cart-items">
                {cart.length > 0 ? (
                    cart.map(pizza => (
                        <div key={pizza.id} className="cart-item">
                            <img src={pizza.img} alt={pizza.name} />
                            <h3>{pizza.name}</h3>
                            <hr />
                            <p>Ingredientes: {pizza.ingredients.join(', ')}</p>
                            <p>Precio: ${pizza.price}</p>
                            <p>Cantidad: {pizza.quantity}</p>
                                <button onClick={() => increaseQuantity(pizza.id)}>+</button>
                                <button onClick={() => decreaseQuantity(pizza.id)}>-</button>
                        </div>
                    ))
                ) : (
                    <p>El carrito está vacío 🛒.</p>
                )}
            </div>
            <h3>Total: ${totalAmount}</h3>
            <button className="pay-btn" onClick={() => alert("Compra exitosa")}>Pagar</button>
        </div>
    );
};

export default Cart;
