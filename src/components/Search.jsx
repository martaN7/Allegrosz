import {useEffect, useState} from "react";

function Search({setQuery}) {
    const [value, setValue] = useState('');

    useEffect(() => {
        setQuery(value);
        
    }, [value]);

    function handleInput(e){
        setValue(e.target.value);
    }

    return (
        <div>
            <input
                type="text"
                value={value}
                placeholder="search product"
                onChange={handleInput}
            />
        </div>
    );
}

export default Search;