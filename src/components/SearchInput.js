import React, { useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    root: {
        width: '75%'
    }
}))


function SearchInput({ placeholder, onChange }) {
    const classes = useStyles()

    const handleOnChange = useCallback((event) => {
        onChange(event.target.value)

    }, [onChange])
    return (
        <>
            <TextField 
            placeholder={placeholder}
            onChange={handleOnChange}
            classes={{
                root: classes.root
            }}
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
