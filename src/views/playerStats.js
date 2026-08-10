// src/views/playerStats.js

import { ModeSelector } from "../components/modeSelector.js";
import { getCurrentMode } from "../state/appState.js";
import { getData } from "../services/data.js";
import { getPlayerStatistics } from "../utils/playerStatistics.js";

let data;


export async function PlayerStats(){

    data=await getData(getCurrentMode());

    return `

${ModeSelector()}
<div class="container">

<h1 class="mb-4">

📊 Estadísticas

</h1>

<div class="row mb-4">

<div class="col-md-4">

<select
id="playerSelect"
class="form-select">

${data.players.map(player=>`

<option value="${player.id}">

${player.name}

</option>

`).join("")}

</select>

</div>

</div>

<div id="playerStats"></div>

</div>

`;

}

function renderPlayer(data, playerId){

const stats=getPlayerStatistics(data,playerId);
const isMCR = getCurrentMode() === "MCR";

document.querySelector("#playerStats").innerHTML=`

<div class="row g-4">

<div class="col-md-3">

<div class="card text-center">

<div class="card-body">

<h6>Ranking</h6>

<h2>

#${stats.rankingPosition}

</h2>

</div>

</div>

</div>

<div class="col-md-3">

<div class="card text-center">

<div class="card-body">

<h6>Victorias</h6>

<h2>

${stats.winRate.toFixed(1)}%

</h2>

</div>

</div>

</div>

<div class="col-md-3">

<div class="card text-center">

<div class="card-body">

<h6>Partidas</h6>

<h2>

${stats.totalGames}

</h2>

</div>

</div>

</div>


<div class="col-md-3">

<div class="card text-center">

<div class="card-body">

<h6>Mejor SP</h6>

<h2>

${stats.bestGame?.sp ?? "-"}

</h2>

</div>

</div>

</div>

</div>

<div class="row mt-4">

<div class="col-md-6">

<div class="card">

<div class="card-header">

Resumen

</div>

<div class="card-body">

<table class="table">

<tr>

${isMCR ? `
<th>Promedio TP</th>

<td>${stats.averageTp.toFixed(2)}</td>

</tr>` : ""}

<tr>

<th>Promedio SP</th>

<td>${stats.averageSp.toFixed(1)}</td>

</tr>

<tr>

<th>Peor SP</th>

<td>${stats.worstGame?.sp ?? "-"}</td>

</tr>

<tr>

<th>🥇 Primeros</th>

<td>${stats.positions.first}</td>

</tr>

<tr>

<th>🥈 Segundos</th>

<td>${stats.positions.second}</td>

</tr>

<tr>

<th>🥉 Terceros</th>

<td>${stats.positions.third}</td>

</tr>

<tr>

<th>4º Puestos</th>

<td>${stats.positions.fourth}</td>

</tr>

</table>

</div>

</div>

</div>

<div class="col-md-6">

<div class="card">

<div class="card-header">

Últimas partidas

</div>

<div class="card-body">

<table class="table table-striped text-center">

<thead>

<tr>

<th>Fecha</th>

${isMCR ? `<th>TP</th>` : ""}

<th>SP</th>

</tr>

</thead>

<tbody>

${stats.games

.sort((a,b)=>new Date(b.date)-new Date(a.date))

.slice(0,10)

.map(game=>`

<tr>

<td>${game.date}</td>

${isMCR ? `<td>${game.tp}</td>` : ""}

<td> ${game.sp} </td>

</tr>

`).join("")}

</tbody>

</table>

</div>

</div>

</div>

</div>

`;

}

export function initPlayerStats(){

const select=document.querySelector("#playerSelect");

renderPlayer(data, select.value);

select.addEventListener("change",()=>{

renderPlayer(data, select.value);

});

}