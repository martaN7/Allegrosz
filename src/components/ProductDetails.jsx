import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function ProductDetails() {
    const [details, setDetails] = useState({});
    const {productID} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        getDetails(controller.signal)
            .then(setDetails);

        return () => {
            controller.abort();
        }

    }, []);

    async function getDetails(signal){
        const response = await fetch(`/products/${productID}`, {signal});
        return await response.json();
    }

    return (
        <div>
            {Object.keys(details).length === 0 || (
                <>
                    <h2>Product details</h2>
                    <p>
                        Name: {details.name}
                    </p>
                    <p>
                        Description: {details.description}
                    </p>
                    <p>
                        Price: {details.price}
                    </p>
                    <p>
                        Category: {details.category}
                    </p>
                    <p>
                        Subcategories: {details.subcategories}
                    </p>
                    <button onClick={() => navigate(-1)}>Return</button>
                </>
            )}
        </div>
    );
}

export default ProductDetails;