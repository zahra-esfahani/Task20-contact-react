import React from "react";
import styles from "./Modal.module.css";
function Modal({
  setModal,
  modal,
  deleteHandler,
  id,
  setDeleteEdit,
  setEditModal,
  editModal,
  buttonEditHandler,
  clickeditModal,
  setClickEditModal,
  finallydeleteGroup,
  modalGroup,
  setModalGroup,
  setItemsDelete
}) {
  const closeModal = () => {
    setModal(false); 
    setDeleteEdit(false); 
  };

  const confirmDelete = () => {
    deleteHandler(id); 
    closeModal(); 
  };
  const confirmgroupDelet = () => {
    finallydeleteGroup();
    setModalGroup(false);
  };

  return (
    <div className={styles.parent}>
      <div >
        <h2>آیا مطمئن هستید؟</h2>
        <p>این عملیات غیرقابل برگشت خواهد بود.</p>
        {clickeditModal && (
          <>
            {" "}
            <button
              onClick={() => {
                buttonEditHandler(); 
                setClickEditModal(false);
              }}
            >
              ذخیره تغییرات
            </button>
            <button onClick={closeModal}>انصراف</button>
          </>
        )}

        {modal && (
          <>
            <button onClick={confirmDelete} >
              بله، حذف شود
            </button>
            <button onClick={closeModal} >
              انصراف
            </button>
          </>
        )}
        {modalGroup && (
          <>
            <button
              onClick={confirmgroupDelet}
            >
              بله، حذف شوند
            </button>
            <button
              onClick={() => {
                setModalGroup(false) ; setItemsDelete(false)
              }}
            >
              انصراف
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
