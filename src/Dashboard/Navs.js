import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"






function Navs() {
    return ( 
        <div>
            <Link to="/dashboard/users">User</Link>
            <Link to="/dashboard/header">Header</Link>
            <></>

            <Outlet/>
        </div>
    )
}

export default Navs