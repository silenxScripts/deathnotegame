import { collection, query } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import s from './s.module.scss'

const RulePage = ({ room }) => {

    const [btnColor, setBtnColor] = useState('gray')
    const [players, setPlayers] = useState([])
    const [usable, setUsbale] = useState(true)

    const router = useRouter()

    const [rules, setRules] = useState([
        "Welcome to the world of Dewath Nwote where you require name and code to kill!",
        "At least three people are required to play the game",
        "There will be 5 rounds every will get a random word which will be there code (do not tell your code to anyone)",
        "One of the people will be randomly selected as the imposter, the imposter will not get any code.",
        "In each of the rounds you will get chance to draw something which indicates your word this will give chance to all to guess your code if an ally guesses the code then you will be safe and if an imposter guesses the name then he/she can eliminate you.",
        "If after one round no-one guessed your name then people get to vote any one who was suspicious during the drawing phase, during the drawing phase questions can be asked to the person drawing like what is the word related to and all, if after one round the imposter is voted out the allys win but if imposter kills all members except 1 imposter wins."
    ]);


    const q = query(collection(db, `playroom`));
    const [snapshots, loading] = useCollection(q)
    const data = snapshots?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    useEffect(() => {
        data?.forEach((ele) => {
            if (ele.id == room){
                setPlayers(ele.players)
            }
        })
    }, [snapshots])

    useEffect(() => {
        if (players.length >= 3) {
            setBtnColor('darkcyan')
        }
        else {
            setBtnColor('gray')
        }
    })


    return (
        <>
            <div className={s.wrapper}>
                <div className={s.playerList}>
                    <h1>Current players</h1>
                    <ul>
                        {
                            players?.map((v, i) => (
                                <li key={i}>{v}</li>
                            ))
                        }
                    </ul>
                    <div className={s.btns}>
                        <button
                            style={{
                                background: btnColor,
                                pointerEvents: usable ? 'all' : 'none'
                            }}
                        >Play</button>
                        <button
                            style={{
                                pointerEvents: usable ? 'all' : 'none'
                            }}
                            onClick={() => {
                                localStorage.setItem("logout",[localStorage.getItem('name'),localStorage.getItem('roomId')])
                                localStorage.setItem("name", "")
                                localStorage.setItem("roomId", "")
                                router.push('/')
                            }}
                        >Exit Room</button>
                    </div>
                </div>
                <div className={s.rules}>
                    <h1>Rules</h1>
                    <ul>
                        {
                            rules?.map((v, i) => (
                                <li key={i}>{v}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default RulePage