const checkEmptyRooms=(data)=>{

    const listOfEmptyRooms = []

    data?.forEach(element => {
        if(!element.players.length){
            listOfEmptyRooms.push(element.eleId)
        }
    });

    return listOfEmptyRooms
}

export default checkEmptyRooms