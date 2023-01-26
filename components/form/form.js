import { addDoc, collection, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import s from './s.module.scss'

const Form = ({ setLogged, setPlayerName, setRoomId }) => {

    const [name, setName] = useState("")
    const [roomId, setRoomIdHere] = useState("")
    const [log, setLog] = useState("User name between 5-12 chars")
    const [color, setColor] = useState('red')
    const [usable, setUsbale] = useState(true)

    const q = query(collection(db, `playroom`));
    const [snapshots, loading] = useCollection(q)
    const data = snapshots?.docs.map((doc) => ({
        ...doc.data(),
    }));


    useEffect(() => {
        if (!(name > 12) && !(name < 5) && roomId.trim() && name.trim()) {
            setColor('green')
            return
        }
        else {
            setColor('red')
        }
    }, [name, roomId])

    const submit = (e) => {
        setUsbale(false)
        e.preventDefault();
        const listOfIds = []
        data.forEach((ele, ind) => listOfIds.push(ele.id))
        if (listOfIds.includes(roomId)) {
            localStorage.setItem('name', name)
            localStorage.setItem('roomId', roomId)
            setPlayerName(name)
            setRoomId(roomId)
            setLogged(true)
        }
        else {
            addNewRoom()
        }
        setTimeout(() => {
            setUsbale(true)
        }, 5000);
    }

    const addNewRoom = async () => {
        await addDoc(collection(db, 'playroom'),
            {
                id: roomId,
                players: [name]
            })
        localStorage.setItem('name', name)
        localStorage.setItem('roomId', roomId)
        localStorage.setItem('logout',["",""])
        setPlayerName(name)
        setRoomId(roomId)
        setLogged(true)
    }


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw', height: '100vh'
        }}>
            <form className={s.form} onSubmit={(e) => submit(e)}>

                <h1>Put in da info</h1>

                <input
                    type="text"
                    placeholder='Name goes in here...'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        pointerEvents: usable ? 'all' : 'none'
                    }}
                />
                <input
                    type="text"
                    placeholder='Room id goes in here...'
                    value={roomId}
                    onChange={(e) => setRoomIdHere(e.target.value)}
                    style={{
                        pointerEvents: usable ? 'all' : 'none'
                    }}
                />

                <h2>{log}</h2>

                <button
                    style={{
                        pointerEvents: usable ? 'all' : 'none',
                        background: color
                    }}
                    type='submit'
                >Submit</button>

            </form>
        </div>
    )
}

export default Form