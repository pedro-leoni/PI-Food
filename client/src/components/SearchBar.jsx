import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByQuery } from "../actions";
import styles from './SearchBar.module.css';



 
const SearchBar = ({setCurrentPage, getAllRecipes}) => {
    const dispatch = useDispatch()
    // estado local query
    const[query, setQuery] = useState('')
    
    
    const onClick = (evento)=> {
        evento.preventDefault();
        dispatch(getAllRecipes())
    }
    const handleInputChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(query.length){
            if(!query.replace(/ /g, "").match(/[^A-Za-z0-9]/)){
                dispatch(getByQuery(query))
                setCurrentPage(1)
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
            <input className={styles.label} type='text' placeholder='Search' onChange={(e) => handleInputChange(e)} value={query}/>
            <button className={styles.goButton} type="submit" onClick={(e) => handleSubmit(e)} > Search </button>
            <button className={styles.reload} onClick={(e)=>{onClick(e)}}>Reload</button>
        </div>

    )
}

export default SearchBar