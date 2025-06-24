import './index.css'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'

const FailureView = observer(() => {
  const { themeStore } = useStores()
  const { theme } = themeStore
  return (
    <div data-testid="failureScreen" className="failureContainer">
      <img
        className="failureImage"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      />
      <h1
        className={`${
          theme === 'Dark'
            ? 'darkThemeHeadingFailure'
            : 'lightThemeHeadingFailure'
        } failureHeading`}
      >
        Oops! Something Went Wrong
      </h1>
      <p className="failurePara">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button className="failureButton">Retry</button>
    </div>
  )
})

export default FailureView
