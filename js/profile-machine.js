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

/* =========================
   DESKTOP
========================= */

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

/* =========================
   MOBILE OVERRIDES
========================= */

@media only screen and (max-width: 512px) {

    #mob-nav-btns .toolbar {
        background: var(--main);
    }

    .toolbar-window.open {
        background: none;
        border: none;
    }

    body {${bgImage ? `
        background-image: url("${bgImage}") !important;
` : `
        background-color: ${bgColor} !important;
`}
        background-repeat: no-repeat !important;
        background-position: center center !important;
        background-size: cover !important;
        background-attachment: fixed !important;
    }

    .responsive #logo {
        display: none !important;
    }

    .responsive #header-logo-info {
        background: var(--header) !important;
    }

    .col-12 section,
    .bottom-box,
    .panel,
    .widget {
        background-color: var(--main) !important;
        border: none;
    }
}
`;

    output.value = css;
});
