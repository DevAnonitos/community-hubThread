export const getNews = async() => {
    try {
        const headers = new Headers();
        headers.append('X-RapidAPI-Key', process.env.RAPIDAPI_NEWS_KEY || '');
        headers.append('X-RapidAPI-Host', 'coinranking1.p.rapidapi.com');

        const res = await fetch(
            `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0`,
            {
                method: 'GET',
                headers: headers,
            },
        );

        const dataResult = await res.json();
        console.log(dataResult);
        return dataResult;
    } catch (error) {
        console.log(error);
    }
};