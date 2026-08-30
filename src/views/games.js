// src/views/games.js

import { ModeSelector } from "../components/modeSelector.js";
import { getCurrentMode } from "../state/appState.js";
import { getData } from '../services/data.js';

export async function Games() {
  const data = await getData(getCurrentMode());
  const isMCR = getCurrentMode() === "MCR";

  return `
    ${ModeSelector()}
    <div class="container">
      <h1 class="mb-4">Partidas</h1>

      <div class="accordion" id="gamesAccordion">

        ${data.games.map((game) => `

          <div class="accordion-item mb-0 border border-dark">

            <h2 class="accordion-header" id="heading-${game.id}">
              <button class="accordion-button collapsed" 
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-${game.id}"
                      aria-expanded="false"
                      aria-controls="collapse-${game.id}">
                
                🀄 Partida ${game.id} - ${game.date}
              </button>
            </h2>

            <div id="collapse-${game.id}" 
                 class="accordion-collapse collapse"
                 data-bs-parent="#gamesAccordion">

              <div class="accordion-body">

                <div class="row">

                  ${game.results.map(r => {
                    const player = data.players.find(p => p.id === r.playerId);

                    return `
                      <div class="col-md-6 mb-2">
                        <div class="card">
                          <div class="card-body d-flex justify-content-between align-items-center">

                            <div>
                              <h6 class="mb-0">${player.name}</h6>
                              <small class="text-muted">Jugador</small>
                            </div>

                            <div class="text-end">
                              ${isMCR ? `<div><strong>TP:</strong> ${r.tp}</div>` : ""}
                              <div><strong>SP:</strong> ${r.sp}</div>

                            </div>

                          </div>
                        </div>
                      </div>
                    `;
                  }).join('')}

                </div>

              </div>
            </div>

          </div>

        `).join('')}

      </div>
    </div>
  `;
}

export function initGames(){

}