import { Input } from 'antd';
import React, {  useState } from 'react'

const { Search } = Input;

type Note = {
    id: string, title: string, body: string
}
type Props = {
    setNotes: any,
    notes: Note[]
}

type dummyNote = {
    value: Note[] | null
}
const dummyNote: dummyNote ={
    value: null
}
const SearchBar = ({setNotes, notes}: Props) => {
    const [search, setSearch] = useState('');
    if(!dummyNote.value){
        dummyNote.value = notes
        // console.log('value updated')
    }
    const onSearch = ()=>{
        const resultNote = dummyNote.value?.filter(
            (e)=>{
                if(e.body.toLowerCase().includes(search.toLowerCase()) || e.title.toLowerCase().includes(search.toLowerCase())){
                    return e
                }
            }
        )
        setNotes(resultNote)
    }

    return (
        <div className='p-2 px-4'>
            {/* <TextField id="outlined-basic" label="Search" variant="outlined" /> */}
            <Search placeholder="Search Notes" onSearch={onSearch} enterButton  onChange={(e)=>{setSearch(e.target.value)}} className='w-full' />
        </div>
    )
}

export default SearchBar