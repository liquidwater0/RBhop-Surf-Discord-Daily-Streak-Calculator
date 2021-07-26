export function themeChanger() {
    const themeChanger = document.getElementById("themeChanger");
    const themeChangerIcon = document.querySelector("#themeChanger i");
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
        themeChangerIcon.textContent = "light_mode";
    }

    function lightMode() {
        html.setAttribute("data-theme", "light");
        themeChangerIcon.textContent = "dark_mode";
    }

    function getTheme() {
        if (localStorage.getItem("dscTheme")) {
            html.setAttribute("data-theme", localStorage.getItem("dscTheme"));
        } else {
            darkMode();
        }

        if (html.getAttribute("data-theme") == "dark") {
            themeChangerIcon.textContent = "light_mode";
        } else {
            themeChangerIcon.textContent = "dark_mode";
        }
    }
}
