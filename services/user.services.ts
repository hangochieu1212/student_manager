const { User } = require("../models");

type UserData = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password?: string;
}

const createUser = async (userData: UserData) => {
  try {
    return await User.create(userData);
  } catch (err) {
    return null;
  }
};

const getUsers = async () => {
  const results = await User.findAll();

  return {
    users: results,
  };
};

const findByEmail = async (email: string) => (await User.findAll({ where: { email } }))[0];

const findByUsername = async (username: string) => (await User.findAll({ where: { username } }))[0];

const findById = async (userId: number) => (await User.findAll({ where: { id: userId } }))[0];

const updateUser = async (userId: number, updateData: UserData) => await User.update(updateData, {
  where: {
    id: userId,
  },
});

const deleteUser = async (userId: number) => await User.destroy({ where: { id: userId } });

export {
  UserData,
  findByEmail,
  findById,
  findByUsername,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
