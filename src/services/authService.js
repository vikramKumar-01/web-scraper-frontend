import api from "./api";

function normalizeAuthResponse(payload) {
  const nested = payload?.data || {};
  const token =
    payload?.token ||
    payload?.accessToken ||
    nested?.token ||
    nested?.accessToken ||
    null;
  const user =
    payload?.user ||
    nested?.user ||
    payload?.data?.user ||
    {
      name: payload?.name || nested?.name || null,
      email: payload?.email || nested?.email || null,
      createdAt: payload?.createdAt || nested?.createdAt || null
    };

  return {
    ...payload,
    token,
    user: user?.name || user?.email || user?.createdAt ? user : null
  };
}

export async function loginUser(payload) {
  const { data } = await api.post("/auth/login", payload);
  return normalizeAuthResponse(data);
}

export async function registerUser(payload) {
  const { data } = await api.post("/auth/register", payload);
  return normalizeAuthResponse(data);
}
