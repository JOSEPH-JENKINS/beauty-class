import groq from "groq";

export const allProductsQuery = groq`
*[_type == "product"]{
  _id,
  title,
  price,
  image {
        asset->{
            _id,
            url,
            metadata { lqip, dimensions }
        }
    },
    slug {
        current
    },
  description
}
`;

export const singleProductQuery = groq`
*[_type == "product" && slug.current == $slug][0]{
  _id,
  title,
  price,
  description,
  image {
        asset->{
            _id,
            url,
            metadata { lqip, dimensions }
        }
    },
    slug {
        current
    },
  description
}
`;
