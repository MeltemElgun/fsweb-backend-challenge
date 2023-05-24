const db = require("./data/db-config");

const usersModel = require("./api/users/user-modele");
const tweetModel = require("./api/tweets/tweet-model");
const commentModel = require("./api/comments/comment-model");

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

describe("USERS TESTS", () => {
  test("[1] userlar geliyor mu", async () => {
    const users = await usersModel.getAllUsers();
    expect(users).toBeDefined();
    expect(users).toHaveLength(4);
    expect(users[0]).toHaveProperty("username", "meltem");
  });

  test("[2] getByFilter doğru formatta geliyor mu", async () => {
    let user = await usersModel.getByFilter({ userId: 1 });
    expect(user.username).toBe("meltem");
  });

  test("[3] updated user doğru formatta dönüyor mu", async () => {
    const updatedUser = await usersModel.updateUser(1, {
      username: "meltem",
      email: "meltem@gmail.com",
      passhash: "12aa*",
    });
    expect(updatedUser).toMatchObject({
      username: "meltem",
      email: "meltem@gmail.com",
    });
  });
  test("[4] remove user doğru olani siliyor mu", async () => {
    await usersModel.deleteUser(1);
    let user = await usersModel.getByFilter({ userId: 1 });
    expect(user).toBe(undefined);
  });
});
describe("TWEETS TESTS", () => {
  test("[5] tweetler geliyor mu", async () => {
    const tweets = await tweetModel.getAllTweet();
    expect(tweets).toBeDefined();
    expect(tweets).toHaveLength(5);
    expect(tweets[0]).toMatchObject({ userId: 1, content: "selammm" });
  });

  test("[6] post tweet doğru formatta geliyor mu", async () => {
    const newTweet = await tweetModel.createTweet({
      content: "selammm",
      userId: 1,
    });
    expect(newTweet).toBeDefined();
    expect(newTweet).toMatchObject({ content: "selammm" });
  });

  test("[7] updated tweet doğru formatta dönüyor mu", async () => {
    const updatedTweet = await tweetModel.updateTweet(1, {
      content: "selammm",
      userId: 1,
    });
    expect(updatedTweet).toMatchObject({ content: "selammm" });
  });
  test("[8] remove tweet doğru olani siliyor mu", async () => {
    await usersModel.deleteUser(1);
    let user = await usersModel.deleteUser({ userId: 1 });
    expect(user).toBe(0);
  });
});

describe("COMMENTS TESTS", () => {
  test("[9] commentler geliyor mu", async () => {
    const comments = await commentModel.getAllComment();
    expect(comments).toBeDefined();
    expect(comments).toHaveLength(4);
    expect(comments[0]).toMatchObject({
      text: "harikasın",
      userId: 1,
      tweetId: 1,
    });
  });

  test("[10] post comment doğru formatta geliyor mu", async () => {
    const newComment = await commentModel.createComment({
      userId: 1,
      tweetId: 1,
      text: "harikasın",
    });
    expect(newComment).toBeDefined();
  });

  test("[11] updated comment doğru formatta dönüyor mu", async () => {
    const updatedComment = await commentModel.updateComment(1, {
      text: "deneme",
      userId: 1,
      tweetId: 1,
    });
    expect(updatedComment).toMatchObject({
      text: "deneme",
      userId: 1,
    });
  });

  test("[12] remove comment doğru olani siliyor mu", async () => {
    await usersModel.deleteUser(1);
    let user = await usersModel.deleteUser({ userId: 1 });
    expect(user).toBe(0);
  });
});
