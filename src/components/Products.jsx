import {useEffect, useState} from "react";
import Search from "./Search";
import SortByPrice from "./SortByPrice";

function Products(props) {
    const [productList, setProductList] = useState([]);
    const [query, setQuery] = useState('');
    const [priceOrder, setPriceOrder] = useState('');

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

    function handleSortByPrice(a,b) {
        switch(priceOrder){
            case '':
                return 0;
            case 'ascending':
                return  a.price - b.price;
            case 'descending':
                return b.price - a.price;
        }

    }

    return (
        <div>
            <Search setQuery={setQuery} />

            <SortByPrice setPriceOrder={setPriceOrder}/>
            
            <h2>Products</h2>  
                
            <ul>
                {productList
                    .filter(({name, description}) => `${name} ${description}`
                        .toLowerCase()
                        .includes(query.toLowerCase()))
                    .sort(handleSortByPrice)
                    .map((product) => (
                        <li key={product.id}>
                            {product.name} {product.price}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Products;