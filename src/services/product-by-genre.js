export default async function getAnimeByGenre(genreId) {
    try {
        const URI = `https://api.jikan.moe/v4/anime?genres=${genreId}&limit=4`
        console.log('Fetching:', URI);
        

        const response = await fetch(URI)
        console.log('Status:', response.status);
        

        if (!response.ok) {
            throw new Error("Network response was not ok")
        }

        const fetchData = await response.json()

        if(!("data" in fetchData)) {
            throw new Error(`Wrong data fetched.\nData: ${JSON.stringify(fetchData)}`)
        }

        return fetchData.data
    } catch (error) {
        console.log(`Error: ${error.message}`)
        return null
    }
}