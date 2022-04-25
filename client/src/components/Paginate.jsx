import React from "react";
import styles from './Paginate.module.css';



const Paginate = ({recipesPerPage, allRecipes, paginate}) => {


    //render
    const numbers = []
    const numberOfPages = Math.ceil(allRecipes/recipesPerPage)
    for(let i = 0 ; i < numberOfPages ; i++){
        numbers.push(i+1)
    }
    // HAY QUE SOLUCIONAR QUE SIEMPRE MUESTRA 1 PAG DE MAS 
    return (
        <nav className={styles.paginate}>
            <ul>
                {
                    numbers?.map(number => (
                        
                            <a className={styles.numbers} onClick={()=>paginate(number)} key={number}> {number} </a>
                        
                    ))
                }
            </ul>
        </nav>
    )

}

export default Paginate