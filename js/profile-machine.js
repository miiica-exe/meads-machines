function normalizeHex(value) {
    value = value.trim();
    if (!value) return "";

    if (!value.startsWith("#")) {
        value = "#" + value;
    }

    // expand #fff → #ffffff
    if (value.length === 4) {
        value =
            "#" +
            value[1] + value[1] +
            value[2] + value[2] +
            value[3] + value[3];
    }

    return value.toUpperCase();
}

function isValidHex(value) {
    return /^#[0-9A-F]{6}$/i.test(value);
}

function validate(value, errorEl, name) {
    errorEl.textContent = "";

    if (!value) return true;

    if (!isValidHex(value)) {
        errorEl.textContent = `❌ Error: ${name} must be a 6-digit hex code`;
        return false;
    }

    return true;
}

function resolveBackground(value) {
    value = value.trim();

    if (!value) return { type: "none" };

    // URL = image background
    if (value.startsWith("http://") || value.startsWith("https://")) {
        return { type: "image", value };
    }

    // HEX fallback
    if (!value.startsWith("#")) {
        value = "#" + value;
    }

    if (value.length === 4) {
        value =
            "#" +
            value[1] + value[1] +
            value[2] + value[2] +
            value[3] + value[3];
    }

    if (!isValidHex(value)) {
        return { type: "invalid", value };
    }

    return { type: "color", value: value.toUpperCase() };
}

// DOM
const bgColorEl = document.getElementById("bgColor");
const headerEl = document.getElementById("headerColor");
const mainEl = document.getElementById("mainBoxColor");
const toolbarEl = document.getElementById("toolbarTextColor");

const output = document.getElementById("cssOutput");

document.getElementById("generateBtn").addEventListener("click", () => {

    const bg = resolveBackground(bgColorEl.value);

    const header = normalizeHex(headerEl.value);
    const main = normalizeHex(mainEl.value);
    const toolbar = normalizeHex(toolbarEl.value);

    let ok = true;

    // background validation (special case)
    const bgError = document.getElementById("bgColorError");

    if (bg.type === "invalid") {
        bgError.textContent = "❌ Background must be hex or image URL";
        ok = false;
    } else {
        bgError.textContent = "";
    }

    ok =
        validate(header, document.getElementById("headerColorError"), "Header") &&
        validate(main, document.getElementById("mainBoxColorError"), "Main box") &&
        validate(toolbar, document.getElementById("toolbarTextColorError"), "Toolbar") &&
        ok;

    if (!ok) return;

    // background builder (SINGLE SOURCE OF TRUTH)
    let bodyBg = "";

    if (bg.type === "image") {
        bodyBg = `
    background: url("${bg.value}");
    background-size: cover;
    background-attachment: fixed;`;
    }

    else if (bg.type === "color") {
        bodyBg = `
    background: ${bg.value};`;
    }

    else {
        bodyBg = `
    background: #111111;`;
    }

    // FINAL CSS
    const css = `
:root {
    --header: ${header};
    --main: ${main};
    --toolbar: ${toolbar};
}

body {${bodyBg}
    color: var(--toolbar);
}

/* DESKTOP */
.no-margin,
header.m-0,
.menu,
#header-nav,
#profile-header {
    background: var(--header);
}

.col-12 section,
.modal-dialog {
    background: var(--main);
}

.side-tools,
.toolbar-window {
    background: var(--main);
    color: var(--toolbar);
}

/* MOBILE */
@media only screen and (max-width: 512px) {

    #mob-nav-btns .toolbar {
        background: var(--main);
    }

    .toolbar-window.open {
        background: none;
        border: none;
    }

    body {${bodyBg}
        background-repeat: no-repeat !important;
        background-position: center center !important;
        background-size: cover !important;
        background-attachment: fixed !important;
    }

    .responsive #logo {
        display: none !important;
    }
    
.toolbar-window.open {
   background: var(--header);
   }

    .responsive #header-logo-info {
        background: var(--header) !important;
    }

    .col-12 section,
    .bottom-box,
    .panel,
    .widget {
        background: var(--main) !important;
        border: none;
    }
}
`;

    output.value = css;
});
