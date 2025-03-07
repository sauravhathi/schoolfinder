import Link from "next/link"

const base = process.env.NEXT_PUBLIC_URL as string

export default function Documentation() {
  return (
        <div className="container py-8 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p>
                The SchoolFinder API provides access to a comprehensive database of schools across India. You can search
                for schools by name, state, district, and other criteria. This API is free to use and open source.
              </p>

              <p>
                The data is sourced from the{" "}
                <Link href="https://aishe.gov.in" className="text-blue-600 hover:underline" target="_blank">
                  AISHE
                </Link>{" "}
                and{" "}
                <Link href="https://src.udiseplus.gov.in" className="text-blue-600 hover:underline" target="_blank">
                  UDISE
                </Link>{" "}
                websites.
                <br />
                <strong>Note:</strong> The data was collected in <span className="font-bold">2024</span> and may not be updated.
              </p>
            </section>

            <section className="space-y-4 p-4 border rounded-md bg-gray-100">
              <h2 className="text-xl font-bold">Disclaimer & Terms of Use</h2>
              <p>
                The data provided by SchoolFinder is sourced from government websites and is offered &quot;as-is&quot; without any
                guarantees of accuracy or updates. Users are responsible for verifying the information independently.
              </p>
              <p>
                By using this API, you agree that SchoolFinder and its developers are not liable for any inaccuracies,
                misuse, or legal issues arising from the use of this data.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Base URL</h2>
              <div className="bg-muted p-4 rounded-md font-mono">{base}</div>
              <p>
                This API is provided as a free and open source service. There are no usage restrictions, but please be
                considerate with your request volume.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Endpoints</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold">GET /schools</h3>
                  <p className="text-muted-foreground mb-2">Search for schools with various filters</p>

                  <h4 className="font-semibold mt-4 mb-2">Query Parameters</h4>
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium">Parameter</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-2 text-sm font-mono">query</td>
                          <td className="px-4 py-2 text-sm">string</td>
                          <td className="px-4 py-2 text-sm">Search term for school name or code</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-mono">state</td>
                          <td className="px-4 py-2 text-sm">string</td>
                          <td className="px-4 py-2 text-sm">Filter by state name</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-mono">district</td>
                          <td className="px-4 py-2 text-sm">string</td>
                          <td className="px-4 py-2 text-sm">Filter by district name</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-mono">page</td>
                          <td className="px-4 py-2 text-sm">integer</td>
                          <td className="px-4 py-2 text-sm">Page number (default: 1)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-mono">limit</td>
                          <td className="px-4 py-2 text-sm">integer</td>
                          <td className="px-4 py-2 text-sm">Results per page (default: 10, max: 100)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-semibold mt-4 mb-2">Example Request</h4>
                  <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                    GET /schools?query=delhi
                  </div>

                  <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                  <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-pre">
                    {`{
    "totalItems": 10,
    "totalPages": 1,
    "page": 1,
    "search": "delhi",
    "next": "${base}/schools?query=delhi&state=&page=2&limit=10",
    "results": [
        {
            "id": 433289,
            "udiseschcode": "23500822114",
            "universityname": null,
            "universityid": null,
            "universitytype": null,
            "collegename": null,
            "collegeid": null,
            "collegetype": null,
            "institutionname": null,
            "institutionid": null,
            "institutiontype": null,
            "address": null,
            "website": null,
            "specialisedin": null,
            "schoolname": "Privt. HSS DELHI PUBLIC SCHOOL VINDHYA NAGAR",
            "schooltype": "Pr. with Up.Pr. Sec. and H.Sec.",
            "pincode": 486885,
            "locality": "Urban",
            "category": 3,
            "type": 3,
            "classfrom": 1,
            "classto": 12,
            "status": null,
            "state": "MADHYA PRADESH",
            "district": "SINGRAULI",
            "block": "WAIDHAN",
            "cluster": "Govt. HSS   GIRLS  WAIDHAN",
            "village": "NAGAR NIGAM (S) WARD 40",
            "management": "Private Unaided (Recognized)",
            "yearofestablishment": null,
            "yearwhendecalreduniversity": null,
            "uploadyear": null,
            "instituteaddedinsurveyyear": null
        },
        // More results...
            ]
        },`}
                  </div>
                </div>
              </div>
            </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Error Codes</h2>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium">Status Code</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-4 py-2 text-sm">400</td>
                        <td className="px-4 py-2 text-sm">Bad Request - Your request is invalid</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm">500</td>
                        <td className="px-4 py-2 text-sm">Internal Server Error - We had a problem with our server</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
          </div>
        </div>
  )
}

