import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

function SortByPrice({setPriceOrder}) {

    const [value, setValue] = useState('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        setValue(searchParams.get('order') || '');
    }, []);

    useEffect(() => {
        setPriceOrder(value);
    },[value]);

    function handleSelect(e){
        setValue(e.target.value);   
    }

    return (
        <div>
            <label htmlFor="sortByPrice">Sorting by price</label>

            <select id="sortByPrice" value={value} onChange={handleSelect}>
                <option value="">---</option>
                <option value="ascending">ascending</option>
                <option value="descending">descending</option>
            </select>
        </div>
    );
}

export default SortByPrice;