// AQUI PUEDES CAMBIAR EL ID PARA MOSTRAR OTRO ANIME (Sistema de admin en sprint 2)
import sleep from "@/services/utils/sleep";

const FEATURED_ANIME_ID = 21 // Cowboy Bebop

export default async function getFeatured() {
  try {
    const URI = `https://api.jikan.moe/v4/anime/${FEATURED_ANIME_ID}`

    const response = await fetch(URI)

    // If error "Too Many Requests" repeat this function after a second
    if (response.status == 429) {
      await sleep(1000);
      return await getFeatured();
    }

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const fetchedData = await response.json()

    if (!('data' in fetchedData)) {
      throw new Error(`Wrong data fetched.\nData: ${JSON.stringify(fetchedData)}`)
    }

    return fetchedData.data
  } catch (error) {
    console.log(`ERROR: ${error.message}`)
    return null
  }
}
