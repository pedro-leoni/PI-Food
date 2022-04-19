import React from "react";



const Filters = ({handleRateOrder, handleAlphabeticalOrder}) => {


    return(
        <div>
            <select onChange={(e) => handleRateOrder(e)}>
                <option> - </option>
                <option value='rateAs'> puntuacion ascendente  </option>
                <option value='rateDes'> puntuacion descendente </option>
            </select>
            <select>
                <option value='vegan'> vegan </option>
                <option value='fodmap friendly'> fodmap friendly </option>
                <option value='dairy free'> dairy free </option>
                <option value='gluten free'> gluten free </option>
                <option value='lacto ovo vegetarian'> lacto ovo vegetarian </option>
                <option value='paleolithic'> paleolithic </option>
                <option value='pescatarian'> pescatarian </option>
                <option value='primal'> primal </option>
                <option value='whole 30'> whole 30 </option>
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