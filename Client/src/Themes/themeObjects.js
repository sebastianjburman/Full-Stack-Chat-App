const lightTheme={
    "--bgcolor": "#ffffff",
  "--navbarcolor":"#d7d7d7",
  "--complimentcolor":"#33bd91",
  "--complimenthighlight":"#4fd6ab",
  "--textcolor1":"#3b3b40",
  "--textcolor2":"#ffffff",
  "--compcolor1": "#EBEBEB",
  "--compcolor2": "#d7d7d7",
  "--compcolor3":"#cdcdcd"
}
const darkTheme={
    "--bgcolor": "#1b1b1b",
  "--navbarcolor":"#262626",
  "--complimentcolor":"#33bd91",
  "--complimenthighlight":"#4fd6ab",
  "--textcolor1":"#ffffff",
  "--textcolor2":"#ffffff",
  "--compcolor1": "#30302f",
  "--compcolor2": "#3a3a39",
  "--compcolor3":"#444443"
}

const themeSwitch = (theme) => {
    if (theme === "dark") {
        document.documentElement.style.setProperty('--bgcolor',darkTheme["--bgcolor"]);
        document.documentElement.style.setProperty('--navbarcolor',darkTheme["--navbarcolor"]);
        document.documentElement.style.setProperty('--complimentcolor',darkTheme["--complimentcolor"]);
        document.documentElement.style.setProperty('--complimenthighlight',darkTheme["--complimenthighlight"]);
        document.documentElement.style.setProperty('--textcolor1',darkTheme["--textcolor1"]);
        document.documentElement.style.setProperty('--textcolor2',darkTheme["--textcolor2"]);
        document.documentElement.style.setProperty('--compcolor1',darkTheme["--compcolor1"]);
        document.documentElement.style.setProperty('--compcolor2',darkTheme["--compcolor2"]);
        document.documentElement.style.setProperty('--compcolor3',darkTheme["--compcolor3"]);
    }
    else {
        document.documentElement.style.setProperty('--bgcolor',lightTheme["--bgcolor"]);
        document.documentElement.style.setProperty('--navbarcolor',lightTheme["--navbarcolor"]);
        document.documentElement.style.setProperty('--complimentcolor',lightTheme["--complimentcolor"]);
        document.documentElement.style.setProperty('--complimenthighlight',lightTheme["--complimenthighlight"]);
        document.documentElement.style.setProperty('--textcolor1',lightTheme["--textcolor1"]);
        document.documentElement.style.setProperty('--textcolor2',lightTheme["--textcolor2"]);
        document.documentElement.style.setProperty('--compcolor1',lightTheme["--compcolor1"]);
        document.documentElement.style.setProperty('--compcolor2',lightTheme["--compcolor2"]);
        document.documentElement.style.setProperty('--compcolor3',lightTheme["--compcolor3"]);
        
    }
}

export default themeSwitch;