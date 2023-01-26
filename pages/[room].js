import { collection, query } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import RulePage from '../components/rules/rulePage'
import { db } from '../firebase'

const Room = () => {

    const router = useRouter()

    const { room } = router?.query

    const [playerName, setPlayerName] = useState()
    const [roomId, setRomeId] = useState()
    const [players, setPlayers] = useState([])

    const q = query(collection(db, `playroom`));
    const [snapshots, loading] = useCollection(q)
    const data = snapshots?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    useEffect(() => {
        setPlayerName(localStorage.getItem('name'))
        setRomeId(localStorage.getItem('roomId'))
        data?.forEach((ele) => {
            if (ele.id == room) {
                setPlayers(ele.players)
            }
        })
    }, [])

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100vw', height: '100vh'
                }}
            >
                <h1>Dewath Nwote<br/>Loading...</h1>
            </div>
        )
    }
    else{
        return(
            <RulePage room={roomId}/>
        )
    }

}

export default Room