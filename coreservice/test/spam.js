let chai = require("chai");
let server = require("../index");
const chaiHttp = require("chai-http");

//Assertion Style
const expect = chai.expect;

chai.use(chaiHttp);

describe("Spam APIs", () => {
  describe("Mark contact as spam", () => {
    it("should mark a contact as spam contact", (done) => {
      const newSpam = {
        phone: "8698806578",
      };
      chai
        .request(server)
        .put("/api/core/markContactAsSpam")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .set(
          "AuthToken",
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE1heSAyMyAyMDI0IDIxOjAzOjA1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MSwiaWF0IjoxNzE2NDc4Mzg1fQ.QFUFzQZIm842LCqILWRKUPu2nANGm92wMGbQ6br4QSA`
        )
        .send(newSpam)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error").to.be.null;
          expect(res.body).to.have.property("Details").to.be.an("object");
          done();
        });
    });

    it("should return contact name and phone already exists", (done) => {
      const newSpam = {
        phone: "9999990000",
      };
      chai
        .request(server)
        .put("/api/core/markContactAsSpam")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .set(
          "AuthToken",
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE1heSAyMyAyMDI0IDIxOjAzOjA1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MSwiaWF0IjoxNzE2NDc4Mzg1fQ.QFUFzQZIm842LCqILWRKUPu2nANGm92wMGbQ6br4QSA`
        )
        .send(newSpam)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error");
          expect(res.body.Error).to.have.property("ErrorCode").to.be.eq(10010);
          expect(res.body.Error)
            .to.have.property("ErrorMessage")
            .to.be.eq("This Contact Does Not Exists");
          done();
        });
    });
  });

  describe("Get all spam contacts", () => {
    it("should return all the spam contacts", (done) => {
      chai
        .request(server)
        .get("/api/core/getAllSpamContacts?pageNumber=1&pageSize=2")
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
          expect(res.body).to.have.property("Details").to.be.an("array");
          done();
        });
    });
  });
  describe("Search Contacts", () => {
    it("should return contacts based on contact name", (done) => {
      chai
        .request(server)
        .get("/api/core/searchContact?searchContactName=Meena")
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
          expect(res.body).to.have.property("Details").to.be.an("array");
          done();
        });
    });
    it("should return contacts based on phone number", (done) => {
      chai
        .request(server)
        .get("/api/core/searchContact?searchPhone=8698806578")
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
          expect(res.body).to.have.property("Details").to.be.an("array");
          done();
        });
    });
  });
});
