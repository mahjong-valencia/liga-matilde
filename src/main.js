/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

/* import './styles/style.css'; */
import './styles/custom.scss';

import { Ranking, initRanking } from "./views/ranking.js";
import { PlayerStats, initPlayerStats } from "./views/playerStats.js";
import { Games, initGames } from "./views/games.js";
import { getCurrentPage, setCurrentPage} from "./state/appState.js";
import { initModeSelector } from "./components/modeSelector.js";

const routes = {
    Ranking: {
        render: Ranking,
        init: initRanking
    },

    PlayerStats: {
        render: PlayerStats,
        init: initPlayerStats
    },

    Games: {
        render: Games,
        init: initGames
    }
};

document.addEventListener("modeChanged", () => {

    render(getCurrentPage());

});

const app = document.getElementById("app");

async function render(page) {

    const route = routes[page];

    if (!route) {
        app.innerHTML = "<h1>404</h1>";
        return;
    }

    setCurrentPage(page);

    app.innerHTML = await route.render();
    initModeSelector();

    if (route.init) {
        route.init();
    }

    updateActiveLink();
}

function updateActiveLink() {

    document.querySelectorAll("[data-page]").forEach(link => {

        link.classList.toggle(
            "active",
            link.dataset.page === getCurrentPage()
        );

    });

}

document.addEventListener("click", e => {

    const page = e.target.dataset.page;

    if (!page)
        return;

    e.preventDefault();

    render(page);

});

render(getCurrentPage());