export const localization = {
    "ROLE_USER": "Пользователь",
    "ROLE_ADMIN": "Администратор",
}

export function getRoleLocalization(role) {
    if (role === "ROLE_ADMIN") {
        return localization.ROLE_ADMIN;
    } else if (role === "ROLE_USER") {
        return localization.ROLE_USER;
    } else {
        return role;
    }
}
