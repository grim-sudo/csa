/* Per-page SEO. React 19 automatically hoists <title>, <meta> and <link>
   rendered anywhere in the tree into <head>, so each page can declare its
   own metadata. */

const SITE = "Champion Sport Activities";
const BASE_URL = "https://www.championsportactivities.co.uk";

export function Seo({ title, description, path = "/", image = "/og-image.svg" }) {
  const fullTitle = title ? `${title} | ${SITE}` : SITE;
  const url = `${BASE_URL}${path}`;
  const img = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </>
  );
}
