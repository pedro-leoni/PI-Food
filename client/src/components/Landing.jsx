import  React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
    return(
        <div className={styles.background}>
               <div className={styles.landing}>
                    <div className={styles.title}>
                        <h1> All recipes <br/> <br/>in one place</h1>
                    </div>
                    <Link to='/home'>
                        <button className={styles.button}> Lets go </button>
                    </Link>
               </div> 
                 
        </div>
    )
}


export default Landing