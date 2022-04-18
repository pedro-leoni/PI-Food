import React from "react";

const Card = ({ name, rate, diet, img, diets, createdInDb }) => {
    if(createdInDb){
        return( 
            <div className="Card">
                <h3> {name} </h3>
                {
                    diets.map( e => {
                        return(
                            <p>{e.name}</p>
                        )
                    })
                }
                <h5> {rate} </h5>
                <img src={img} alt='imagen not found' />
            </div>
        )
    } else {
        return( 
            <div className="Card">
                <h3> {name} </h3>
                <p> {diet} </p>
                <h5> {rate} </h5>
                <img src={img} alt='imagen not found' />
            </div>
        )
    }

    
    
}


export default Card