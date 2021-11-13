// const route = process.env.NODE_ENV 
const route = () => {
    if (process.env.NODE_ENV = 'production') {
        return '/'
    }
    else {
        return 'http://localhost:8000/'
    }
}

export default route