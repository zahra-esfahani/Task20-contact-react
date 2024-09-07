import React from "react";
import styles from "./ContactsPage.module.css";
import ContactsList from "./ContactsList";
import Modal from "./Modal";
import { useEffect } from "react";
function ContactOptions({
  allContacts,
  search,
  setSearch,
  searchHandler,
  itemsDeleteHandler,
  finallydeleteGroup,
  deleteHandler,
  editHandler,
  itemsDelete,
  groupDeleteHandler,
  notifeEdit,
  setNotifeEdit,
  modal,
  setModal,
  modalHandler,
  step,
  setStep,
  clickeditModal,
  setClickEditModal,
  groupDeleteModal,
  setModalGroup,
  modalGroup,
  setItemsDelete,
  alert,
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
      <div className={alert ? styles.modalOn : styles.modal}>{alert}</div>

      {!allContacts.length ? (
        <>
          {setStep(1)}
          <div className={styles.dataParent}>
            <p>کاربری وجود ندارد</p>
          </div>
        </>
      ) : (
        <>
          {modalGroup && (
            <Modal
              finallydeleteGroup={finallydeleteGroup}
              modalGroup={modalGroup}
              setModalGroup={setModalGroup}
              setItemsDelete={setItemsDelete}
            />
          )}
          <div className={styles.inputFind}>
            <input
              type="text"
              placeholder="نام و ایمیل مورد نظر را وارد نمایید"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={searchHandler} className={styles.normalButton}>پیدا</button>
            <button onClick={itemsDeleteHandler} className={styles.normalButton}>حذف گروهی</button>
            {itemsDelete && <button onClick={groupDeleteModal} className={styles.diffButton}>حذف</button>}
            <button onClick={() => setStep(1)}className={styles.normalButton}>اضافه کاربر جدید</button>
          </div>
          {allContacts.map((i) => (
            <ContactsList
              key={i.id}
              data={i}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              itemsDelete={itemsDelete}
              groupDeleteHandler={groupDeleteHandler}
              notifeEdit={notifeEdit}
              setNotifeEdit={setNotifeEdit}
              modal={modal}
              setModal={setModal}
              modalHandler={modalHandler}
              step={step}
              setStep={setStep}
              clickeditModal={clickeditModal}
              setClickEditModal={setClickEditModal}
            />
          ))}
        </>
      )}
    </>
  );
}

export default ContactOptions;
