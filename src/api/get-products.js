import sleep from "@/services/utils/sleep";

let retries = 0;
const MAX_RETRIES = 20;

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

    // If error "504" jikan API server problems
    if (response.status == 504) {

      try {
        await sleep(1500)
        const altURL = 'https://api.jikan.moe/v4/anime'
        const resp = await fetch(altURL)
        const respJson = await resp.json()
        return respJson.data;
      } catch (error) {
        throw new Error("there is technical work on the website. Please, try again later.")
      }

      // console.log(`Trying to fetch again: ${retries}/${MAX_RETRIES} tries`);
      
      // retries++;
      // if (retries > MAX_RETRIES) {
      //   throw new Error("Can not get data from API. Please, try again later.")
      // }
      // await sleep(4000);
      // return await getProducts(page);
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
    return null;
  }
}
