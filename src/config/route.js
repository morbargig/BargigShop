// const route = process.env.NODE_ENV 
const route = () => {
    if (process.env.NODE_ENV === 'production') {
        return '/api/'
    }
    else {
        return 'http://localhost:8000/api/'
    }
}

export default route