import React, { useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'


function SearchInput({ placeholder, onChange }) {

    const handleOnChange = useCallback((event) => {
        onChange(event.target.value)

    }, [onChange])
    return (
        <>
            <TextField 
            placeholder={placeholder}
            onChange={handleOnChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                )
            }}

            />
        </>
    )
}

export default SearchInput
