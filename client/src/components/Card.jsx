import React from "react";

const Card = ({ name, rate, resume, img}) => {
    return( 
        <div className="Card">
            <h3> {name} </h3>
            <p> {resume} </p>
            <h5> {rate} </h5>
            <img src={img} alt='imagen not found' />
        </div>
    )
}


export default Card