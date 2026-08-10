// src/services/data.js

const cache = {};

export async function getData(mode) {

    if (cache[mode]) return cache[mode];

    const response = await fetch(
        `${import.meta.env.BASE_URL}data/data${mode}.json`
    );

    cache[mode] = await response.json();

    return cache[mode];
}