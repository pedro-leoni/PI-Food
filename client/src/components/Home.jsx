import  React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, orderByName, orderByRate } from '../actions';
import { Link } from 'react-router-dom';
//components
import Card from './Card';
import Paginate from './Paginate';
import SearchBar from './SearchBar';
import Filters from './Filters';
//styles
import styles from './Home.module.css';

const Home = () =>{
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes); //map state to props 
    const error = useSelector((state) => state.error)
    
    useEffect(() => {
        dispatch(getAllRecipes())    //map dispatch to props
    },[])                           
    // onClick para el boton traerecetas 
    // const onClick = (evento)=> {
    //     evento.preventDefault();
    //     dispatch(getAllRecipes())
    // }

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
    // if(Object.values(error.data).length){
    //     console.log(Object.values(error.data))
    // }
    return(
        
        <div className={styles.container}>
            {/* <button onClick={(e)=>{onClick(e)}}> boton traerecetas </button>  */}
            <section className={styles.header}>
                <SearchBar />
                <h1 className={styles.title}>Welcome</h1>
                <Link to='/recipe'><button className={styles.createButton}> Create your recipe </button></Link>
            </section>
            
            <section className={styles.filters}>
                <Filters  setCurrentPage={setCurrentPage} setOrder={setOrder}/>
                <Paginate recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginate={paginate} />
            </section>
            
            <section className={styles.content}>
                {
                    allRecipes.length ? 
                <div>
                    {
                        actualPage?.map(el => {
                            return(
                                <section className={styles.card}>
                                <Link className={styles.prueba} to={`/recipes/${el.id}`}><Card name={el.name} img={el.img}  rate={el.rate} diets={el.diets} createdInDb={el.createdInDb} id={el.id} key={el.id}/></Link>
                                </section>
                            ) 
                        })
                    }
                    <Paginate recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginate={paginate} />
                </div> :
                    <p>Loading ...</p>       
                }
            </section>
        </div>
    )

}

export default Home