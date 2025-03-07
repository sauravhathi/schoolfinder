import { SearchSchools } from "components/components/search-schools"
import { Suspense } from "react"

const base = process.env.NEXT_PUBLIC_URL as string + "/schools"

const fetcher = async (url: string) => {
  const response = await fetch(url, { cache: 'force-cache'})
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

const getStates = async () => {
  return fetcher(`${base}/states`)
}

const getDistricts = async () => {
  return fetcher(`${base}/districts`)
}

export default async function Home() {
  const [stateData, districtData] = await Promise.all([getStates(), getDistricts()])

  return (
    <main className="flex-1">
      <section className="py-12 md:py-16 lg:py-20 bg-muted">
        <div className="container text-center space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Find Schools Across India
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search through thousands of schools across India by name, state, district, or other criteria. This tool is
            completely free and open source.
          </p>
        </div>
      </section>
      <section className="py-8">
        <div className="container">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchSchools states={stateData} districts={districtData} />
          </Suspense>
        </div>
      </section>
    </main>
  )
}

