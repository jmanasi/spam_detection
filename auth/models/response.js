//user
class validateUser {
  constructor() {
    (this.Error = null), (this.Details = null);
  }
}
class registerUser {
  constructor() {
    (this.Error = null), (this.Details = null);
  }
}
class getUser {
  constructor() {
    (this.Error = null), (this.Details = null);
  }
}

//auth

class loginUser {
  constructor() {
    (this.Error = null), (this.Details = null);
  }
}
class logoutUser {
  constructor() {
    (this.Error = null), (this.Details = null);
  }
}
class validateToken {
  constructor() {
    (this.Error = null), (this.Details = null);
  }
}
class getUserDetailsOnToken {
  constructor() {
    (this.Error = null), (this.Details = null);
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
