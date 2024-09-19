import { API_URL } from "./constants";

async function login(email, password) {
  return await post("login", { email, password }, false);
}

async function register(email, password) {
  await post("users", { email, password }, false);
  return await login(email, password);
}

async function createProfile(
  userId,
      firstName,
      lastName,
      bio,
      profilePicture
) {
  const res = await patch(`users/${userId}`, {
     userId,
      firstName,
      lastName,
      bio,
      profilePicture
  });

   return res.data.user;

}

async function updateProfile(
  userId,
  cohortId,
  firstName,
  lastName,
  bio,
  githubUrl,
  profilePicture,
  role,
  username,
  mobile,
  specialism
) {

  const res = await patch(`users/${userId}`, {
    cohortId,
    firstName,
    lastName,
    bio,
    githubUrl,
    profilePicture,
    role,
    username,
    mobile,
    specialism,
  });

  if (res.status === "fail") {
    throw new Error(`Error updating user: ${res.data.error}`);
  }

  return res.data.user
}

async function createPost(content) {
    return await post('posts', { content }, true)
}

async function getPosts() {
  const res = await get("posts");
  return res.data.posts;
}

async function getUser(userId) {
  const res = await get(`users/${userId}`);

  if (res.status === "fail") {
    throw new Error(`Error fetching user: ${res.data.id}`);
  }
  return res.data.user;
}

async function post(endpoint, data, auth = true) {
  return await request("POST", endpoint, data, auth);
}

async function patch(endpoint, data, auth = true) {
  return await request("PATCH", endpoint, data, auth);
}

async function get(endpoint, auth = true) {
  return await request("GET", endpoint, null, auth);
}

async function request(method, endpoint, data, auth = true) {
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
  };

  if (method.toUpperCase() !== "GET") {
    opts.body = JSON.stringify(data);
  }

  if (auth) {
    opts.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  return response.json();
}

export {
    login,
    getPosts,
    getUser,
    register,
    updateProfile,
    createProfile,
    createPost,
}