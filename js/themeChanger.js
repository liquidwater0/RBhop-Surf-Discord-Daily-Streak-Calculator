export function themeChanger() {
    const themeChanger = document.getElementById("themeChanger");
    const html = document.querySelector("html");

    document.addEventListener("DOMContentLoaded", getTheme);
    themeChanger.addEventListener("click", changeTheme);

    let darkTheme = true;

    function changeTheme() {
        darkTheme = !darkTheme;

        if (darkTheme) {
            darkMode();
        } else {
            lightMode();
        }

        localStorage.setItem("dscTheme", html.getAttribute("data-theme"));
    }

    function darkMode() {
        html.setAttribute("data-theme", "dark");
    }

    function lightMode() {
        html.setAttribute("data-theme", "light");
    }

    function getTheme() {
        if (localStorage.getItem("dscTheme")) {
            html.setAttribute("data-theme", localStorage.getItem("dscTheme"));
        } else {
            darkMode();
        }
    }
}