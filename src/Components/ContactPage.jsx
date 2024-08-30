import React, { useState } from "react";
import styles from "./ContactsPage.module.css";
import ContactsList from "./ContactsList";
function ContactPage() {
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [allContacts, setAllContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const nameRegex = /^[\u0600-\u06FF]{3,}$/;

  const setLocalStorage = () => {
    const stringdData = JSON.stringify(item);
    localStorage.setItem("item", stringdData);
  };
  let item = JSON.parse(localStorage.getItem("item")) || [];

  const changeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setContact((contact) => ({ ...contact, [name]: value }));
  };
  const clickHandler = () => {
    if (!nameRegex.test(contact.name)) {
      setAlert("نام خود را به درستی وارد نمایید");
      return;
    }
    if (!contact.email.includes("@")) {
      setAlert("ایمیل خود را به درستی وارد نمایید");
      return;
    }
    if (!nameRegex.test(contact.lastName)) {
      setAlert("نام خانوادگی خود را به درستی وارد نمایید");
      return;
    }
    if (
      !contact.name ||
      !contact.lastName ||
      !contact.email ||
      !contact.phoneNumber
    ) {
      setAlert("لطفا فرم را کامل نمایید");
    } else {
      setContact({
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      });
      setAllContacts((contacts) => [...contacts, contact]);
      item.push(contact);
      setLocalStorage();
    }
  };
  console.log(item);
  return (
    <>
      <div className={alert ? styles.modalOn : styles.modal}>{alert}</div>
      <div className={styles.parent}>
        <h2>ورود</h2>
        <div className={styles.inputParent}>
          <input
            type="text"
            placeholder="نام خود را اضافه کنید"
            onChange={changeHandler}
            value={contact.name}
            name="name"
          />
          <input
            type="text"
            placeholder="نام خانوادگی خود را اضافه کنید"
            onChange={changeHandler}
            value={contact.lastName}
            name="lastName"
          />
          <input
            type="text"
            placeholder="شماره تماس خود را اضافه کنید"
            onChange={changeHandler}
            value={contact.phoneNumber}
            name="phoneNumber"
          />
          <input
            type="text"
            placeholder="ایمیل خود را اضافه کنید"
            onChange={changeHandler}
            value={contact.email}
            name="email"
          />
          <button className={styles.button} onClick={clickHandler}>اضافه</button>
        </div>
      </div>

      {!item.length ? (
        <div className={styles.dataParent}>
          <p>کاربری وجود ندارد</p>
        </div>
      ) : (
        item.map((i)=>(<ContactsList data={i} setAlert={setAlert}/>))
        
      )}
    </>
  );
}

export default ContactPage;
