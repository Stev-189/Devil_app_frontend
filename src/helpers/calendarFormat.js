
export const calendatFormat = (data=[]) => {
    return data.map(e=>{
        return {
            ...e,
            start:new Date(e.start),
            end:new Date(e.end)
        }
    })
}