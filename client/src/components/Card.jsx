import React from "react";
import { Link } from "react-router-dom";

const Card = ({ name, rate, img, diets, createdInDb, id }) => {
    
    if(createdInDb){
        return( 
            <div className="Card">
                <Link to={`/recipes/${id}`}>
                    <h3> {name} </h3>
                </Link>
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
                <Link to={`/recipes/${id}`}>
                    <h3> {name} </h3>
                </Link>
                { diets.map( e => {
                    return (
                        <p>{e}</p>
                    )
                })}
                <h5> {rate} </h5>
                <img src={img} alt='imagen not found' />
            </div>
        )
    }

    
    
}


export default Card