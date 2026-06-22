function normalizeHex(value) {
    value = value.trim();

    if (!value) return "";

    if (!value.startsWith("#")) {
        value = "#" + value;
    }

    return value.toUpperCase();
}

function isValidHex(value) {
    return /^#[0-9A-F]{6}$/.test(value);
}

function validate(value, errorEl, name) {
    errorEl.textContent = "";

    if (!value) return true;

    if (!isValidHex(value)) {
        errorEl.textContent =
            `❌ Error: ${name} must be a 6-digit hex code`;
        return false;
    }

    return true;
}

const bgColorEl = document.getElementById("bgColor");
const bgImageEl = document.getElementById("bgImage");
const headerEl = document.getElementById("headerColor");
const mainEl = document.getElementById("mainBoxColor");
const toolbarEl = document.getElementById("toolbarTextColor");

const output = document.getElementById("cssOutput");

document.getElementById("generateBtn").addEventListener("click", () => {

    const bgColor = normalizeHex(bgColorEl.value);
    const bgImage = bgImageEl.value.trim();
    const header = normalizeHex(headerEl.value);
    const main = normalizeHex(mainEl.value);
    const toolbar = normalizeHex(toolbarEl.value);

    let ok = true;

    ok =
    validate(bgColor, document.getElementById("bgColorError"), "Background") &&
    validate(header, document.getElementById("headerColorError"), "Header") &&
    validate(main, document.getElementById("mainBoxColorError"), "Main box") &&
    validate(toolbar, document.getElementById("toolbarTextColorError"), "Toolbar");

    if (!ok) return;

    let bodyBg = "";

    if (bgImage) {
        bodyBg = `
    background-image: url("${bgImage}");
    background-size: cover;
    background-attachment: fixed;`;
    } else {
        bodyBg = `
    background-color: ${bgColor};`;
    }

    const css = `
:root {
    --header: ${header};
    --main: ${main};
    --toolbar: ${toolbar};
}

body {${bodyBg}
    color: var(--toolbar);
}

.no-margin,
header.m-0,
.menu,
#header-nav {
    background-color: var(--header);
}

.col-12 section,
.modal-dialog {
    background-color: var(--main);
}

.side-tools,
.toolbar-window {
    background-color: var(--main);
    color: var(--toolbar);
}
`;

    output.value = css;
});
