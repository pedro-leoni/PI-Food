import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewRecipe, getDiets } from "../actions";
import styles from './CreateRecipe.module.css';


const validate = (input) => {
    let errors = {};
    
    if(input.name){
        if(input.name.length > 30){
            errors.name = 'This field cannot contain more than 30 characters'
        } else if(input.name.replace(/ /g, "").match(/[^A-Za-z0-9]/)){
            errors.name ='This field can only contain letters'
        }
    }else{
        errors.name = 'This field is required'
    }

    if(input.resume){
        if(input.resume.length > 160){
            errors.resume= 'This field cannot contain more than 160 characters'
        } else if(input.resume.replace(/ /g, "").match(/[^A-Za-z0-9]/)){
            errors.resume= 'This field can only contain letters'
        }
    } else{
        errors.resume = 'This field is required'
    }
    
    if(input.rate){
        if((input.rate > 100 || input.rate < 0 )){
            errors.rate = 'The score can be between 1 and 100'
        }
    } else {
        errors.rate = 'This field is required'
    }
    
    if(input.healthy_level){
        if(input.healthy_level > 100 || input.healthy_level < 0){
            errors.healthy_level = 'The score can be between 1 and 100'
        }
    } else {
        errors.healthy_level = 'This field is required'
    }

    if(!input.diet.length){
        errors.diet = 'This field is required'
    }

    if(input.instructions){
        if(input.instructions.replace(/ /g, "").match(/[^A-Za-z0-9]/)){
            errors.instructions = 'This field can only contain letters'
        }
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
            if(input.name.length || input.diet.length || input.resume || input.rate || input.healthy_level ){
                dispatch(createNewRecipe(input))
                alert('Recipe created succesfully')
                setInput({
                    name: '',
                    resume: '',
                    rate: '',
                    healthy_level: '',
                    instructions: '',
                    img: '',
                    diet: []
                })
            } else {
                alert('The form cannot be empty')
            }
        } else {
            alert('Check Errors information in your screen')
        }
    }
    return(
        <div className={styles.container}>
            <section className={styles.top}>
                <Link to='/home'> <button className={styles.homeButton}> Home </button></Link>
                <h2> Create your own recipe </h2>
            </section>
            <section className={styles.space}> 
                <form className={styles.formBox}>
                    <div>
                        <label> Name </label>
                        <input className={errors.name ? 'danger' : styles.labels} type='text' value={input.name} name='name' onChange={(e)=> handleChange(e)} />
                        {errors.name && (<p className='danger'>{errors.name}</p>) }
                    </div>
                    <div>
                        <label> Resume </label>
                        <input className={errors.resume ? 'danger' : styles.labels } type='text' value={input.resume} name='resume' onChange={(e)=> handleChange(e)}/>
                        {errors.resume && (<p className='danger'>{errors.resume}</p>) }
                    </div>
                    <div>
                        <label> Rate </label>
                        <input className={errors.rate ? 'danger' : styles.labels } type='number' value={input.rate} name='rate' onChange={(e)=> handleChange(e)}/>
                        {errors.rate && (<p className='danger'>{errors.rate}</p>) }
                    </div>
                    <div>
                        <label> Healthy Level </label>
                        <input className={errors.healthy_level ? 'danger' : styles.labels } type='number' value={input.healthy_level} name='healthy_level' onChange={(e)=> handleChange(e)}/>
                        {errors.healthy_level && (<p className='danger'>{errors.healthy_level}</p>) }
                    </div>
                    <div>
                        <label> Image </label>
                        <input className={ styles.labels } type='text' value={input.img} name='img' onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div>
                        <label> Instructions </label>
                        <textarea className={errors.instructions ? 'danger' :  styles.labels } value={input.instructions} name='instructions' onChange={(e)=> handleChange(e)}/> 
                        {errors.instructions && (<p className="danger">{errors.instructions}</p>)}
                    </div>
                    <div>
                        <select className={errors.diets ? 'danger' :  styles.labels } onChange={(e)=>handleDiets(e)}>
                        <option value='-'> Select Diet Types</option>
                            {   
                                diets.map((d) => {
                                    return(
                                    <option value={d.name} >{d.name}</option>
                                )}) 
                            }
                        </select>
                        {errors.diet && (<p className='danger'>{errors.diet}</p>) }
                        <ul>
                                {
                                    input.diet.map( e=>{ 
                                        return(
                                            <li >
                                                <button className={styles.closeButton} value={e} onClick={(e)=>handleRemoveDiet(e)}>x</button>
                                                {e + " "}
                                            </li>
                                        )
                                    })
                                }
                        </ul>
                    </div>
                    <div>
                        <button className={Object.values(errors) ? 'danger' : styles.submit} type="submit" onClick={(e)=>handleSubmit(e)}> Create recipe </button>
                    </div>
                </form>

            </section>
        </div>
    )
}

export default CreateRecipe