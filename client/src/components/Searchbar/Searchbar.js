import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogameByName } from '../../Redux/Actions';
import'./searchbar.css'


export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value);
    
}    

function handleSubmit(e){
    e.preventDefault()
    if(!name.length){
        alert('Please enter a videogame');
    } else {
        dispatch(getVideogameByName(name));//name es lo q está escribiendo el usuario
        setName('');
    }
};
    

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
        <div className='search_container'>
            <input className='search'
            type = 'text'
            value = {name}
            placeholder='Search videogame ...'
            onChange={(e) => handleInputChange(e)} 
            />
            
            <button className='button_search' type='submit'>🔎</button>
          
        </div>
        </form>
    )
}