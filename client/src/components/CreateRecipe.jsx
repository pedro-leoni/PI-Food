import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//importar actions cuando las cree
import { createNewRecipe, getDiets } from "../actions";


const CreateRecipe = () => {
    const dispatch = useDispatch();
    const diets = useSelector( (state)=>state.diets)
    const [input, setInput] = useState({
        name: '',
        resume: '',
        rate: '',
        healthy_level: '',
        instructions: '',
        diets: []
    })
    useEffect(()=>{
        dispatch(getDiets())
    },[]);


    const handleChange = (e)=> {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleDiets = (e) => {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }
    const handleRemoveDiet = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setInput({
            ...input,
            diets: input.diets.filter(diet=> diet !== e.target.value)
        })
    }
    //FALTA EL HANDLESUBMIT, PERO LO QUE LLEGO HASTA ACA FUNCIONA!!!!!

    return(
        <div>
            <Link to='/home'><button> Volver </button></Link>
            <h2> Crea tu propia receta </h2>
            <form>
                <div>
                    <label> Nombre </label>
                    <input type='text' value={input.name} name='name' onChange={(e)=> handleChange(e)}/>
                </div>
                <div>
                    <label> Resumen </label>
                    <input type='text' value={input.resume} name='resume' onChange={(e)=> handleChange(e)}/>
                </div>
                <div>
                    <label> Calificacion </label>
                    <input type='number' value={input.rate} name='rate' onChange={(e)=> handleChange(e)}/>
                </div>
                <div>
                    <label> Nivel de Saludable </label>
                    <input type='number' value={input.healthy_level} name='healthy_level' onChange={(e)=> handleChange(e)}/>
                </div>
                <div>
                    <label> Paso a Paso </label>
                    <textarea value={input.instructions} name='instructions' onChange={(e)=> handleChange(e)}/> 
                </div>
                <div>
                    <select onChange={(e)=>handleDiets(e)}>
                        {
                            diets.map((d) => {
                                return(
                                <option value={d.name} >{d.name}</option>
                            )})
                        }
                    </select>
                    <ul>
                            {
                                input.diets.map( e=>{ 
                                    return(
                                        <li>
                                            <button value={e} onClick={(e)=>handleRemoveDiet(e)}>x</button>
                                            {e + " "}
                                        </li>
                                    )
                                })
                            }

                    </ul>
                </div>
                <button type="submit"> Crear Receta </button>
            </form>
        </div>
    )
}

export default CreateRecipe