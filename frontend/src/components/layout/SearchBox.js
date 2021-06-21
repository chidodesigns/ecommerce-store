import React, {useState} from 'react'
import classes from './SearchBox.module.css'
import {Form, Button} from 'react-bootstrap'

const SearchBox = ({history}) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} className={classes.searchBoxForm}>
            <Form.Control type="text" name="q" onChange={(e) => setKeyword(e.target.value)} placeholder="Search Products..." className="mb-2 mr-sm-2"/>
            <Button type="submit" variant="outline-success" className="mb-2">
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
