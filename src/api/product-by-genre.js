import sleep from "@/services/utils/sleep";

export default async function getAnimeByGenre(genreId) {
    try {
        const URI = `https://api.jikan.moe/v4/anime?genres=${genreId}&limit=4&min_score=8.2`
        console.log('Fetching:', URI);
        
        const response = await fetch(URI)
        console.log('Status:', response.status);
        
        // If error "Too Many Requests" repeat this function after a second
        if (response.status == 429) {
            await sleep(1000);
            return await getAnimeByGenre(genreId);
        }

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