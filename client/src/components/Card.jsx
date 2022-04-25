import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css';

const Card = ({ name, rate, img, diets, createdInDb, id }) => {
        return( 
            <div className={styles.card}>

                <div className={styles.cardTitle}>
                        <h3> {name} </h3>
                </div>
                <div className={styles.container}>
                <div className={styles.diets}>
                    <div className={styles.img}>
                        <img src={img} alt='imagen not found' />
                    </div>
                        <div className={styles.text}>
                        <h5>Puntuacion: {rate} </h5>
                                { 
                                diets.map( e => {
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