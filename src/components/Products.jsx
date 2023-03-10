import {useEffect, useState} from "react";
import Search from "./Search";
import SortByPrice from "./SortByPrice";
import {Link, useSearchParams} from "react-router-dom";

function Products() {
    const [productList, setProductList] = useState([]);
    const [query, setQuery] = useState('');
    const [priceOrder, setPriceOrder] = useState('');
    const [_, setSearchParams] = useSearchParams();

    useEffect(() => {
        const  controller  = new AbortController();
        getProducts(controller.signal)
            .then(setProductList);

        return () => {
            controller.abort()
        };
        
    },[]);

    useEffect(handleSearchParams, [query, priceOrder]);
    

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

    function handleSearchParams(){
        const params = {};
        if(query !== ''){
            params.query = query;
        }
        if(priceOrder !== ''){
            params.order = priceOrder;
        }

        setSearchParams(params);
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
                            {product.name} {product.price}{' '}
                            <Link to={`/products/${product.id}`}>details</Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Products;