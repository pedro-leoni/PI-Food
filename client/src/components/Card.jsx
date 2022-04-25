import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css';

const Card = ({ name, rate, img, diets, createdInDb, id }) => {
        return( 
            <div className={styles.card}>
                <div className={styles.cardTitle}>
                        <p> {name} </p>
                </div>
                    <div className={styles.ratediets}>

                        <div className={styles.img}>
                            <img src={img} alt='imagen not found'/>
                        </div>
                        
                        <div className={styles.text}>
                            <h5>Rate: {rate} </h5>
                                { 
                                    diets.map( e => {
                                        return (
                                            <p className={styles.mappingdiets} key={e}>{e}</p>
                                        )
                                        
                                })}
                            </div>
                    </div>
                    </div>

            
        )
    }

    
    



export default Card