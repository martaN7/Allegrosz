import {useEffect, useState} from "react";

function Products(props) {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const  controller  = new AbortController();
        getProducts(controller.signal)
            .then((data) => setProductList(data));

        return () => {
            controller.abort()
        };
        
    },[]);

    async function getProducts(signal){
        const response = await fetch('/products', {signal});

        return await response.json();
    }

    return (
        <div>
            Products
            <ul>
                {productList.map((product) => (
                  <li key={product.id}>
                      {product.name}
                  </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;