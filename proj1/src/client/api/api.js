const fetchApiHelper = ({ method = "POST", data }) => {
  return {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
};
const loginApi = async (userInfo) => {
  const res = await fetch(
    "/login",
    fetchApiHelper({ method: "POST", data: userInfo })
  );
  return res;
};

const logoutApi = async (userInfo) => {
  const res = await fetch(
    "/logout",
    fetchApiHelper({ method: "POST", data: userInfo })
  );
  return res;
};

const adderApi = async (userInfo) => {
  const res = await fetch(
    "/addUser",
    fetchApiHelper({ method: "POST", data: userInfo })
  );
  return res;
};
const infoApi = async () => {
  const res = await fetch("/allinfo");
  return res;
};
export default { loginApi, logoutApi, adderApi, infoApi };
