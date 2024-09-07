import { useState } from "react";
import styles from "./ContactsList.module.css";
import Modal from "./Modal";
function ContactsList({
  data: { email, name, lastName, phoneNumber, id },
  deleteHandler,
  editHandler,
  itemsDelete,
  groupDeleteHandler,
  setNotifeEdit,
  modal,
  setModal,
  modalHandler,
}) {
  const [deleteEdit, setDeleteEdit] = useState(false);
  const [select , setSelect]=useState(false)
  const clickHandler = () => {
    setDeleteEdit(true);
  };

  const addEditButtonHandler = () => {
    editHandler(id);
    setNotifeEdit(true);
  };
  return (
    <>
      {modal && (
        <Modal
          modal={modal}
          setModal={setModal}
          deleteHandler={deleteHandler}
          id={id}
          setDeleteEdit={setDeleteEdit}
        />
      )}
      <div className={styles.container}>
        <div>
          {name} {lastName}
        </div>
        <div>
          <span>Ⓜ️</span> {email}
        </div>
        <div>
          <span>📞</span> {phoneNumber}
        </div>
        <div>
          {itemsDelete && (
            <button onClick={() => {groupDeleteHandler(id) , setSelect(true)}} className={select ?styles.selectButton:styles.diffButton}>انتخاب</button>
          )}
          {!deleteEdit && <button onClick={clickHandler}>...</button>}
          {deleteEdit && (
            <>
              <button onClick={modalHandler} className={styles.norButton}> حذف</button>
              <button onClick={addEditButtonHandler} className={styles.norButton}>ویرایش</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ContactsList;
