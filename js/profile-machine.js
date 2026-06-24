const CSS_TEMPLATE = `

/* MADE BY ~MIIICA VIA PROFILE MACHINE 
https://miiica-exe.github.io/meads-machines/profile-machine.html */
/* TESTING AREA, IF YOU HAVE NEW CODES TO ADD */

/* =========================================================
   SECTION: GLOBAL / BASE STYLES
   ========================================================= */
body {  
    background: var(--body-bg);
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
}

/*that big space on top, USERNAMES Profile*/ 
#header-logo-info, #profile-header, #battle-status {
    display: none;
}

#top-buttons-contain {
    background: var(--bg-accent) !important;
    z-index:0;
}
#top-buttons-contain>div {
    background: none;
}
.coin-balance, #coin-balance-top, .unread-link {
    display: none !important;
}

/* customize profile etc */
.text-center {
    background: none;
    border: none;
}

/* title boxes - welcome!, recent posts, forum sig, etc */
.no-margin, header.m-0 {
    background: var(--bg-accent);
}
.fa {
    color: var(--text-color);
}
/* title boxes TEXT */
header.no-margin h2, header.m-0 h2 {
    color: var(--text-color);
    text-align: left;
}

/* bottom boxes */
.col-12 section, .modal-dialog { 
    box-shadow: inset 0 0 40px rgba(0,0,0,0.3);
    background: var(--bg-main);
    color: var(--text-color) !important;
}

/* spoiler body */
.spoilerbody, .spoiler blockquote {
    background: rgba(0, 0, 0, 0.3);
    color: var(--text-color);
}

/* title of quote box */
.topslice_quote {
    background: transparent;
    border: none;
    color: var(--text-color);
}

/* quote body */
#profile_right .bbc_standard_quote, blockquote.bbc_standard_quote, .bbc_standard_quote {
    background: rgba(0, 0, 0, 0.5);
    color: var(--text-color);
}

/* =========================================================
   SECTION: LINKS, BUTTONS, & NAVIGATION
   (links, main menu, header nav text)
   ========================================================= */

/* Normal links */
a, a:link, a:visited, [role=link], a {
    color: var(--text-color) !important;
    text-decoration: none !important;
    font-style: normal !important;
    display: inline-block; /* needed so transform works */
    transition: color 0.5s ease, transform 0.3s ease;
}

/* change the menu - pets, forums, etc */
.menu, #header-nav.menu, #header-nav {
    position: fixed;
    z-index:1000;
    top: -.5%!important;
    text-align: left;
    background: none;
    border: none;
}

/* change the menu TEXT */
#header-nav div a, .modal, a.untapped, a.untapped a:link, #nav-forums.show, #header-nav>div>a:last-child, #header-nav.menu a:link, #header-nav div, .modal, #header-nav.menu a:hover, #header-nav.menu a:link, .untapped, #nav-games, #nav-shop, #nav, #nav-settings, #nav-help, .show div a {
    background: none; /* there is an other small bg around the words so in general this should stay none */
}

/* unread replies */
#unread-replies-link, #unread-replies-link{
    background: none !important;
    box-shadow: none;
    color: var(--text-color);
}

.bell-inactive {
    display:none !important;
}

/* buttons */
.content-box a[role=button], .adopt-btn, a[role=button], .spoilerbutton, .spoilerbutton:hover, .spoilerbutton:active, button.spoilerbutton, button.spoilerbutton a:hover, button.spoilerbutton a:active, .content-box button, .content-box input[type=button], .content-box input[type=datetime-local], .content-box input[type=email], .content-box input[type=number], .content-box input[type=password], .content-box input[type=search], .content-box input[type=submit], .content-box input[type=text], .content-box select, .content-box textarea, .forum-post-box a[role=button], .forum-post-box button, .forum-post-box input[type=button], .forum-post-box input[type=datetime-local], .forum-post-box input[type=email], .forum-post-box input[type=number], .forum-post-box input[type=password], .forum-post-box input[type=search], .forum-post-box input[type=submit], .forum-post-box input[type=text], .forum-post-box select, .forum-post-box textarea, .tabbed-container .tabbed-sections>.tab-open a[role=button], .tabbed-container .tabbed-sections>.tab-open button, .tabbed-container .tabbed-sections>.tab-open input[type=button], .tabbed-container .tabbed-sections>.tab-open input[type=datetime-local], .tabbed-container .tabbed-sections>.tab-open input[type=email], .tabbed-container .tabbed-sections>.tab-open input[type=number], .tabbed-container .tabbed-sections>.tab-open input[type=password], .tabbed-container .tabbed-sections>.tab-open input[type=search], .tabbed-container .tabbed-sections>.tab-open input[type=submit], .tabbed-container .tabbed-sections>.tab-open input[type=text], .tabbed-container .tabbed-sections>.tab-open select, a[role=button], button, input[type=button], input[type=datetime-local], input[type=email], input[type=number], input[type=password], input[type=search], input[type=submit], input[type=text], select, textarea, .tabbed-container .tabbed-sections>.tab-open textarea, section a[role=button], section button, section input[type=button], section input[type=datetime-local], section input[type=email], section input[type=number], section input[type=password], section input[type=search], section input[type=submit], section input[type=text], section select, section textarea {
    background: var(--bg-main);
    color: var(--text-accent);
}

/* --------------------
   SUBSECTION: DROPDOWN 
   --------------------*/
/* Dropdown sub-menus */
#bs-menu>div a.tapped, 
#bs-menu>div:hover>a, 
#bs-menu>div>div, 
#header-nav>div a.tapped, 
#header-nav>div:hover>a, 
#header-nav>div>div {
    background: var(--bg-main);
    border: none;
    color: var(--text-color);
}

/* Sub-menu links */
#bs-menu>div>div a, #header-nav>div>div a {
    color: var(--text-color) !important;
    text-decoration: none;
}

#bs-menu>div>div a:hover, #header-nav>div>div a:hover {
    color: var(--text-accent) !important; 
    font-style: italic;
}
/* =========================================================
   SECTION: SMALL / MISC MODULES
   (all the wierd lil boxes and stuff)
   ========================================================= */
/* this makes text the same color, it's important! */
h1, h2, h3, h4, h5, h6 {
    color: var(--text-color);
}

/* pronouns, playertag, last seen, etc */
.thread-attr {
    background: none;
    border: none;
    color: var(--text-color);
}

/* item box for gifting events */
.item-box, .quantity, .adv-pet-icon, #adv-bulk-options, #adv-list-footer, .adv-pet-icon, .adv-sort-options, .post-user-ptag, blockquote, code.bbc_code {
    background: transparent !important;
    border: none !important;
}

/* gift event pet dropdown */
.ss-main .ss-single-selected {
    background: var(--bg-accent) !important;
    }

/* pattern credit */
.pet-tile, .pet-tile-name {
    background: none;
    border: none;
    color: var(--text-color);
    width: 100% !important;
}
.spotlight-img {
    background-position: 50%;
    background-size: 100% !important;
    background-repeat: no-repeat;
    height: 100px !important;
    width: 100% !important;
}

/* toolbar on PC */
.side-tools, .toolbar-window, .toolbar-window>div {
  background: var(--bg-main); 
  color: var(--text-color);
}
.toolbar-button.open, .toolbar-active-item, .toolbar-button {
    background: var(--bg-main) !important;
}
table {
    background: var(--bg-main);
}
textarea {
    background: var(--bg-main) !important;
}
.progress .bar>.label {
    color: var(--text-color) !important;
    background: var(--bg-main) !important;
}

/* calendar */
.fc-event, .fc-daygrid-event-harness, .fc-event.fc-start.fc-event-end.fc-eventpast.fc-daygrid-event.fc-daygrid-block-event.fc-h-event {
    background: var(--bg-main) !important;
}
/* Event dot override */
.fc-event-dot, .fc-daygrid-event-dot, .fc-event::before {
  background-color: var(--text-color) !important; 
}
/* lines between the days */
.fc .fc-daygrid-day {
    border: 1px solid var(--text-color);
}

/* market listing */
.mkt-featured-listing {
    display: flex;
    flex-wrap: wrap;
    height: 110px !important;
    margin-right: 10px;
    background-color: transparent !important;
    padding: 10px;
    box-shadow: none !important;
    justify-content: center;
    align-content: start;
    overflow-y: auto;
    text-align: center;
}
.item-qty {
    background-color: var(--bg-main) !important;
}

/* notification popup box */ 
.notification-box, .notification-box .text { 
    background: var(--bg-main); 
    border: none; 
    color: var(--text-color); 
}

/* custom stray popup */
#stray-encounter-container, #stray-encounter-background, #stray-encounter-canvas, #stray-encounter-buttons, #stray-encounter-buttons * {
    background: var(--bg-main); 
    border: none; 
    color: var(--text-color); 
}
/* stray grass thingy */
#stray-encounter-foreground {
    background: none;
}

/* popups n stuff */
.modal-dialog .modal-footer, .modal-dialog .modal-title {
    background: var(--bg-accent);
}
.modal-dialog .modal-body a[role=button], .modal-dialog .modal-body button, .modal-dialog .modal-body input[type=button], .modal-dialog .modal-body input[type=datetime-local], .modal-dialog .modal-body input[type=email], .modal-dialog .modal-body input[type=number], .modal-dialog .modal-body input[type=password], .modal-dialog .modal-body input[type=search], .modal-dialog .modal-body input[type=submit], .modal-dialog .modal-body input[type=text], .modal-dialog .modal-body select, .modal-dialog .modal-body textarea {
    background: var(--bg-accent);
}
/* =========================================================
   SECTION: AUDIO & MEDIA
   ========================================================= */

audio {
  filter: sepia(0.6) blur(.6);
  opacity: 0.4;
  transition: opacity 1s ease;
  height: 25px;
  width: 60%;
}
audio:hover {
  opacity: 0.7;
}

/* =========================================================
   SECTION: SCROLLBAR
   ========================================================= */
/* Custom scrollbar for everything */
::-webkit-scrollbar {
    width: 5px;  
    height: 10px;
}

::-webkit-scrollbar-track {
    background: var(--bg-main);
}

::-webkit-scrollbar-thumb {
    background: var(--text-color); 
}

/* Firefox (fallback) */
* {
    scrollbar-width: thin; 
    scrollbar-color: var(--text-color) black; 
}

/* =========================================================
   SECTION: MOBILE OVERRIDES
   ========================================================= */
@media only screen and (max-width: 512px) {
#mob-nav-btns .toolbar {
    background: var(--bg-accent) !important;
    top: 3px !important;
    right: 10% !important;
}
.toolbar-window.open {
    background: none;
    border: none;
}
  body {
    background: var(--body-bg) !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
    background-size: cover !important;
    background-attachment: fixed !important;
  }
.responsive #logo {
    display: none !important;
    }
  /* bottom boxes mobile */
  .col-12 section, .bottom-box, .panel, .widget {
    background-color: var(--bg-main) !important; 
    border: none;
    color: var(--text-color);
  }
}

/*CODE BY ~MIIICA
PHOTOS, SUCH AS BACKGROUNDS, BADGES, ETC COME FROM XANJE OR FREE-TO-USE SOURCES, I DO NOT CREATE THEM*/
`;

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

    let rootCSS = `:root {\n`;

    VARIABLES.forEach(variable => {
        rootCSS += `  --${variable}: ${values[variable] || ""};\n`;
    });

    rootCSS += `}\n\n`;

    const fullCSS = CSS_TEMPLATE + rootCSS;

    output.value = fullCSS;
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
