import React from "react";

const Paginate = ({recipesPerPage, allRecipes, paginate}) => {
    const number1 = []
    const number2 = Math.ceil(allRecipes/recipesPerPage)
    for(let i = 0 ; i <= number2 ; i++){
        number1.push(i+1)
    }

    return (
        <nav>
            <ul>
                {
                    number1?.map(number => (
                        
                            <a onClick={()=>paginate(number)}> {number} </a>
                        
                    ))
                }
            </ul>
        </nav>
    )

}

export default Paginate