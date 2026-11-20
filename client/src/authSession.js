export const AUTH_SESSION_CHANGED = "gameboxd-auth-session-changed";

export function getAuthenticatedUsername() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        return null;
    }

    return localStorage.getItem("user_name");
}

export function clearAuthSession() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id");
    window.dispatchEvent(new Event(AUTH_SESSION_CHANGED));
}
