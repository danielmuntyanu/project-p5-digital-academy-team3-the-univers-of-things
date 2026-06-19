import sleep from "@/services/utils/sleep";

export default async function getAnimeById(id) {
  try {
    const URI = `https://api.jikan.moe/v4/anime/${id}`

    const response = await fetch(URI)

    // If error "Too Many Requests" repeat this function after a second
    if (response.status == 429) {
      await sleep(1000);
      return await getAnimeById(id);
    }

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const fetchData = await response.json()

    if (!('data' in fetchData)) {
      throw new Error(`Wrong data fetched.\nData: ${JSON.stringify(fetchData)}`)
    }

    return fetchData.data
  } catch (error) {
    console.log(`ERROR: ${error.message}`)
    return null
  }
}
