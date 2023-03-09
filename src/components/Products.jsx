import {useEffect, useState} from "react";
import Search from "./Search";

function Products(props) {
    const [productList, setProductList] = useState([]);
    const [query, setQuery] = useState('');


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
            <Search setQuery={setQuery} />
            <h2>Products</h2>  
                
            <ul>
                {productList
                    .filter(({name, description}) => `${name} ${description}`
                        .toLowerCase()
                        .includes(query.toLowerCase()))
                    .map((product) => (
                        <li key={product.id}>
                            {product.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Products;