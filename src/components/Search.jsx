import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

function Search({setQuery}) {
    const [value, setValue] = useState('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        setValue(searchParams.get('query') || '');
    }, []);

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