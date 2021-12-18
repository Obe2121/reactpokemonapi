import React, { Component } from 'react'
import * as Yup from 'yup';
import {Formik, Field, Form} from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

const formSchema = Yup.object().shape({
    "name": Yup.string().typeError('You must provide a Pokemon Name').required("Required")



}) 


const initialValues = {
    name: ''
}


export default class Home extends Component {

    constructor() {
        super();
        this.state={
            pokemon:[],
            badName:false
        }
    }

    handleSubmit=({name})=>{
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then(res=>res.json())
        .then(data=>{
          this.setState({
            pokemon: [data],
            badName:false
          }, ()=>console.log(this.state.pokemon))
        })
        .catch(error=>{console.error(error); this.setState({badName:true})})


    }
    render() {
        return (
            <div>
                <h1>Pokemon</h1>
                {this.state.badName ? <small style={{color:'red'}}>Invalid Pokemon Name</small>:""}
                <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={
                  (values, {resetForm})=>{
                    this.handleSubmit(values);
                    resetForm(initialValues);



                  }
                }
                >
                {
                    ({errors, touched})=>(
                        <Form>
                            <label htmlFor="name" className="form label">Pokemon</label>
                            <Field name="name" className="form-control"/>
                            {errors.pokemon && touched.pokemon ? (<div style={{color:'red'}}>{errors.pokemon}</div>):null}<br/>

                            <button type="submit" className="btn btn-primary">Search</button>

                        </Form>
                    )
                }

                </Formik>
                
                <Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Base HP</th>
      <th>Base Attack</th>
      <th>Base Defense</th>
    </tr>
  </thead>
  <tbody>
      {this.state.pokemon.map(
        pokemon=> (
          <tr key={pokemon.name}>
            <td>{pokemon.name}</td>
            <td>{pokemon.stats[0].base_stat}</td>
            <td>{pokemon.stats[1].base_stat}</td>
            <td>{pokemon.stats[2].base_stat}</td>
          </tr>

        )
      )
      
      }
  </tbody>
</Table>

            </div>
        )
    }
}
