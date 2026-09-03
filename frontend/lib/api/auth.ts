import api from "./client";

const SESSION_COOKIE = "kalakriti_session";

function setSessionCookie() {
  if (typeof document !== "undefined") {
    document.cookie = `${SESSION_COOKIE}=authenticated; path=/; max-age=86400; SameSite=Lax`;
  }
}

function clearSessionCookie() {
  if (typeof document !== "undefined") {
    document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  }
}

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/login", data);

    if (typeof window !== "undefined") {
      const token = response.data?.access_token;

      if (token) {
        localStorage.setItem("access_token", token);
        setSessionCookie();
      }
    }

    return response;
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    return api.post("/auth/register", {
      email: data.email,
      full_name: data.name,
      password: data.password,
    });
  },

  me: () => api.get("/auth/me"),

  logout: async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      clearSessionCookie();
    }
  },
};
