import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderByRate, orderByName, getDiets, filterByDiet } from "../actions";


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
        <div>
            <select onChange={(e) => handleRateOrder(e)}>
                <option> - </option>
                <option value='rateAs'> puntuacion ascendente  </option>
                <option value='rateDes'> puntuacion descendente </option>
            </select>
            <select onChange={(e) => handleFilterByDiet(e)}>
                <option>-</option>
                {   
                diets.map((d) => {
                    return(
                    <>
                        <option value={d.name} >{d.name}</option>
                    </>
                )})
                }
            </select>
            <select onChange={ (e)=>handleAlphabeticalOrder(e)} >
                <option> - </option>
                <option value='alfAs'> a - z </option>
                <option value='alfDesc'> z - a </option>
            </select>
        </div>
    )

}

export default Filters