import  React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = (props) => {
    return(
        <div className='landing'>
            <h1> soy la landing </h1>
            <Link to='/home'>
                <button> tocame para mas placer </button>
            </Link>
        </div>
    )
}


export default Landing