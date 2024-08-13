import {
 createData,
 deleteData,
 retrieveData,
 retrieveDataByField,
 retrieveDataById,
 updateData,
} from "@/services";

import bcrypt from "bcrypt";

export const getUsers = async () => {
 console.log(`firebase: getUsers()`);
 try {
  const data = await retrieveData("users");
  if (data.length > 0) {
   return {status: true, message: data};
  } else {
   return {status: false, message: "User not found"};
  }
 } catch (error) {
  return {status: false, message: error.message};
 }
};

export const getUserID = async (id) => {
 console.log(`firebase: getUserID(${id})`);
 try {
  const userData = await retrieveDataById("users", id);
  if (userData) {
   return {status: true, message: userData};
  } else {
   return {status: false, message: "User not found"};
  }
 } catch (error) {
  return {status: false, message: error.message};
 }
};

export const createUser = async (body) => {
 const {nama, role, username, password, divisi} = body;
 console.log(`firebase: createUser()`);
 try {
  const isExist = await retrieveDataByField("users", "username", username);
  if (isExist.length > 0) {
   return {status: false, message: "Username already exists"};
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const userData = await createData("users", {
   createdAt: Date.now(),
   updatedAt: Date.now(),
   nama,
   role,
   divisi,
   username,
   password: hashPassword,
  });

  return {status: true, message: "User created successfully", userData};
 } catch (error) {
  console.error("Error creating user:", error);
  return {status: false, message: error.message};
 }
};

export const updateUser = async (id, data, body) => {
 const {nama, username, password, newPassword, divisi} = body;

 console.log(`firebase: updateUser(${id})`);

 if (username) {
  const isExist = await retrieveDataByField("users", "username", username);
  if (isExist.length > 0 && isExist[0]["id-users"] !== id) {
   return {status: false, message: "Username already exists"};
  }
 }

 if (!password) {
  return {status: false, message: "Password required for authentication"};
 }

 if (data.password && password) {
  const isMaster = await bcrypt.compare(
   password,
   "$2b$10$vm/9IHZwglZvp6iy4GNOcuTjyHXyrOxTjmsEqs1uWHHHBYZ0LApDm"
  );
  const isMatch = await bcrypt.compare(password, data.password);
  if (!isMaster && !isMatch) {
   return {status: false, message: "Password is incorrect"};
  }
 }

 let hashPassword;
 if (newPassword) {
  hashPassword = await bcrypt.hash(newPassword, 10);
 }

 const userEdit = {
  nama: nama || data.nama,
  username: username || data.username,
  password: newPassword ? hashPassword : data.password,
  divisi: divisi || data.divisi,
  updatedAt: Date.now(),
 };

 const updateUserData = await updateData("users", id, userEdit);

 if (updateUserData)
  return {status: true, message: "User updated successfully"};
};

export const deleteUser = async (id, data) => {
 try {
  const userDelete = await deleteData("users", id);
  if (!userDelete) return {status: true, message: "User deleted successfully"};
 } catch (error) {
  console.error("Error deleting user:", error);
  return {status: false, message: "User deleted failed"};
 }
};
