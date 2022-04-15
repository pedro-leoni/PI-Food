import  React from 'react';
import { Link } from 'react-router-dom';

const Landing = (props) => {
    return(
        <div className='App'>
            <h1> soy la landing </h1>
            <Link to='/home'>
                <button> tocame para mas placer </button>
            </Link>
        </div>
    )
}


export default Landing