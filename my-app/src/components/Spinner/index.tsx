import ClipLoader from "react-spinners/ClipLoader";
import './index.css'

export default function Spinner() {
    return (
        <div className="loaderStyling">
            <ClipLoader color = {"blue"} loading = {true} size = {100}/>
        </div>
    )
}