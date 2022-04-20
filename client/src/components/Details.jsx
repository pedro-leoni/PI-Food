import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import { Link } from "react-router-dom"

const Details = (props) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDetails(props.match.params.id))
    },[dispatch])
    const detail = useSelector((state)=>state.recipeDetail)
    return (
        <div>
            {
                detail.hasOwnProperty('data')?
                <div>
                    <h1>{detail.data.name? detail.data.name : detail.data.title}</h1>
                    <div>
                        <p>Puntuacion: {detail.data.rate? detail.data.rate : detail.data.spoonacularScore}</p>
                        <p>Puntuacion saludable: {detail.data.healthy_level? detail.data.healthy_level : detail.data.healthScore}</p>
                        <p>Tipos de dieta: {detail.data.createdInDb? detail.data.diets.map(e=>e.name) : detail.data.diets}</p>
                    </div>
                    <img src={detail.data.image} alt='imagen not found'/>
                    <p>{detail.data.resume? detail.data.resume : detail.data.summary}</p>
                    <p>{detail.data.instructions}</p>
                    <Link to="/home">Volver al Home</Link>
                </div> :
                <p> no hay data</p>
            }
        </div>
    )
}

export default Details
