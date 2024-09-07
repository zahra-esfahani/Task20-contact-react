import React from "react";
import styles from "./ContactsPage.module.css";
import Modal from "./Modal";
import { useState ,useEffect } from "react";
function ContactForm({
  alert,
  changeHandler,
  contact,
  clickHandler,
  buttonEditHandler,
  notifeEdit,
  setNotifeEdit,
  step,
  setStep,
  modal,
  setModal,
  modalHandler,
  clickeditModal,
  setClickEditModal,
  modalEdit,
  setAlert
}) {

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert("")
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [alert]);
  return (
    <>
      {clickeditModal && (
        <Modal
          setModal={setModal}
          buttonEditHandler={buttonEditHandler}
          clickeditModal={clickeditModal}
          setClickEditModal={setClickEditModal}
        />
      )}
      <div className={alert? styles.modalOn : styles.modal}>{alert}</div>
      <div className={styles.parent}>
        {notifeEdit ? <h2>ویرایش</h2>:<h2>ورود</h2>}
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
          {notifeEdit ? (
            <>
              {" "}
              <button onClick={modalEdit} className={styles.button}>
                ویرایش
              </button>
            </>
          ) : (
            <button className={styles.button} onClick={clickHandler}>
              اضافه
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ContactForm;
