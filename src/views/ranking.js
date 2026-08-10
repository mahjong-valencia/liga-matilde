// src/views/ranking.js

import { ModeSelector } from "../components/modeSelector.js";
import { getCurrentMode } from "../state/appState.js";
import { getData } from "../services/data.js";
import { calculateRanking } from "../utils/ranking.js";

export async function Ranking() {

    const data = await getData(getCurrentMode());

    const ranking = calculateRanking(data);

    const isMCR = getCurrentMode() === "MCR";

    return `
    
${ModeSelector()}

<div class="container">

<h1 class="mb-4">

🏆 Ranking

</h1>

<table class="table table-striped table-hover align-middle rounded overflow-hidden text-center">

<thead class="table-dark">

<tr>

<th>#</th>

<th>Jugador</th>

${isMCR ? "<th>TP</th>" : ""}

<th>SP</th>

</tr>

</thead>

<tbody>

${ranking.map((player,index)=>`

<tr>

<td>

${index==0?"🥇":index==1?"🥈":index==2?"🥉":index+1}

</td>

<td>

${player.name}

</td>

${isMCR ? `
  <td class="text-center">
    <span class="d-inline-block text-end" style="min-width: 4.5rem;">
      ${player.avgTp.toFixed(2)}
    </span>
  </td>
` : ""}

<td class="text-center">
  <span class="d-inline-block text-end" style="min-width: 4.5rem;">
    ${player.avgSp.toFixed(1)}
  </span>
</td>

</tr>

`).join("")}

</tbody>

</table>

</div>

`;

}

export function initRanking(){

}