import React from "react";
import { Link } from "react-router-dom";
import './Card.css';

const Card = ({ name, rate, img, diets, createdInDb, id }) => {
        return( 
            <div className="card">
                <div className='card-title'>
                    <Link to={`/recipes/${id}`}>
                        <h3> {name} </h3>
                    </Link>
                    <h5>Puntuacion: {rate} </h5>
                </div>
                <div className="container">
                <div className="diet-rate">
                    <div className="img">
                        <img src={img} alt='imagen not found' />
                    </div>
                        <div>
                            { diets.map( e => {
                                return (
                                    <p key={e}>{e}</p>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    
    



export default Card