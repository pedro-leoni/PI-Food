import React from "react";

const Paginate = ({recipesPerPage, allRecipes, paginate}) => {
    const numbers = []
    const numberOfPages = Math.ceil(allRecipes/recipesPerPage)
    for(let i = 0 ; i < numberOfPages ; i++){
        numbers.push(i+1)
    }
    // HAY QUE SOLUCIONAR QUE SIEMPRE MUESTRA 1 PAG DE MAS 
    return (
        <nav>
            <ul>
                {
                    numbers?.map(number => (
                        
                            <a onClick={()=>paginate(number)}> {number} </a>
                        
                    ))
                }
            </ul>
        </nav>
    )

}

export default Paginate