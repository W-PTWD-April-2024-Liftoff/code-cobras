import React from 'react'
import Filter from '../layout/Filter'

export default function Home() {
    return (
        <div className='container-fluid'>
            <h1>Welcome to Polyglot!</h1>
            <p>Our community is focused on creating a welcoming enviroment to individuals new and experienced in the world of 
                creating constructed languages. From Dothraki to Sindarin Elvish, we've got it all! 
            </p>
            <Filter></Filter>
        </div>
    )
}