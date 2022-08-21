import './Notification.css'

const Notification = ({message}) => {
    return (
    message !== ''?
    <div className="notification">
        {message}
    </div>: <></>
    )
}

export default Notification;