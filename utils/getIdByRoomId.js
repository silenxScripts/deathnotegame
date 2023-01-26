const getIdByRoomId=(data,roomId)=>{
    let id = ''
    let players = []
    data?.forEach((ele)=>{
        if(ele.id==roomId){
            id=ele.eleId
        }
    })
    return [id,players]
}

export default getIdByRoomId