import { Audio, ProgressBar, RotatingLines } from 'react-loader-spinner'

export const ProgressLoad = () => {
    return (
        <ProgressBar
            visible={true}
            height="80"
            width="100"
            color="#0000"
            barColor="#F4442E"
            borderColor="#000"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
};

export const RotatingLoad = () => {
    return (

        <RotatingLines
            visible={true}
            height="50"
            width="50"
            strokeColor="#c3c3c3"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
};