import  React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, orderByName, orderByRate } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginate from './Paginate';
import SearchBar from './SearchBar';

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
    // estado local para paginar
    const [currentPage, setCurrentPage] = useState(1)    
    const [recipesPerPage, setRecipesPerPage] = useState(9) // maxima cantidad de recetas en 1 pagina
    // defino 1era y ultima de cada pagina usando los estados que declare 
    const lastRecipe = currentPage*recipesPerPage            
    const firstRecipe = lastRecipe - recipesPerPage           
    const actualPage =  allRecipes.slice(firstRecipe,lastRecipe) // hago el corte, para solo mostrar en la pagina actual las recetas entre first y last
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    } 
    // estado local para re-renderizar 
    const [order, setOrder] = useState('');
    // orden alfabetico
    const handleAlphabeticalOrder = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
        setOrder('ordenado '+e.target.value)
    }
    // orden por calificacion
    const handleRateOrder = (e) => {
        e.preventDefault();
        dispatch(orderByRate(e.target.value));
        setCurrentPage(1);
        setOrder('ordenado '+e.target.value)
    }


    return(
        <div>
            <Link to='/recipe'> Aca va el boton para crear recetas </Link>
            <h1>ESTE ES EL TITULO</h1>
            {/* este boton va a cargar todas las recetas (en realidad las primeras 100 que empiecen con r hasta que lo arregle en el back jeje) */}
            <button onClick={(e)=>{onClick(e)}}> boton traerecetas </button> 
            <div>
                <select onChange={(e) => handleRateOrder(e)}>
                    <option> - </option>
                    <option value='rateAs'> puntuacion ascendente  </option>
                    <option value='rateDes'> puntuacion descendente </option>
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
                <select onChange={ (e)=>handleAlphabeticalOrder(e)} >
                    <option> - </option>
                    <option value='alfAs'> a - z </option>
                    <option value='alfDesc'> z - a </option>
                </select>
                <SearchBar/>
                <Paginate recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginate={paginate} />
                {
                    actualPage?.map(el => {
                        return(
                            <Card name={el.name} img={el.img}  rate={el.rate} diets={el.diets} createdInDb={el.createdInDb}/>
                        )
                    })
                }
            </div>
        </div>

    )

}

export default Home