let chai = require("chai");
let server = require("../index");
const chaiHttp = require("chai-http");

//Assertion Style
const expect = chai.expect;

chai.use(chaiHttp);

describe("Contact APIs", () => {
  describe("Add a contact", () => {
    it("should add a contact that is registered in the app", (done) => {
      const newContact = {
        userId: 5,
        contactName: "Divya",
        phone: "7890765432",
      };
      chai
        .request(server)
        .post("/api/core/addContact")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .set(
          "AuthToken",
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE1heSAyMyAyMDI0IDIxOjAzOjA1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MSwiaWF0IjoxNzE2NDc4Mzg1fQ.QFUFzQZIm842LCqILWRKUPu2nANGm92wMGbQ6br4QSA`
        )
        .send(newContact)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error").to.be.null;
          expect(res.body).to.have.property("Details").to.be.an("object");
          done();
        });
    });
    it("should add a contact that is not registered in the app", (done) => {
      const newContact = {
        contactName: "Tamanna",
        phone: "9977880943",
      };
      chai
        .request(server)
        .post("/api/core/addContact")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .set(
          "AuthToken",
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE1heSAyMyAyMDI0IDIxOjAzOjA1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MSwiaWF0IjoxNzE2NDc4Mzg1fQ.QFUFzQZIm842LCqILWRKUPu2nANGm92wMGbQ6br4QSA`
        )
        .send(newContact)
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
      const newContact = {
        contactName: "Meenakshi",
        phone: "8698806578",
      };
      chai
        .request(server)
        .post("/api/core/addContact")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .set(
          "AuthToken",
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE1heSAyMyAyMDI0IDIxOjAzOjA1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MSwiaWF0IjoxNzE2NDc4Mzg1fQ.QFUFzQZIm842LCqILWRKUPu2nANGm92wMGbQ6br4QSA`
        )
        .send(newContact)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error");
          expect(res.body.Error).to.have.property("ErrorCode").to.be.eq(10009);
          expect(res.body.Error)
            .to.have.property("ErrorMessage")
            .to.be.eq("This Contact Name And Number Already Exists");
          done();
        });
    });
  });

  describe("Get all contacts", () => {
    it("should return all the contacts", (done) => {
      chai
        .request(server)
        .get("/api/core/getAllContact?pageNumber=1&pageSize=3")
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
