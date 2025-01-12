const key = process.env.NEXT_PUBLIC_GEO_API_KEY!;
export const GEO_LOCATION = `https://api.geoapify.com/v1/ipinfo?&apiKey=${key}`;
