import React, { useEffect } from 'react'
import {preLoaderAnim} from '../../animations';
 import '../style/Preloader.css'
 import img1 from '../img/icon.png';

const Preloader = () => {

    useEffect(() => {
        preLoaderAnim();
      }, []);
  return (
    <div className='preloader'>
    <div className='texts-container'>
    <span>VÉRITÉ</span>
    <span>ROYALE</span>
    
    <span><img className='img' src={img1} alt='Preloader'/></span>
    </div>
    </div>
  )
}

export default Preloader