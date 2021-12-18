import React, { Component } from 'react'
import * as Yup from 'yup';
import {Formik, Field, Form} from 'formik';

const formSchema = Yup.object().shape({
    "season": Yup.number().typeError('You must specify a number').integer('Whole number please').moreThan(1949, "Enter a year 1950 or later").lessThan(2022,"Enter a year 2021 or before").required("Required"),


    "round":Yup.number().typeError('You must specify number').integer('Whole number please').min(1,"Round number must be 1-20").max(20, "Round number must be between 1 and 20").required("Required")
}) 


const initialValues = {
    season: '',
    round: ''
}


export default class Home extends Component {

    constructor() {
        super();
        this.state={
            racers:[]
        }
    }
    render() {
        return (
            <div>
                <h1>API Racer Data</h1>

                <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={()=>console.log("Form Submitted")}
                >
                {
                    ({errors, touched})=>(
                        <Form>
                            <label htmlFor="season" className="form label">Season</label>
                            <Field name="season" className="form-control"/>
                            {errors.season && touched.season ? (<div style={{color:'red'}}>{errors.season}</div>):null}
                            <label htmlFor="round" className="form label">round</label>
                            <Field name="round" className="form-control"/>
                            {errors.round && touched.round ? (<div style={{color:'red'}}>{errors.round}</div>):null}

                            <button typle="submit" className="btn btn-primary">Searche</button>

                        </Form>
                    )
                }

                </Formik>


            </div>
        )
    }
}
