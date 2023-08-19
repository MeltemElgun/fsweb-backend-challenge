const db = require("../../data/db-config");

const getAllUsers = () => {
  return db("users").select(
    "userId",
    "name",
    "username",
    " email",
    "createdAt",
    "profilePicture",
    "headerPicture"
  );
};

const getUserById = async (id) => {
  return await db("users as u")
    .select("u.userId", "u.username", "u.email")
    .where("userId", id)
    .first();
};

const getByFilter = async (filter) => {
  let user = await db("users as u")
    .leftJoin("roles as r", "u.roleId", "r.roleId")
    .select("u.*", "r.rolename")
    .where(filter)
    .first();
  return user;
};

const createUser = async (user) => {
  const { roleId } = await db("roles").where("rolename", user.rolename).first();
  const newUser = {
    username: user.username,
    email: user.email,
    passhash: user.passhash,
    roleId: roleId,
  };
  const insertedId = await db("users").insert(newUser);
  return getByFilter({ "u.userId": insertedId[0] });
};

const getUserByUsername = async (name) => {
  let nameExist = await db("users").where("username", name).first();
  return nameExist;
};

const deleteUser = async (id) => {
  return db("users").where("userId", id).del();
};

const updateUser = async (id, user) => {
  await db("users").where("userId", id).update(user);
  return getUserById(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  getByFilter,
  createUser,
  getUserByUsername,
  deleteUser,
  updateUser,
};
