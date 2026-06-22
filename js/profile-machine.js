function isValidHex(hex) {
    return /^#[0-9A-Fa-f]{6}$/.test(hex);
}
function validateField(inputId, errorId) {
    const value = document.getElementById(inputId).value.trim();
    const error = document.getElementById(errorId);

    if (!value) {
        error.textContent = "";
        return true;
    }

    if (!isValidHex(value)) {
        error.textContent = "❌ Error: Invalid hex code.";
        return false;
    }

    error.textContent = "";
    return true;
}
