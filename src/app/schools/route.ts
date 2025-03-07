import { getSchools } from 'components/lib/actions'
import { getCorsHeaders } from 'components/lib/utils';
import { NextResponse, NextRequest } from 'next/server'

export const OPTIONS = async (request: NextRequest) => {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: getCorsHeaders(request.headers.get("origin") || ""),
    }
  );
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const query = searchParams.get('query')?.trim() || '';
    const state = searchParams.get('state')?.trim() || '';
    const district = searchParams.get('district')?.trim() || '';
    let page = parseInt(searchParams.get('page') || '1', 10);
    let limit = parseInt(searchParams.get('limit') || '10', 10);

    if ((!state && query.length < 4) || (state && query.length < 3)) {
      return NextResponse.json(
        { error: `Query must be at least ${state ? 3 : 4} characters long` },
        { status: 400, headers: getCorsHeaders(req.headers.get("origin") || "") }
      );
    }

    page = Math.max(page, 1);
    limit = Math.max(limit, 1);

    const schools = await getSchools(query, state, district, page, limit);
    return NextResponse.json(schools, { headers: getCorsHeaders(req.headers.get("origin") || "") });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: getCorsHeaders(req.headers.get("origin") || "") }
    );
  }
}