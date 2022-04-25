import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderByRate, orderByName, getDiets, filterByDiet } from "../actions";
import styles from './Filters.module.css';


const Filters = ({setCurrentPage , setOrder}) => {
    const dispatch = useDispatch()
    const diets = useSelector( (state)=>state.diets)
    useEffect(()=>{
        dispatch(getDiets())
    },[]);

    const handleRateOrder = (e) => {
        e.preventDefault();
        dispatch(orderByRate(e.target.value));
        setCurrentPage(1);
        setOrder('ordenado '+e.target.value);
    }
    const handleAlphabeticalOrder = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder('ordenado '+e.target.value);
    }
    const handleFilterByDiet = (e) => {
        e.preventDefault();
        dispatch(filterByDiet(e.target.value));
        setCurrentPage(1);
        //setOrder('filtrado '+e.target.value)
    }
    return(
        <div className={styles.filtersContainer}>
            <h3> Filters: </h3>
            <select onChange={(e) => handleRateOrder(e)} className={styles.filters}>
                <option name='invalidOption' value='-'> Rate </option>
                <option value='rateAs'> Ascendent  </option>
                <option value='rateDes'> Descendent </option>
            </select>
            <select onChange={ (e)=>handleAlphabeticalOrder(e)} className={styles.filters}>
                <option value='-'> Alphabetical Order </option>
                <option value='alfAs'> a - z </option>
                <option value='alfDesc'> z - a </option>
            </select>
            <select onChange={(e) => handleFilterByDiet(e)} className={styles.filters}>
                <option value='-'>Filter by diet</option>
                {   
                diets.map((d) => {
                    return(
                    <>
                        <option value={d.name} key={d.name} >{d.name}</option>
                    </>
                )})
                }
            </select>

        </div>
    )

}

export default Filters