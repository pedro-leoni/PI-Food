import React from "react";
import styles from './Paginate.module.css';



const Paginate = ({recipesPerPage, allRecipes, paginate, currentPage}) => {


    //render
    const numbers = []
    const numberOfPages = Math.ceil(allRecipes/recipesPerPage)
    for(let i = 0 ; i < numberOfPages ; i++){
        numbers.push(i+1)
    }
    return (
        <nav className={styles.paginate}>
            <ul>
                {
                    numbers?.map(number => (
                        
                            <a className={currentPage===number? styles.numberSelected : styles.numbers } onClick={()=>paginate(number)} key={number}> {number} </a>
                        
                    ))
                }
            </ul>
        </nav>
    )

}

export default Paginate