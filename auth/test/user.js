let chai = require("chai");
let server = require("../index");
const chaiHttp = require("chai-http");

//Assertion Style
const expect = chai.expect;

chai.use(chaiHttp);

describe("Authenticate User", () => {
  describe("Validate User", () => {
    it("should validate a user", (done) => {
      const newUser = {
        phone: "8698906573",
        password: "Manasi@123",
      };
      chai
        .request(server)
        .post("/api/auth/validateuser")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error").to.be.null;
          expect(res.body).to.have.property("Details").to.be.an("object");
          done();
        });
    });
    it("should return user does not exist", (done) => {
      const newUser = {
        phone: "8600901573",
        password: "Manasi@123",
      };

      chai
        .request(server)
        .post("/api/auth/validateuser")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error");
          expect(res.body.Error).to.have.property("ErrorCode").to.be.eq(10005);
          expect(res.body.Error)
            .to.have.property("ErrorMessage")
            .to.be.eq("User Does Not Exist");
          done();
        });
    });
    it("should return user inactive", (done) => {
      const newUser = {
        phone: "8698906572",
        password: "J@@anasi@123",
      };

      chai
        .request(server)
        .post("/api/auth/validateuser")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error");
          expect(res.body.Error).to.have.property("ErrorCode").to.be.eq(10006);
          expect(res.body.Error)
            .to.have.property("ErrorMessage")
            .to.be.eq("User Inactive");
          done();
        });
    });
  });
});

describe("Register User", () => {
  describe("Register User", () => {
    it("should register/sign up a user", (done) => {
      const newUser = {
        name: "Divya",
        phone: "7890765432",
        email: "div@gmail.com",
        password: "div@y@1234",
      };
      chai
        .request(server)
        .post("/api/auth/registerUser")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error").to.be.null;
          expect(res.body).to.have.property("Details").to.be.an("object");
          done();
        });
    });
    it("should return phone number already exist", (done) => {
      const newUser = {
        name: "harshaa",
        phone: "9698906573",
        email: "harshaa@gmail.com",
        password: "harshaa@1234",
      };

      chai
        .request(server)
        .post("/api/auth/registerUser")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error");
          expect(res.body.Error).to.have.property("ErrorCode").to.be.eq(10007);
          expect(res.body.Error)
            .to.have.property("ErrorMessage")
            .to.be.eq("Phone number already exists");
          done();
        });
    });
    it("should return email already exists", (done) => {
      const newUser = {
        name: "harshaa",
        phone: "9698907573",
        email: "harsha@gmail.com",
        password: "harasha@1234",
      };

      chai
        .request(server)
        .post("/api/auth/registerUser")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error");
          expect(res.body.Error).to.have.property("ErrorCode").to.be.eq(10008);
          expect(res.body.Error)
            .to.have.property("ErrorMessage")
            .to.be.eq("Email Already Exists");
          done();
        });
    });
  });
});
describe("Get User", () => {
  describe("get user", () => {
    it("should return a user", (done) => {
      chai
        .request(server)
        .get("/api/auth/getUser?userRef=164862f0-16c0-11ef-86dc-005056c00001")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .set(
          "AuthToken",
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE1heSAyMyAyMDI0IDIxOjAzOjA1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MSwiaWF0IjoxNzE2NDc4Mzg1fQ.QFUFzQZIm842LCqILWRKUPu2nANGm92wMGbQ6br4QSA`
        )
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error").to.be.null;
          expect(res.body).to.have.property("Details").to.be.an("object");
          done();
        });
    });
    it("should return user does not exist", (done) => {
      chai
        .request(server)
        .get("/api/auth/getUser?userRef=164862f0-16c0-11ef-86dc-005056c")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .set(
          "AuthToken",
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE1heSAyMyAyMDI0IDIxOjAzOjA1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MSwiaWF0IjoxNzE2NDc4Mzg1fQ.QFUFzQZIm842LCqILWRKUPu2nANGm92wMGbQ6br4QSA`
        )
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error");
          expect(res.body.Error).to.have.property("ErrorCode").to.be.eq(10005);
          expect(res.body.Error)
            .to.have.property("ErrorMessage")
            .to.be.eq("User Does Not Exist");
          done();
        });
    });
  });
});
