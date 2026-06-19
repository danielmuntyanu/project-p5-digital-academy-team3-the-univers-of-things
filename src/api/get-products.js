import sleep from "@/services/utils/sleep";

export default async function getProducts(page = 1) {
  try {
    if (typeof page !== "number") page = 1;

    const URI = `https://api.jikan.moe/v4/anime?page=${page}&min_score=8.2`

    const response = await fetch(URI)

    // If error "Too Many Requests" repeat this function after a second
    if (response.status == 429) {
      await sleep(1000);
      return await getProducts(page);
    }

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const fetchedData = await response.json()

    if (!('data' in fetchedData)) {
      throw new Error(`Wrong data fetched.\nData: ${JSON.stringify(fetchedData)}`)
    }

    const items = fetchedData.data

    return items
  } catch (error) {
    console.log(`ERROR: ${error.message}`)
    return null
  }
}
