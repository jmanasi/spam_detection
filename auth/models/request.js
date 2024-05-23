class validateUser {
  constructor(req) {
    this.phone = req.body.phone ? req.body.phone : null;
    this.password = req.body.password ? req.body.password : null;
  }
}
class registerUser {
  constructor(req) {
    this.name = req.body.name ? req.body.name : null;
    this.phone = req.body.phone ? req.body.phone : null;
    this.email = req.body.email ? req.body.email : null;
    this.password = req.body.password ? req.body.password : null;
  }
}
class getUser {
  constructor(req) {
    this.userRef = req.query.userRef ? req.query.userRef : null;
  }
}
class loginUser {
  constructor(req) {
    this.UserId = req.body.UserId ? req.body.UserId : 0;
  }
}
class logoutUser {
  constructor(req) {
    this.userId = req.body.userId ? req.body.userId : 0;
    this.AuthToken = req.headers.authtoken ? req.headers.authtoken : null;
  }
}
class validateToken {
  constructor(req) {
    this.AuthToken = req.headers.authtoken ? req.headers.authtoken : null;
  }
}
class getUserDetailsOnToken {
  constructor(req) {
    this.AuthToken = req.headers.authtoken ? req.headers.authtoken : null;
  }
}

//user
module.exports.validateUser = validateUser;
module.exports.registerUser = registerUser;
module.exports.getUser = getUser;

//auth
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;
module.exports.validateToken = validateToken;
module.exports.getUserDetailsOnToken = getUserDetailsOnToken;
