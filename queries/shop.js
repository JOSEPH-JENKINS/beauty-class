import groq from "groq";

// For the main shop page (/shop)
export const allProductsQuery = groq`
  *[_type == "product"] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    price,
    image {
      asset-> {
        url,
        metadata { lqip, dimensions }
      }
    },
    productType->{
      title,
      "slug": slug.current
    }
  }
`;

export const allProductTypesQuery = groq`
  *[_type == "productType"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

export const shopPageQuery = groq`
  *[_type == "shopPage"][0] {
    title,
    heroHeading,
    heroImage {
      asset-> {
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`;

// For the product detail page (/shop/[slug])
export const singleProductQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    price,
    description,
    image {
      asset-> {
        url
      }
    }
  }
`;
