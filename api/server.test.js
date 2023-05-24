const db = require("../data/db-config");
const request = require("supertest");
const server = require("../api/server");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lbHRlbSIsInJvbGVuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODE0NTQ1NTAsImV4cCI6MTY4MTU0MDk1MH0.r2UCRqSldz5RPOeQJByKtUzsCf3LONX1fERW-0b6uns";
test("test environment testing olarak ayarlı", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});
describe("server.js", () => {
  describe("[GET] /api/users", () => {
    it("[1]  Users sayisi doğru  mu ", async () => {
      const res = await request(server)
        .get("/api/user")
        .set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(4);
    }, 1000);

    it("[2] İstenilen id yoksa 404 hata kodu dönüyor mu", async () => {
      const res = await request(server)
        .get("/api/user/5")
        .set("Authorization", token);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("ID No: 5 user is not found");
    }, 1000);
  });
  describe("[GET] /api/tweet", () => {
    it("[3] Tweets sayisi doğru  mu  ", async () => {
      const res = await request(server)
        .get("/api/tweet")
        .set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(5);
    }, 1000);

    it("[4] İstenilen id yoksa 404 hata kodu dönüyor", async () => {
      const res = await request(server)
        .get("/api/tweet/6")
        .set("Authorization", token);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("ID No: 6 tweet not found");
    }, 1000);
  });

  describe("[GET] /api/comment", () => {
    it("[5] Comments sayisi doğru  mu ", async () => {
      const res = await request(server)
        .get("/api/comment")
        .set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(4);
    }, 1000);

    it("[6] İstenilen id yoksa 404 hata kodu dönüyor", async () => {
      const res = await request(server)
        .get("/api/comment/5")
        .set("Authorization", token);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("ID No: 5 comment not found");
    }, 1000);
  });
});
