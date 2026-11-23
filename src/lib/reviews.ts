// Reviews live in HQ's database (the `reviews` table). The websites read them through the `public_reviews` view, which lists approved rows only
// and withholds the name and brokerage of anyone who asked not to be named. The public (anon) key is enough: it can read that view and
// insert a pending review, nothing else.

export type PublicReview = { id: string; name: string | null; brokerage: string | null; rating: number; quote: string; created_at: string };

/** Approved reviews for a product, newest first. Returns [] when anything is missing or fails, so a page just shows no reviews rather than breaking. */
export async function getApprovedReviews(product: "close" | "websites" | "realestate", limit = 12): Promise<PublicReview[]> {
  const url = process.env.HQ_SUPABASE_URL;
  const key = process.env.HQ_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const res = await fetch(`${url}/rest/v1/public_reviews?product=eq.${product}&order=created_at.desc&limit=${limit}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const rows = (await res.json()) as PublicReview[];
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}
