import { Link, Outlet } from "react-router-dom";

const NavLinks = () => {
    return (
        <div className="container m-4 p-3 text-center ">
            
            <ul class="nav justify-content-center">
                <li clasName="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link"  to="/CountryName">CountryName</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to="/Currency">Currency</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link " to="/language"> Language </Link>
                </li>

                <li class="nav-item">
                    <Link className="nav-link " to="/capitalcity"> Capital City </Link>
                </li>
            </ul>
            <Outlet/>

        </div>
    )
}


export default NavLinks