const navReducer = (state, action) => {
    if (state === undefined || action.type === "NAV_DEFAULT") {
        return [{ to: "/registration", text: "Регистрация" }, { to: "/login", text: "Войти" },]
    }
    if (action.type === "NAV_ADMIN") {
        return [{ to: "/diet", text: "Питание" }, { to: "/food", text: "Таблица продуктов" }, {to: "/profile", text: "Профиль"}, { to: "/admin", text: "Админка" }]
    }
    if (action.type === "NAV_USER") {
        return [{ to: "/diet", text: "Питание" }, { to: "/food", text: "Таблица продуктов" }, {to: "/profile", text: "Профиль"}]
    }
    return state
}

export default navReducer