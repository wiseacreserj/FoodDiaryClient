const getDate = (dateString) =>{
    let date = new Date(dateString)
    return date.toLocaleString("ru")
}

export {getDate}