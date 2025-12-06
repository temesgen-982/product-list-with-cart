import data from '$lib/data/data.json';

export const load = async() => {
    return {
        items: data
    };
}

