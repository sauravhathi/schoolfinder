import { getStates } from 'components/lib/actions'
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
  const data = await getStates();

  if (!data) {
    return NextResponse.json({ error: "No states found" }, { status: 404 });
  }

  return NextResponse.json(data, {
    headers: getCorsHeaders(req.headers.get("origin") || ""),
  });
}