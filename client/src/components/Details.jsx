import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import { Link } from "react-router-dom";
import styles from './Details.module.css';

const Details = (props) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDetails(props.match.params.id))
    },[dispatch])
    const detail = useSelector((state)=>state.recipeDetail)
    return (
        
    <div className={detail.hasOwnProperty('data')?  styles.container : styles.loading}>
        <div className={styles.detailCard}>
            {
                detail.hasOwnProperty('data')?
                <div>
                    <div className={styles.title}>
                        <h1>{detail.data.name? detail.data.name : detail.data.title}</h1>
                    </div>
                    <div className={styles.header}>
                        <div className={styles.headerText}> 
                            <p>Rate: {detail.data.rate? detail.data.rate : detail.data.spoonacularScore}</p>
                            <p>Healthy Level: {detail.data.healthy_level? detail.data.healthy_level : detail.data.healthScore}</p>
                            
                        </div>
                        <img className={styles.image} src={detail.data.image?detail.data.image:detail.data.img} alt='imagen not found'/>
                    </div>
                    <div className={styles.text}> 
                        <div className={styles.resume}> 
                            <h3>Resume:</h3>
                            <p>{detail.data.resume? detail.data.resume : detail.data.summary.replace(/<[^>]*>?/g, "")}</p>
                        </div>
                        <div className={styles.tiposdieta}> 
                            <h3>Diet types</h3>
                            <p>{detail.data.diets.join(', ')}</p>
                        </div>
                        <div className={styles.pasoapaso}> 
                            <h3>Instructions:</h3>
                                {
                                    detail.data.instructions?
                                    <p>{detail.data.instructions.replace(/<[^>]*>?/g, "")}</p> :
                                    <p>This recipe does not contain instructions</p>
                                }  
                        </div>
                    </div>
                    <div> 
                            <Link to="/home" className={styles.link}>
                                <button className={styles.toHome}>
                                    Back to Home
                                </button>
                            </Link>
                    </div>
                </div> 
                :
                <div> 
                    <p> Loading... </p>
                </div>
            }
        </div>
    </div>
    )
}

export default Details
