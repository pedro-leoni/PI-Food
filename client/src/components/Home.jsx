import  React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginate from './Paginate';

const Home = () =>{
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes); //map state to props 

    // useEffect(() => {
    //     dispatch(getAllRecipes())    //map dispatch to props
    // },[])                           
    //la funcion onClick esta haciendo el dispatch to props para que la pagina no pregargue las recetas,
    // en el caso de querer que las precarggue tengo que usar el useEffect que esta comentado mas arriba
    const onClick = (evento)=> {
        evento.preventDefault();
        dispatch(getAllRecipes())
    }

    //PAGINADO: 
    const [currentPage, setCurrentPage] = useState(1)    
    const [recipesPerPage, setRecipesPerPage] = useState(9) // maxima cantidad de recetas en 1 pagina
    const lastRecipe = currentPage*recipesPerPage            // 
    const firstRecipe = lastRecipe - recipesPerPage           // 
    const actualPage =  allRecipes.slice(firstRecipe,lastRecipe) // hago el corte, para solo mostrar en la pagina actual las recetas entre first y last
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    } 


    return(
        <div>
            <Link to='/recipe'> Aca va el boton para crear recetas </Link>
            <h1>ESTE ES EL TITULO</h1>
            {/* este boton va a cargar todas las recetas (en realidad las primeras 100 que empiecen con r hasta que lo arregle en el back jeje) */}
            <button onClick={(e)=>{onClick(e)}}> boton para recargar </button> 
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
                <Paginate recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginate={paginate} />
                {
                    actualPage?.map(el => {
                        return(
                            <Card name={el.name} img={el.img} diet={el.diet} rate={el.rate} diets={el.diets} createdInDb={el.createdInDb}/>
                        )
                    })
                }
            </div>
        </div>

    )

}

export default Home