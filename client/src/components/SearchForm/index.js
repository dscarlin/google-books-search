import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import style from "./style.module.css";
import navStyle from "../AppNavbar/style.module.css";
const SearchForm = props => {
    const [book, setBook] = React.useState([]);
    const handleChange = e => setBook(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();
        props.getBook(book);
    };
    return(
        <Form inline className={style.auto} onSubmit={ handleSubmit }>
            <FormGroup className="mb-2 mr-2 mb-sm-0">
                <Input 
                    className="mr-sm-2"
                    type="text" 
                    name="title" 
                    id="title" 
                    value={ book } 
                    placeholder="Book Title"
                    onChange={ handleChange }
                />
            </FormGroup>
            
            <Button className={`${style.button} ${navStyle.ripple}`} onClick={ handleSubmit }>Search</Button>
        </Form>
    );
};
export default SearchForm;