const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      // console.table("Contacts list: ");
      // contacts.listContacts();
      const allContacts = await contacts.getAllContacts();
      return console.table(allContacts)

    case "get":
      // console.log(`Contact by ID: ${id}`);
      // contacts.getContactById(id);
      const oneContact = await contacts.getContactById(id);
      return console.table(oneContact);

    case "add":
      // console.log(
      //   `Contact with name: ${name}, email: ${email}, phone: ${phone} added!`
      // );
      // contacts.addContact(name, email, phone);
      const newContact = await contacts.addContact({name, email, phone});
      return console.table(newContact);

    case "remove":
      // console.log(`Contact by ID removed: ${id}`);
      // contacts.removeContact(id);
      const removedContact = await contacts.removeContact(id);
      return console.table(removedContact);
           

    default:
      console.log("UNKNOWN ACTION TYPE!");
  }
}

invokeAction(argv);