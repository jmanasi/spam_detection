//Contact
class getAllContacts {
  constructor() {
    (this.Error = null), (this.Details = null);
  }
}
class addContact {
  constructor() {
    (this.Error = null), (this.Details = null);
  }
}

//Spam
class getAllSpamContacts {
  constructor() {
    (this.Error = null), (this.Details = null);
  }
}
class markContactAsSpam {
  constructor() {
    (this.Error = null), (this.Details = null);
  }
}
class searchContact {
  constructor() {
    (this.Error = null), (this.Details = null);
  }
}

//contact
module.exports.getAllContacts = getAllContacts;
module.exports.addContact = addContact;

//spam
module.exports.getAllSpamContacts = getAllSpamContacts;
module.exports.markContactAsSpam = markContactAsSpam;
module.exports.searchContact = searchContact;
