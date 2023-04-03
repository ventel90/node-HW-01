const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

// function listContacts() {
//   fs.readFile(contactsPath)
//     .then((data) => console.table(JSON.parse(data)))
//     .catch((error) => console.log(error.message));
// }

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

// function getContactById(contactId) {
//   fs.readFile(contactsPath)
//     .then((data) => JSON.parse(data))
//     .then((contacts) => contacts.filter((contact) => contact.id === contactId))
//     .then((contact) => console.table(contact))
//     .catch((error) => console.log(error.message));
// }

const getContactById = async (id) => {
  const contacts = await getAllContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
}

// function removeContact(contactId) {
//   fs.readFile(contactsPath)
//     .then((data) => JSON.parse(data))
//     .then((contacts) => contacts.filter((contact) => contact.id !== contactId))
//     .then((filtredContacts) => {
//       console.table(filtredContacts);
//       return filtredContacts;
//     })
//     .then((filtredContacts) => {
//       fs.writeFile(
//         contactsPath,
//         JSON.stringify(filtredContacts, null, 2)
//       ).catch((error) => console.log(error.message));
//     });
// }

const removeContact = async (id) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath)
//     .then((data) => JSON.parse(data))
//     .then((contacts) => {
//       contacts.push({
//         id: nanoid(21),
//         name,
//         email,
//         phone,
//       });
//       return contacts;
//     })
//     .then((newContacts) => {
//       console.table(newContacts);
//       return newContacts;
//     })
//     .then((newContacts) => {
//       fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 4)).catch(
//         (error) => console.log(error.message)
//       );
//     });
// }

const addContact = async (data) => {
  const contacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { getAllContacts, getContactById, removeContact, addContact };