import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query } from 'firebase/firestore'
import { db } from '../firebase'
import Form from '../components/form/form'

const Home = () => {

    const [playerName, setPlayerName] = useState('')
    const [roomId, setRoomId] = useState('')
    const router = useRouter()
    const [logged, setLogged] = useState(false)

    const q = query(collection(db, `playroom`));
    const [snapshots, loading] = useCollection(q)
    const data = snapshots?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    useEffect(() => {
        setPlayerName(localStorage.getItem('name'))
        setRoomId(localStorage.getItem('roomId'))
        if (playerName && roomId) {
            for (const block of data) {
                if (block.id == roomId && block.players.includes(playerName)) {
                    setLogged(true)
                }
            }
        }
    }, [data])

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

    if (logged && (!loading)) {
        //There is playername and roomid in localstorage thus let em go to the room straight
        router.push(`/${roomId}`)
    }
    else {
        return (
            <>
                <Form
                    setLogged={setLogged}
                    setPlayerName={setPlayerName}
                    setRoomId={setRoomId}
                />
            </>
        )
    }
}

export default Home