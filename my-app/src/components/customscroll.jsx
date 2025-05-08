import { useState, useEffect } from "react";
import './style.css'

function Customscroll({ url }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errormessage, setErrormessage] = useState("");
    const [percent, setPercent] = useState(0);


    async function fetchData(getuRl) {
        setLoading(true);


        try {
            const response = await fetch(getuRl);
            const data = await response.json();

            if (data && data.products && data.products.length) {

                setData(data.products);
                // console.log(data)
                setLoading(false);

            }



        } catch (e) {
            setErrormessage(e.message);
            console.log(errormessage);


        }


    }

    function handleScroll() {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = document.body.scrollTop || document.documentElement.scrollTop

        setPercent((scrolled / height) * 100);


    }
    useEffect(() => {
        fetchData(url);
    }, [url])

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        return () => { window.removeEventListener('scroll', () => { }) }

    }, [])

    if (loading) return <><div>Loading Data Now</div></>


    return (
        <>
            <div className="scrollupdate">
                <div className="updatebar" style={{ width: `${percent}%` }}></div>
                 <div className="smillyface">😀</div>
            </div>

            <div className="main-container">


                {data.length ? (
                    data.map((item) => (
                        <div className="product-container" key={item.id}>

                            <p>{item.title}</p>
                            <p>Status: {item.availabilityStatus}</p>
                            <p>Brand: {item.brand}</p>
                            <img className="productimages" src={item.images[0]} alt="productimages" />
                            <p>Price:{item.price}$</p>


                        </div>
                    ))
                ) : null}
            </div>
        </>
    );


}

export default Customscroll;