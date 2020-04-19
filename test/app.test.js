const request = require("supertest");
const app = require("../");
const { tokenGenerator } = require("../helpers/tokenGenerator");

const tokenPayload = {
  idUser: 1
};

const delay = ms =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });

describe("Server", () => {
  test("should return a 200 check", async () => {
    await request(app)
      .get("/check")
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body.uptime).toBeGreaterThan(0);
      });
  });

  test("should return a 200 with correct credentials", async () => {
    const token = await tokenGenerator(tokenPayload);
    await request(app)
      .get("/app/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  test("should return a 401  without credentials", async () => {
    await request(app)
      .get("/app/users")
      .expect(401);
  });

  test("Expired token", async () => {
    const token = await tokenGenerator(tokenPayload, 1);
    await delay(2000);
    await request(app)
      .get("/app/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(401);
  });
});
