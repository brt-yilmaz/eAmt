'use client'

import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { words } from '@/app/library/data';

const SearchPanel = () => {


    const [activeSearch, setActiveSearch] = useState([])

    const handleSearch = (e) => {
        if (e.target.value == '') {
            setActiveSearch([])
            return false
        }
        setActiveSearch(words.filter(w => w.includes(e.target.value)).slice(0,8))
        
    }

    return (
        <form className='w-[500px] relative'>
            <div className="relative">
                <input type='search' 
                       placeholder='Type Here '
                       onChange={(e) => handleSearch(e)}
                       className='w-full h-[40px] p-4 rounded-full bg-btSearch'/>
                <button className='absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-btSearch rounded-full'>
                    <AiOutlineSearch />
                </button>
            </div>

            {
                activeSearch.length > 0 && (
                   <div className="
                absolute 
                top-20
                p-4
                bg-btSearch
                text-bg-btSearch w-full
                rounded-xl left-1/2
                -translate-x-1/2
                flex flex-col
                gap-2">

                    {
                        activeSearch.map((s, index) => (
                            <span key={index}>{s}</span>
                        ))
                    }
                    
                </div> 

                
                )
            }

            
        </form>
    );
}

export default SearchPanel;