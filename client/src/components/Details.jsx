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
        <div className={styles.detailContainer}>
            {
                detail.hasOwnProperty('data')?
                <div>
                    <h1>{detail.data.name? detail.data.name : detail.data.title}</h1>
                    <div>
                        <p>Puntuacion: {detail.data.rate? detail.data.rate : detail.data.spoonacularScore}</p>
                        <p>Puntuacion saludable: {detail.data.healthy_level? detail.data.healthy_level : detail.data.healthScore}</p>
                        <p>Tipos de dieta: {detail.data.diets.join(' ')}</p>
                    </div>
                    <img src={detail.data.image?detail.data.image:detail.data.img} alt='imagen not found'/>
                    <p>{detail.data.resume? detail.data.resume : detail.data.summary.replace(/<[^>]*>?/g, "")}</p>
                    <p>Paso a Paso</p>
                        {
                            detail.data.instructions?
                            <p>{detail.data.instructions.replace(/<[^>]*>?/g, "")}</p> :
                            <p>Esta receta no tiene instrucciones escritas aun</p>
                        }  
                    <Link to="/home">Volver al Home</Link>
                </div> :
                <p> no hay data</p>
            }
        </div>
    )
}

export default Details
