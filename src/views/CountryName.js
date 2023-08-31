import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import NavLinks from "./NavLinks";


const CountryName = () => {
    const [search, setSearch] = useState("");
    const [error, setError] = useState("")
    const [onedata, setOneData] = useState([])
    const [queryData, setQueryData] = useState("")
    const [errorsecond, setErrorsecond] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value)
        setQueryData(e.target.value)
    }
    const fetchOneData = async (countryName) => {
        try {
            setError("")
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            if (!response.ok) throw new Error("something happen")
            const data = await response.json();
            setOneData(data)
            console.log(data)
            setError("")
        } catch (err) {
            setError(err.message)
        }
    }

    const searchButton = () => {
        fetchOneData(search)
    }
   
    return (
        <div>
            <div className="container ">
             
                <h2 className="text-center">Find Country By Name</h2>
                <input className="form-control" onChange={handleSearch} value={search} />
                <button onClick={searchButton} className="btn btn-success  mt-3 fw-bold">find</button>
            </div>
          
            

    
            {error && <h1 className="text-center text-danger"> Sorry Country not Found</h1>}

            {!error && onedata.map((item, index) => {
                return (
                    <div key={index} className="" style={{ margin: 'auto', width: "60%" }}>

                        <div>
                            <h3>{item.name.common}</h3>
                            <img src={item.flags.png} />
                            <div>
                                <span>population {item.population}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default CountryName