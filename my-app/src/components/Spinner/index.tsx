import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'
import ClipLoader from "react-spinners/ClipLoader";
import './index.css'

const Spinner = observer(() => {
    const { themeStore } = useStores()
    const { theme } = themeStore
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
})

export default Spinner