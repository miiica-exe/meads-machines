const VARIABLES = [
    "body-bg",
    "bg-main",
    "bg-accent",
    "text-color",
    "text-accent"
];

const output = document.getElementById("output");
const generateBtn = document.getElementById("generate-btn");

/**
 * Converts:
 * fff      -> #ffffff
 * abc      -> #aabbcc
 * FFFFFF   -> #ffffff
 * #fff     -> #ffffff
 * #ABCDEF  -> #abcdef
 */
function normalizeHex(value) {
    if (!value) return "";

    let hex = value.trim();

    if (hex.startsWith("#")) {
        hex = hex.slice(1);
    }

    if (/^[0-9a-fA-F]{3}$/.test(hex)) {
        hex = hex
            .split("")
            .map(char => char + char)
            .join("");
    }

    if (/^[0-9a-fA-F]{6}$/.test(hex)) {
        return "#" + hex.toLowerCase();
    }

    return value.trim();
}

/**
 * Body BG accepts either:
 * - hex colors
 * - URLs
 */
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

function generateVariables() {
    const values = {};

    VARIABLES.forEach(variable => {
        const field = document.getElementById(variable);

        if (!field) return;

        let value = field.value;

        if (variable === "body-bg") {
            value = normalizeBodyBg(value);
        } else {
            value = normalizeHex(value);
        }

        values[variable] = value;
    });

    let css = `:root {\n`;

    VARIABLES.forEach(variable => {
        css += `  --${variable}: ${values[variable]};\n`;
    });

    css += `}`;

    output.value = css;
}

generateBtn.addEventListener("click", generateVariables);

function applyToRoot(variable, value) {
    document.documentElement.style.setProperty(`--${variable}`, value);
}

function bindColorPickers() {
    document.querySelectorAll('input[type="color"]').forEach(picker => {
        picker.addEventListener("input", () => {
            const target = document.getElementById(picker.dataset.target);

            target.value = picker.value;

            const variable = picker.dataset.target;

            let value = picker.value;

            if (variable === "body-bg") {
                value = normalizeBodyBg(value);
            }

            applyToRoot(variable, value);
        });
    });
}

VARIABLES.forEach(variable => {
    const input = document.getElementById(variable);

    if (!input) return;

    input.addEventListener("input", () => {
        let value = input.value;

        if (variable === "body-bg") {
            value = normalizeBodyBg(value);
        } else {
            value = normalizeHex(value);
        }

        applyToRoot(variable, value);
    });
});

window.addEventListener("DOMContentLoaded", () => {
    VARIABLES.forEach(variable => {
        const input = document.getElementById(variable);
        if (!input) return;

        let value = input.value;

        if (variable === "body-bg") {
            value = normalizeBodyBg(value);
        } else {
            value = normalizeHex(value);
        }

        applyToRoot(variable, value);
    });

    bindColorPickers();
});
