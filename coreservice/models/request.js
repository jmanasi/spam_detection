//contact
class addContact {
  constructor(req) {
    this.userId = req.body.userId ? req.body.userId : 0;
    this.contactName = req.body.contactName ? req.body.contactName : null;
    this.phone = req.body.phone ? req.body.phone : null;
  }
}

class getAllContacts {
  constructor(req) {
    this.pageNumber = req.query.pageNumber ? req.query.pageNumber : 0;
    this.pageSize = req.query.pageSize ? req.query.pageSize : 0;
  }
}

//Spam
class markContactAsSpam {
  constructor(req) {
    this.phone = req.body.phone ? req.body.phone : null;
  }
}

class getAllSpamContacts {
  constructor(req) {
    this.pageNumber = req.query.pageNumber ? req.query.pageNumber : 0;
    this.pageSize = req.query.pageSize ? req.query.pageSize : 0;
  }
}
class searchContact {
  constructor(req) {
    this.searchContactName = req.query.searchContactName
      ? req.query.searchContactName
      : null;
    this.searchPhone = req.query.searchPhone ? req.query.searchPhone : null;
  }
}

//contact
module.exports.addContact = addContact;
module.exports.getAllContacts = getAllContacts;

//Spam
module.exports.markContactAsSpam = markContactAsSpam;
module.exports.getAllSpamContacts = getAllSpamContacts;
module.exports.searchContact = searchContact;
