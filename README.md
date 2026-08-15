# Latchpoint Studios

Marketing site for Latchpoint Studios, built with Next.js 16, Tailwind CSS v4, and Motion.

## Develop

```bash
npm install
npm run dev
```

## Contact form

`/contact` posts to `src/app/api/contact/route.ts`. Until the environment
variables below are set, submissions are accepted and logged to the server
console but not emailed.

Set these in `.env.local` (and in Vercel's project settings for production)
to enable real delivery via [Resend](https://resend.com):

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@yourdomain.com
```

The `from` address in the API route (`site@latchpointstudios.com`) needs to
be on a domain verified in Resend before delivery will work.

## Before going live

- **`hello@latchpointstudios.com`** is a placeholder used in the footer,
  contact page, and API route. Swap it for a real inbox you control, or
  register the domain.
- **About page bio** is a first draft inferred from limited context. Review
  and personalize the copy in `src/app/about/page.tsx` before publishing.
- **Portfolio screenshots** in `public/work/` were captured from the live
  sites at build time. Re-capture them if those sites change meaningfully.
