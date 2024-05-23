module.exports.errorCode = {
  applicationError: 500,
  dbError: 10005,
  invalidRequest: 10006,
  invalidUser: 10004,
  userDoesNotExist: 10005,
  inactiveUser: 10006,
  phoneExists: 10007,
  emailExists: 10008,
};

module.exports.errorMessage = {
  applicationError: "An Application Error Has Occured",
  dbError: "Database function error",
  invalidRequest: "Invalid Request",
  invalidUser: "Invalid User",
  userDoesNotExist: "User Does Not Exist",
  inactiveUser: "User Inactive",
  phoneExists: "Phone number already exists",
  emailExists: "Email Already Exists",
};
