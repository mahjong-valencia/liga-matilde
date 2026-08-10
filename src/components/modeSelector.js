// src/components/modeSelector.js

import { getCurrentMode } from "../state/appState.js";
import { setCurrentMode } from "../state/appState.js";

export function ModeSelector() {

    const mode = getCurrentMode();

    return `
        <div class="card border-0 shadow-sm mb-4">

            <div class="card-body">

                <div class="d-flex justify-content-between align-items-center">

                    <div>
                        <h5 class="mb-1">Reglas de juego</h5>
                        <small class="text-muted">
                            ¿A que juegas, MCR o Riichi?
                        </small>
                    </div>

                    <div class="btn-group">

                        <button
                            class="btn ${
                                mode === "MCR"
                                    ? "btn-secondary"
                                    : "btn-outline-secondary"
                            }"
                            data-mode="MCR">

                            MCR

                        </button>

                        <button
                            class="btn ${
                                mode === "Riichi"
                                    ? "btn-secondary"
                                    : "btn-outline-secondary"
                            }"
                            data-mode="Riichi">

                            Riichi

                        </button>

                    </div>

                </div>

            </div>

        </div>
    `;
}

export function initModeSelector() {

    document.querySelectorAll("[data-mode]").forEach(button => {

        if (button.dataset.mode === getCurrentMode()) {
            return;
        }

        button.addEventListener("click", () => {

            setCurrentMode(button.dataset.mode);

            document.dispatchEvent(
                new CustomEvent("modeChanged")
            );

        });

    });

}