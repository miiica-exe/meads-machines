const VARIABLES = [
    "body-bg",
    "bg-main",
    "bg-accent",
    "text-color",
    "text-accent"
];

const output = document.getElementById("output");
const generateBtn = document.getElementById("generate-btn");

/* ---------------------------
   NORMALIZERS
--------------------------- */

function normalizeHex(value) {
    if (!value) return "";

    let hex = value.trim();

    if (hex.startsWith("#")) {
        hex = hex.slice(1);
    }

    if (/^[0-9a-fA-F]{3}$/.test(hex)) {
        hex = hex.split("").map(c => c + c).join("");
    }

    if (/^[0-9a-fA-F]{6}$/.test(hex)) {
        return "#" + hex.toLowerCase();
    }

    return value.trim();
}

function normalizeBodyBg(value) {
    const trimmed = value.trim();
    if (!trimmed) return "";

    const isUrl =
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://");

    if (isUrl) {
        return `url("${trimmed}")`;
    }

    return normalizeHex(trimmed);
}

/* ---------------------------
   CORE APPLY FUNCTION
--------------------------- */

function applyToRoot(variable, value) {
    document.documentElement.style.setProperty(`--${variable}`, value);
}

/* ---------------------------
   LIVE INPUT SYSTEM
--------------------------- */

function handleInput(variable, value) {
    if (variable === "body-bg") {
        return normalizeBodyBg(value);
    }
    return normalizeHex(value);
}

/* text inputs */
function bindTextInputs() {
    VARIABLES.forEach(variable => {
        const input = document.getElementById(variable);
        if (!input) {
            console.warn(`Missing input: ${variable}`);
            return;
        }

        input.addEventListener("input", () => {
            const value = handleInput(variable, input.value);

            applyToRoot(variable, value);
        });
    });
}

/* color pickers */
function bindColorPickers() {
    document.querySelectorAll('input[type="color"]').forEach(picker => {
        picker.addEventListener("input", () => {
            const targetId = picker.dataset.target;
            const target = document.getElementById(targetId);

            if (!target) return;

            let value = picker.value;

            if (targetId === "body-bg") {
                value = normalizeBodyBg(value);
            }

            target.value = value;
            applyToRoot(targetId, value);
        });
    });
}

/* ---------------------------
   GENERATOR (EXPORT ONLY)
--------------------------- */

function generateVariables() {
    const values = {};

    VARIABLES.forEach(variable => {
        const field = document.getElementById(variable);
        if (!field) return;

        values[variable] = handleInput(variable, field.value);
    });

    let css = `:root {\n`;

    VARIABLES.forEach(variable => {
        css += `  --${variable}: ${values[variable] || ""};\n`;
    });

    css += `}`;

    output.value = css;
}

/* ---------------------------
   INIT
--------------------------- */

generateBtn.addEventListener("click", generateVariables);

window.addEventListener("DOMContentLoaded", () => {
    bindTextInputs();
    bindColorPickers();

    // initial sync into CSS variables
    VARIABLES.forEach(variable => {
        const input = document.getElementById(variable);
        if (!input) return;

        const value = handleInput(variable, input.value);
        applyToRoot(variable, value);
    });
});
