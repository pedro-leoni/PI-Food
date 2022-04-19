import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByQuery } from "../actions";


// HAY QUE VACIAR EL INPUT CUANDO HACEMOS LA BUSQUEDA 
const SearchBar = () => {
    const dispatch = useDispatch()
    // estado local query
    const[query, setQuery] = useState('')

    const handleInputChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getByQuery(query))
        
    }
    return (
        <div>
            <input type='text' placeholder='Buscar' onChange={(e) => handleInputChange(e)}/>
            <button type="submit" onClick={(e) => handleSubmit(e)} > Buscar </button>
        
        </div>
    )
}

export default SearchBar