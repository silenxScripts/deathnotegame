import { collection, deleteDoc, doc, query, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import '../styles/globals.scss'
import checkEmptyRooms from '../utils/checkEmptyRooms';
import getIdByRoomId from '../utils/getIdByRoomId';


export const deleteById = async (id) => {
  try {
    await deleteDoc(doc(db, "playroom", id));
    console.log(`deleted ${id}-Reason: No players`)
  } catch (error) {
    console.log(error)
  }
}

const handleEmptyRooms = (data) => {
  const emptyRooms = checkEmptyRooms(data)
  emptyRooms?.forEach(id => deleteById(id))
}

const handleUserLogOut = async (data) => {
  const dat = await localStorage?.getItem('logout')
  console.log(dat)
  if(!dat)return
  const name = dat.split(',')[0]
  const roomId = dat.split(',')[1]
  const [id, players] = getIdByRoomId(data, roomId)
  if(!id || !players)return
  delete players[players.indexOf(name)]
  localStorage.setItem("logout", ["",""])
  const updateById = async (id) => {
    await updateDoc(doc(db, `playroom/${id}`), {
      players: players
    })
  }
  try {
    updateById(id)
  } catch (error) {
    //
  }
}

function MyApp({ Component, pageProps }) {

  const q = query(collection(db, `playroom`));
  const [snapshots, loading] = useCollection(q)
  const data = snapshots?.docs.map((doc) => ({
    eleId: doc.id,
    ...doc.data(),
  }));

  useEffect(() => {
    setInterval(() => {
      handleEmptyRooms(data)
      handleUserLogOut(data)
    }, 5000);
  })

  return (
    <Component {...pageProps} />
  )
}

export default MyApp
