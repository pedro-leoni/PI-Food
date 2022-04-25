import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByQuery } from "../actions";
import styles from './SearchBar.module.css';



 
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
        if(query.length){
            if(!query.replace(/ /g, "").match(/[^A-Za-z0-9]/)){
                dispatch(getByQuery(query))
                setQuery('')
            } else {
                alert('Search cannot contain symbols')
            }
        } else {
            alert('Search cannot be empty')
        }
    }
    
    return (
        <div className={styles.container}>
            <input className={styles.label} type='text' placeholder='Buscar' onChange={(e) => handleInputChange(e)} value={query}/>
            <button className={styles.goButton} type="submit" onClick={(e) => handleSubmit(e)} > Buscar </button>
        </div>

    )
}

export default SearchBar