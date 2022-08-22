import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";

export function Home() {
    return (
        <div>
            <h1>home??</h1>
            <nav>
                <Link to="home">민-욱-님</Link><br/>
                <Link to="home">정-현-님</Link><br/>
                <Link to="compilation">compilation</Link>
            </nav>
        </div>
    )
}

export function Compilation() {
    return(
        <div>
            Compilation
        </div>
    )
}