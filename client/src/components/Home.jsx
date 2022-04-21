import  React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, orderByName, orderByRate } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginate from './Paginate';
import SearchBar from './SearchBar';
import Filters from './Filters';

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
    // // defino 1era y ultima de cada pagina usando los estados que declare 
    const lastRecipe = currentPage*recipesPerPage            
    const firstRecipe = lastRecipe - recipesPerPage           
    const actualPage =  allRecipes.slice(firstRecipe,lastRecipe) // hago el corte, para solo mostrar en la pagina actual las recetas entre first y last
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    } 
    // estado local para re-renderizar 
    const [order, setOrder] = useState('');

    return(
        
        <div>
            <Link to='/recipe'> Aca va el boton para crear recetas </Link>
            <h1>ESTE ES EL TITULO</h1>
            <button onClick={(e)=>{onClick(e)}}> boton traerecetas </button> 
            <SearchBar />
            {
                allRecipes.length ? 
            <div>
                <Filters setCurrentPage={setCurrentPage} setOrder={setOrder}/>
                <Paginate recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginate={paginate} />
                {
                    actualPage?.map(el => {
                        return(
                            <Card name={el.name} img={el.img}  rate={el.rate} diets={el.diets} createdInDb={el.createdInDb} id={el.id} key={el.id}/>
                        ) 
                    })
                }
                <Paginate recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginate={paginate} />
            </div> :
                <p>
                    No hay recetas capo
                </p>
            }
        </div>
    )

}

export default Home