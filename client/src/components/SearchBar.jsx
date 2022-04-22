import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByQuery } from "../actions";


 
const SearchBar = () => {
    const error = useSelector((state) => state.error)
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
        setQuery('')
    }
    
    return (
        <div>
            <input type='text' placeholder='Buscar' onChange={(e) => handleInputChange(e)} value={query}/>
            <button type="submit" onClick={(e) => handleSubmit(e)} > Buscar </button>
            {/* {Object.values(error).length && (alert('asdasas'))} */}
        </div>

    )
}

export default SearchBar