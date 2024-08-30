import { useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {ThemeContext} from '../ThemeContext'
import './index.css'

export default function Spinner() {
    const context = useContext(ThemeContext)
    const {theme} = context
    const renderData = ()=>{
        if(theme === "Dark"){
            return (
            <div className="loaderStyling">
            <ClipLoader color = {"#FFFFFF"} loading = {true} size = {100}/>
        </div>)
        }
        return <div className="loaderStyling">
        <ClipLoader color = {"black"} loading = {true} size = {100}/>
    </div>
    }
    return (
        renderData()
    )
}