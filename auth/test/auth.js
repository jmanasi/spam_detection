let chai = require("chai");
let server = require("../index");
const chaiHttp = require("chai-http");

//Assertion Style
const expect = chai.expect;

chai.use(chaiHttp);

describe("Authenticate User", () => {
  describe("Login User", () => {
    it("should login a user", (done) => {
      const newUser = {
        UserId: 2,
      };
      chai
        .request(server)
        .post("/api/auth/login")
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
  });

  describe("Logout a user", () => {
    it("should logout a user", (done) => {
      const newUser = {
        userId: 2,
      };
      chai
        .request(server)
        .post("/api/auth/logout")
        .set("Authorization", `UzlATWQzNHQ6czZAbUQyMFQyNA==`)
        .set(
          "AuthToken",
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE1heSAyMyAyMDI0IDIxOjQ3OjQ4IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MiwiaWF0IjoxNzE2NDgxMDY4fQ.yCs123drq1Ir3eVoKqRru7IAPjji3Nedzwq50sj_d88`
        )
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("Error").to.be.null;
          expect(res.body).to.have.property("Details").to.be.an("object");
          expect(res.body.Details)
            .to.have.property("logoutdata")
            .to.be.an("object");
          done();
        });
    });
  });
});
