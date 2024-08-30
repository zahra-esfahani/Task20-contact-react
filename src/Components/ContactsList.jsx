import React from 'react'
import styles from "./ContactsList.module.css";

function ContactsList({data:{email,name,lastName,id} , setAlert}) {
  return (
<>

<div className={styles.container}>
    <div >
      {name} {lastName}
    </div>
    <div>
      <span>Ⓜ️</span> {email}
    </div>
    <div >
      <span>📞</span> {name}
    </div>
    <div><button onClick={()=>deleteHandler(id)}>🪣</button></div>
    </div></>



  )
}

export default ContactsList