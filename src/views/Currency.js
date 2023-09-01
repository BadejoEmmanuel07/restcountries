import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";
const api = 'https://restcountries.com/v3.1/all';
const find = `https://restcountries.com/v3.1/currency/`
const Currency = () => {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState("")
    const [loaderquery, setLoaderQuery] = useState(false)
    const [query, setQuery] = useState("")
    const [dataquery, setDataQuery] = useState([]);
    const [dataerror, setDataError] = useState("");

    const handleInput = (e) => {
        setQuery(e.target.value)
    }
    const fetchsecondData = async () => {
        try {
            setError("")
            setLoader(true)  //loading will start from here 
            const resposne = await fetch(api)
            if (!resposne.ok) {
                throw new Error("something happened")
            }
            const data = await resposne.json()
            setData(data)
            setLoader(false)  // remove the true 
            setError("")
        } catch (err) {
            console.log(err.message)
            setError(err.message) /// set the error state 
        }
    }
    useEffect(() => {
        fetchsecondData()
    }, []);
    useEffect(() => {
        async function findData() {
            try {
                setLoaderQuery(true)
                setDataError("")
                const res = await fetch(`${find}${query}`);
                if (!res.ok) throw new Error("cant find countries !!!!!!")
                const data = await res.json();
                setDataQuery(data)
                setDataError("")
                console.log(data)
            } catch (err) {
                setDataError(err.message)
            } finally {
                setLoaderQuery(false)
            }
        }
        if (query.length < 3) {
            setDataQuery([])
            setDataError("")
            return
        }
        findData()
    }, [query])

    return (
        <div>
            <div>
                {query}
                <input className="form-control" value={query} onChange={handleInput} />
                {loaderquery && <h1>LOADING PLEASE WAIT</h1>}
                {!dataerror && !loaderquery && <List list={dataquery} />}

                {dataerror && <h1> ERROR</h1>}
            </div>

            <div className="">
                <div className="" style={{ margin: 'auto', marginTop: "119px" }}>
                    <h3 className="text-center">All COUNTRIES </h3>
                    {loader && <Loader />}
                    {error && <Error message={error} />}
                    {/* {!error &&  !loader  &&  <List list={data} />} */}
                </div>
            </div>
        </div>
    )
}

function Error({ message }) {
    return <h1 className="text-center text-danger">{message}</h1>
}
function Loader() {
    return <div style={{ margin: 'auto', width: '78%' }}><Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    /></div>
}

function List({ list }) {
    return (
        <div className="d-flex flex-wrap justify-content-space-around" >
            {list.map((item, index) => {
                return (
                    <Card sx={{ maxWidth: 215 }} key={index} className="m-2">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="195"
                                image={item.flags.png}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name.common}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {/* {item.name.common} */}
                                </Typography>
                                <Typography variant="body2" className='mt-2' color="text.secondary">
                                    <span className='p-1 '>Population</span>  {item.population}
                                </Typography>

                                <Typography variant="body2" className='mt-2' color="text.secondary">
                                    <span className='p-1'>Region</span>     {item.region}
                                </Typography>
                            </CardContent>

                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                more
                            </Button>
                        </CardActions>
                    </Card>
                )
            })}
        </div>
    )
}
export default Currency;