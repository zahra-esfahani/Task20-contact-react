import React, { useState } from "react";
import styles from "./ContactsPage.module.css";
import ContactsList from "./ContactsList";
import { getId } from "../helper/id";
import ContactForm from "./ContactForm";
import ContactOptions from "./ContactOptions";
function ContactPage() {
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [allContacts, setAllContacts] = useState([]);
  const [finallContacts, setFinallContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [search, setSearch] = useState("");
  const [idManage, setIdManage] = useState("");
  const [itemsDelete, setItemsDelete] = useState(false);
  const [contactsToDelete, setContactsToDelete] = useState([]);
  const [notifeEdit, setNotifeEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState(1);
  const [clickeditModal, setClickEditModal] = useState(false);
  const [modalGroup, setModalGroup] = useState(false);

  const nameRegex = /^[\u0600-\u06FF]{3,}$/;
  const numberRegex=/^09[0-9]{9}$/;


  const changeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setContact((contact) => ({ ...contact, [name]: value, id: getId() }));
  };
  const clickHandler = () => {
    if (
      !contact.name ||
      !contact.lastName ||
      !contact.email ||
      !contact.phoneNumber
    ) {
      setAlert("لطفا فرم را کامل نمایید");
      return;
    }
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
    if(!numberRegex.test(contact.phoneNumber)){
      setAlert("شماره موبایل خود را به درستی وارد کنید");
      return;
    }
    else {
      setContact({
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      });
      setAllContacts((contacts) => [...contacts, contact]);
      setFinallContacts((contacts) => [...contacts, contact]);
 
    }
    setStep(2);
  };

  const deleteHandler = (id) => {
    const newArray = allContacts.filter((i) => {
      return i.id !== id;
    });
    setAllContacts(newArray);
    setFinallContacts(newArray);

  };

  const searchHandler = () => {
    if (!search) {
      return setAllContacts(finallContacts);
    }

    const newSearchArray = finallContacts.filter((item) => {
      return (
        item.name.includes(search) ||
        item.email.includes(search) ||
        item.lastName.includes(search)
      );
    });

    if (newSearchArray.length === 0) {
      setAllContacts(finallContacts);
    } else {
      setAllContacts(newSearchArray);
    }
  };
  const editHandler = (id) => {
    const newContactInfo = allContacts.find((i) => i.id === id);
    const { name, lastName, email, phoneNumber } = newContactInfo;
    setContact({ name, lastName, email, phoneNumber });
    setIdManage(id);
    setStep(1);
  };

  const buttonEditHandler = () => {

    setAllContacts((contacts) =>
      contacts.map((contactItem) =>
        contactItem.id === idManage
          ? { ...contactItem, ...contact }
          : contactItem
      )
    );

    setFinallContacts((contacts) =>
      contacts.map((contactItem) =>
        contactItem.id === idManage
          ? { ...contactItem, ...contact }
          : contactItem
      )
    );
    if (
      !contact.name ||
      !contact.lastName ||
      !contact.email ||
      !contact.phoneNumber
    ) {
      setAlert("لطفا فرم را کامل نمایید");
      return;
    }
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
    if(!numberRegex.test(contact.phoneNumber)){
      setAlert("شماره موبایل خود را به درستی وارد کنید");
      return;
    }
    setContact({
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });
    setIdManage("");
    setNotifeEdit(false);
    setStep(2);
  };
  const itemsDeleteHandler = () => {
    setItemsDelete(true);
  };
  const groupDeleteHandler = (id) => {
    setContactsToDelete((prev) => {
      if (prev.includes(id)) {
        return prev.filter((contactId) => contactId !== id);
      }
      return [...prev, id];
    });
  };

  const finallydeleteGroup = () => {
    if (!contactsToDelete.length) {
      setItemsDelete(false);
      setModalGroup(false);
      setAlert("کاربری را انتخاب کنید");
      return;
    }
    const updatedContacts = allContacts.filter(
      (item) => !contactsToDelete.includes(item.id)
    );
    setAllContacts(updatedContacts);
    setFinallContacts(updatedContacts);
    setContactsToDelete([]);
    setItemsDelete(false);
  };
  const modalHandler = () => {
    setModal(true);
  };
  const modalEdit = () => {
    setClickEditModal(true);
  };
  const groupDeleteModal = () => {
    setModalGroup(true);
  };
  return (
    <>
      {step === 1 && (
        <ContactForm
          alert={alert}
          changeHandler={changeHandler}
          contact={contact}
          clickHandler={clickHandler}
          buttonEditHandler={buttonEditHandler}
          notifeEdit={notifeEdit}
          setNotifeEdit={setNotifeEdit}
          modal={modal}
          setModal={setModal}
          modalHandler={modalHandler}
          step={step}
          setStep={setStep}
          clickeditModal={clickeditModal}
          setClickEditModal={setClickEditModal}
          modalEdit={modalEdit}
          setAlert={setAlert}
        />
      )}

      <ContactOptions
        allContacts={allContacts}
        search={search}
        setSearch={setSearch}
        searchHandler={searchHandler}
        itemsDeleteHandler={itemsDeleteHandler}
        finallydeleteGroup={finallydeleteGroup}
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
        groupDeleteModal={groupDeleteModal}
        setModalGroup={setModalGroup}
        modalGroup={modalGroup}
        setItemsDelete={setItemsDelete}
        alert={alert}
        // item={item}
      />
    </>
  );
}

export default ContactPage;
