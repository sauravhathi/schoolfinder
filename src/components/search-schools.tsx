"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "components/components/ui/button"
import { Input } from "components/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/components/ui/select"
import { Card, CardContent } from "components/components/ui/card"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "components/components/ui/table"
import { District, SchoolData, State } from "components/types"
import { columns } from "components/app/data"

const base = process.env.NEXT_PUBLIC_URL as string + "/schools"

export function SearchSchools({ states, districts }: { states: State[]; districts: District[] }) {
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get("query") || "delhi")
  const [state, setState] = useState(searchParams.get("state") || "")
  const [district, setDistrict] = useState(searchParams.get("district") || "")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, state, district, currentPage]);

  const handleSearch = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()

      if (query) params.append("query", query)
      if (state && state !== "ALL STATES") params.append("state", state)
      if (district) params.append("district", district)
      params.append("page", currentPage.toString())

      const url = `${base}?${params.toString()}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await response.json()
      setSchoolData(data)
    } catch (err) {
      setError("An error occurred while fetching data. Please try again.")
      console.error("Error searching schools:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search schools by name"
              className="pl-8"
              defaultValue={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="whitespace-nowrap">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            {/* <Button onClick={handleSearch}>Search</Button> */}
          </div>
        </div>

        {showFilters && (
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL STATES">All States</SelectItem>
                      {states.map((s) => (
                        <SelectItem key={s.id} value={s.statename}>
                          {s.statename}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">District</label>
                  <Select value={district} onValueChange={setDistrict}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL DISTRICTS">All Districts</SelectItem>
                      {districts.map((d) => (
                        <SelectItem key={d.id} value={d.districtname}>
                          {d.districtname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {isLoading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {schoolData && (
        <>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{schoolData.results.length}</span> of{" "}
              <span className="font-medium">{schoolData.totalItems}</span> schools
            </div>
          </div>

          <div className="border rounded-lg overflow-x-auto">
            <Table
              className="text-xs"
            >
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.Header} className="whitespace-nowrap">
                      {column.Header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody
              >
                {schoolData.results.map((school: any) => (
                  <TableRow key={school.id}>
                    {columns.map((column) => (
                      <TableCell key={column.Header} className="whitespace-nowrap">
                        {school[column.accessor] || "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 1 || isLoading}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="text-sm">
              Page {currentPage} of {schoolData.totalPages}
            </div>

            <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === schoolData.totalPages || isLoading}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

