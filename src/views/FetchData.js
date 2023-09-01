import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Circles } from "react-loader-spinner";

const api = "https://restcountries.com/v3.1/all";
const find = "https://restcountries.com/v3.1/name/";

const FetchData = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [loaderquery, setLoaderQuery] = useState(false);
  const [query, setQuery] = useState("");
  const [dataquery, setDataQuery] = useState([]);
  const [dataerror, setDataError] = useState("");

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const fetchData = async (url) => {
    try {
      setError("");
      setLoader(true);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData(api).then((data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    if (query.length >= 3) {
      fetchData(`${find}${query}`)
        .then((data) => {
          setDataQuery(data);
          setDataError("");
        })
        .catch((err) => {
          setDataQuery([]);
          setDataError(err.message);
        })
        .finally(() => {
          setLoaderQuery(false);
        });
    } else {
      setDataQuery([]);
      setDataError("");
    }
  }, [query]);

  return (
    <div>
      <div>
        <input
          className="form-control"
          placeholder="Search by country name"
          value={query}
          onChange={handleInput}
        />
        {loaderquery && <h1>LOADING PLEASE WAIT</h1>}
        {!dataerror && !loaderquery && <List list={dataquery} />}

        {dataerror && <Error message={dataerror} />}
      </div>

      <div className="text-center mt-5">
        <h3>All COUNTRIES</h3>
        {loader ? <Loader /> : !error && <List list={data} />}
        {error && <Error message={error} />}
      </div>
    </div>
  );
};

function Error({ message }) {
  return <h1 className="text-center text-danger">{message}</h1>;
}

function Loader() {
  return (
    <div style={{ margin: "auto", width: "80px" }}>
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

function List({ list }) {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {list.map((item, index) => (
        <Card key={index} sx={{ maxWidth: 215 }} className="m-2">
          <CardActionArea>
            <CardMedia
              component="img"
              height="195"
              image={item.flags.png}
              alt={`${item.name.common} flag`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name.common}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Population: {item.population}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Region: {item.region}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              More
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default FetchData;
