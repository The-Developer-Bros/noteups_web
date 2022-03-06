import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({

    search_bar: {
        display: 'flex',
        justifyContent: 'center',
        width: '80%',
        // "@media (max-width: 600px)": {
        //     width: '60%',
        // },
    },

});

const SearchBar = () => {

    const items = [
        {
            id: 0,
            name: 'Cobol'
        },
        {
            id: 1,
            name: 'JavaScript'
        },
        {
            id: 2,
            name: 'Basic'
        },
        {
            id: 3,
            name: 'PHP'
        },
        {
            id: 4,
            name: 'Java'
        }
    ]

    const handleOnSearch = (string, results) => {
        console.log(string, results)
    }

    const handleOnHover = (result) => {
        console.log(result)
    }

    const handleOnSelect = (item) => {
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
                <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
            </>
        )
    }


    const classes = useStyles();

    return (
        <div className={classes.search_bar}>

            <div style={{ width: 800 }}>
                <ReactSearchAutocomplete
                    items={items}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                />
            </div>
        </div>
    )
}

export default SearchBar