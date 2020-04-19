const request = require("supertest");
const app = require("../../");
const { tokenGenerator } = require("../../helpers/tokenGenerator");

const tokenPayload = {
  idUser: 1
};

const validUserData = {
  firstName: "test",
  lastName: "123",
  email: "test@gmail.com",
  phoneNumber: "012233324234",
  password: "123",
  idUserRole: 3
};

const invalidUserData = {
  mail: "test@example.com"
};

describe("/app/user", () => {
  let userID = null;
  let token = null;

  beforeAll(async () => {
    token = await tokenGenerator(tokenPayload);
  });

  test("POST /app/users", async () => {
    await request(app)
      .post("/app/user")
      .set("Authorization", `Bearer ${token}`)
      .send(validUserData)
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        userID = res.body.idUser;
        expect(res.body).toHaveProperty("firstName", validUserData.firstName);
        expect(res.body).toHaveProperty("lastName", validUserData.lastName);
      });
  });

  test("GET /app/users", async () => {
    await request(app)
      .get("/app/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).toHaveProperty("count");
        expect(res.body).toHaveProperty("rows");
      });
  });

  test(`DELETE /app/user/${userID}`, async () => {
    await request(app)
      .delete(`/app/user/${userID}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).toHaveProperty("success", true);
      });
  });
});
