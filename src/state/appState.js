// src/state/appState.js

let currentMode = "MCR";
let currentPage = "Ranking";

export function getCurrentMode() {
    return currentMode;
}

export function setCurrentMode(mode) {
    currentMode = mode;
}

export function getCurrentPage() {
    return currentPage;
}

export function setCurrentPage(page) {
    currentPage = page;
}