import  React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';

const Home = () =>{
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.recipes); //map state to props 

    useEffect(() => {
        dispatch(getAllRecipes())    //map dispatch to props
    },[dispatch])
    
    const onClick = (evento)=> {
        evento.preventDefault();
        dispatch(getAllRecipes)
    }

    return(
        <div>
            <Link to='/recipe'> Aca va el boton para crear recetas </Link>
            <h1>ESTE ES EL TITULO</h1>
            {/* este boton va a cargar todas las recetas (en realidad las primeras 100 que empiecen con r hasta que lo arregle en el back jeje) */}
            <button onClick = {(e)=>{onClick(e)}}> boton para recargar </button> 
            <div>
                <select>
                    <option value='asc'> puntuacion ascendente  </option>
                    <option value='desc'> puntuacion descendente </option>
                </select>
                <select>
                    <option value='vegan'> vegan </option>
                    <option value='fodmap friendly'> fodmap friendly </option>
                    <option value='dairy free'> dairy free </option>
                    <option value='gluten free'> gluten free </option>
                    <option value='lacto ovo vegetarian'> lacto ovo vegetarian </option>
                    <option value='paleolithic'> paleolithic </option>
                    <option value='pescatarian'> pescatarian </option>
                    <option value='primal'> primal </option>
                    <option value='whole 30'> whole 30 </option>
                </select>
                <select>
                    <option value='alfAs'> a - z </option>
                    <option value='alfDesc'> z - a </option>
                </select>
                {
                    allCharacters?.map(el => {
                        return(
                            <Card name={el.name} img={el.img} resume={el.resume} rate={el.rate}/>
                        )
                    })
                }
            </div>
        </div>

    )

}

export default Home