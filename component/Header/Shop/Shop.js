import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../../utilities/fakedb';
import Product from '../Product/Product';
import Cart from './Cart/Cart';
import './Shop.css'

const Shop = () => {
    const [products, setProduct] = useState([]);
    const [cart, setCart] = useState([]);


    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, []);

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);

            
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);

            }
            
        }
        setCart(savedCart);
    },[products])

    const heandelAddToCart = (seletedProduct) => {
        let newCart = [];
        const exists=cart.find(product=> product.id===seletedProduct.id)
        if (!exists) {
            seletedProduct.quantity = 1;
            newCart = [...cart, seletedProduct];
        }
        else {
            const rest = cart.filter(product => product.id !== seletedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
       
        setCart(newCart);
        addToDb(seletedProduct.id)
    }
    return (
        <div className='shop-container'>
            <div className="pruducts-container">
                {
                    products.map(product => <Product key={product.id}
                        product={product} heandelAddToCart={heandelAddToCart}
                   ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;