const request = require("supertest");
const db = require("../../data/db-config");
const server = require("../server");
const bcrypt = require("bcryptjs");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lbHRlbSIsInJvbGVuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODE0NTQ1NTAsImV4cCI6MTY4MTU0MDk1MH0.r2UCRqSldz5RPOeQJByKtUzsCf3LONX1fERW-0b6uns";

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});

test("test environment testing olarak ayarlı", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("[POST] /api/auth/register", () => {
  it("[1] Register payload dolu başarılı sonuç", async () => {
    let sampleUser = {
      userId: 5,
      username: "meltemaa",
      email: "alli@gmail.com",
      passhash: "$2a$08$zHtLqoWYk7LQ4vfCOjGfoe8hrMyb/7d2blkTLVcH6rPG3lpVKLhzG",
      createdAt: "2023-04-14 10:50:45",
      roleId: 1,
      rolename: "admin",
    };
    const res = await request(server)
      .post("/api/auth/register")
      .send(sampleUser);
    expect(res.status).toBe(201);
    expect(res.body.userId).toBeGreaterThan(0);
  });
  it("[2] Register payload boş başarısız sonuç", async () => {
    let sampleUser = { username: "meltem12" };
    const res = await request(server)
      .post("/api/auth/register")
      .send(sampleUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "You entered incomplete information. try again"
    );
  });
  it("[3] Register username daha önce kullanılmış", async () => {
    const res = await request(server).post("/api/auth/register").send({
      username: "meltem",
      email: "meltem@gmail.com",
      passhash: "1234",
      rolename: "admin",
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Username used before, try again/i);
  }, 1000);
});

describe("[POST] /api/auth/login", () => {
  it("[4] Login Şifre yanlış başarısız sonuç", async () => {
    let sampleUser = {
      username: "meltem",
      email: "meltem@gmail.com",
      passhash: "1234",
      rolename: "admin",
    };
    const res = await request(server).post("/api/auth/login").send(sampleUser);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid password");
  });
  it("[5] Login doğru payload başarılı token", async () => {
    let sampleUser = {
      username: "meltem",
      email: "meltem@gmail.com",
      passhash: "12aa*",
      rolename: "admin",
    };
    const res = await request(server).post("/api/auth/login").send(sampleUser);
    expect(res.status).toBe(200);
    expect(res.body.token).not.toBeNull();
  });
  it("[6] Users tokensiz açılmaz", async () => {
    const res = await request(server).get("/api/user");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Token not provided.");
  });
});
