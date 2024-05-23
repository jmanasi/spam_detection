module.exports.errorCode = {
  applicationError: 500,
  dbError: 10005,
  invalidRequest: 10006,
  invalidUser: 10004,
  userDoesNotExist: 10005,
  inactiveUser: 10006,
  userNotLoggedIn: 10007,
  emailExist: 10008,
  contactNamePhoneExists: 10009,
  noContact: 10010,
};

module.exports.errorMessage = {
  applicationError: "An Application Error Has Occured",
  dbError: "Database function error",
  invalidRequest: "Invalid Request",
  invalidUser: "Invalid User",
  userDoesNotExist: "User Does Not Exist",
  inactiveUser: "User Inactive",
  userNotLoggedIn: "User Is Not Logged In",
  emailExist: "Email Exists",
  contactNamePhoneExists: "This Contact Name And Number Already Exists",
  noContact: "This Contact Does Not Exists",
};
