import {useState} from "react";

function SortByPrice() {

    const [value, setValue] = useState('');

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