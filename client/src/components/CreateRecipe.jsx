import React, {useState, useEffect} from "react";
import {Link } from "react-router-dom";
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
        img: '',
        diet: []
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
        if(!input.diet.includes(e.target.value)){
            setInput({
                ...input,
                diet: [...input.diet, e.target.value]
    
            })
        }
    }
    const handleRemoveDiet = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            diet: input.diet.filter(diet=> diet !== e.target.value)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewRecipe(input))
        alert('Receta creada con exito')
        setInput({
            name: '',
            resume: '',
            rate: '',
            healthy_level: '',
            instructions: '',
            img: '',
            diet: []
        })
    }
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
                    <label> Imagen </label>
                    <input type='text' value={input.img} name='img' onChange={(e)=>handleChange(e)}/>
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
                                <>
                                <option value={d.name} >{d.name}</option>
                                </>
                                
                            )})
                            
                        }
                    </select>
                    <ul>
                            {
                                input.diet.map( e=>{ 
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
                <button type="submit" onClick={(e)=>handleSubmit(e)}> Crear Receta </button>
            </form>
        </div>
    )
}

export default CreateRecipe