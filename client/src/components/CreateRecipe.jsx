import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewRecipe, getDiets } from "../actions";
import './CreateRecipe.css';


const validate = (input) => {
    let errors = {};
    
    if(!input.name){
        errors.name = 'Debes especificar un nombre para la receta'
    } 
    
    if(!input.resume){
        errors.name = 'Debes especificar un resumen para la receta'
    }
    
    if(!input.rate){
        errors.rate = 'Debes especificar un puntaje para la receta'
    } else if (input.rate > 100 || input.rate < 0 ){
        errors.rate = 'El puntaje debe estar entre 0 y 100'
    }
    
    if(!input.healthy_level){
        errors.healthy_level = 'Debes especificar un puntaje de salud para la receta'
    } else if(input.healthy_level > 100 || input.healthy_level < 0) {
        errors.healthy_level = 'El puntaje de salud debe estar entre 0 y 100'
    }

    if(!input.diet.length){
        errors.diet = 'Las dietas no pueden estar vacias'
    }

    return errors
}

const CreateRecipe = () => {
    // uso de redux
    const dispatch = useDispatch();
    const diets = useSelector( (state)=>state.diets)
    useEffect(()=>{
        dispatch(getDiets())
    },[]);
    // declaracion estados locales 
    const [input, setInput] = useState({
        name: '',
        resume: '',
        rate: '',
        healthy_level: '',
        instructions: '',
        img: '',
        diet: []
    })
    const [errors, setErrors] = useState({})


    // handle functions
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    const handleDiets = (e) => {
        if(!input.diet.includes(e.target.value) && e.target.value !== '-'){
            setInput({
                ...input,
                diet: [...input.diet, e.target.value]
            })
            setErrors(validate({
                ...input,
                diet: [...input.diet, e.target.value]
            }))
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
        if(!Object.values(errors).length){
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
    }
    return(
        <div>
            <Link to='/home'><button> Volver </button></Link>
            <h2> Crea tu propia receta </h2>
            <form>
                <div>
                    <label> Nombre </label>
                    <input type='text' value={input.name} name='name' onChange={(e)=> handleChange(e)} />
                    {errors.name && (<p className='agregarClassnameParaErroresJeEJE'>{errors.name}</p>) }
                </div>
                <div>
                    <label> Resumen </label>
                    <input type='text' value={input.resume} name='resume' onChange={(e)=> handleChange(e)}/>
                    {errors.resume && (<p className='agregarClassnameParaErroresJeEJE'>{errors.resume}</p>) }
                </div>
                <div>
                    <label> Calificacion </label>
                    <input type='number' value={input.rate} name='rate' onChange={(e)=> handleChange(e)}/>
                    {errors.rate && (<p className='agregarClassnameParaErroresJeEJE'>{errors.rate}</p>) }
                </div>
                <div>
                    <label> Nivel de Saludable </label>
                    <input type='number' value={input.healthy_level} name='healthy_level' onChange={(e)=> handleChange(e)}/>
                    {errors.healthy_level && (<p className='agregarClassnameParaErroresJeEJE'>{errors.healthy_level}</p>) }
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
                    <option>-</option>
                        {   
                            
                            diets.map((d) => {
                                return(
                                <>
                                <option value={d.name} >{d.name}</option>
                                </>
                                
                            )}) 
                            
                        }
                    </select>
                    {errors.diet && (<p className='agregarClassnameParaErroresJeEJE'>{errors.diet}</p>) }
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