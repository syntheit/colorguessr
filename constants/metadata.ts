const additionalLinkTags = [
  {
    rel: "icon",
    href: "/favicon-32.png",
    size: "32x32",
  },
  {
    rel: "icon",
    href: "/favicon-128.png",
    size: "128x128",
  },
  {
    rel: "apple-touch-icon",
    href: "/apple-touch-icon.png",
    size: "180x180",
  },
  {
    rel: "icon",
    href: "/favicon-192.png",
    size: "192x192",
  },
];

const description =
  "Can you the guess hex/rgb of a color just by looking at it?";

export const index = {
  title: "ColorGuessr",
  description,
  openGraph: {
    url: "https://www.colorguessr.matv.io",
    title: "ColorGuessr",
    description,
    site_name: "ColorGuessr",
  },
  additionalLinkTags,
};

export const four04 = {
  title: "404 | ColorGuessr",
  description,
  openGraph: {
    url: "https://www.colorguessr.matv.io/404",
    title: "404 | ColorGuessr",
    description,
    site_name: "ColorGuessr",
  },
  additionalLinkTags,
};
