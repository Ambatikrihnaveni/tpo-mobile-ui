import gql from "graphql-tag";
import ProductVariant from "./productVariant";

export default gql`
  fragment Product on Product {
    _id
    currentProductHash
    description
    account {
      _id
      name
    }
    lessons{
      _id
      name
      topics{
        _id
        shopId
        productId
        lessonId
        topic_name
        topic_summary
        topic_content
      }
    }
    isDeleted
    isVisible
    metaDescription
    metafields {
      key
      value
    }
    media {
      _id
      URLs {
        small
      }
      priority
    }
    originCountry
    pageTitle
    productType
    publishedAt
    publishedProductHash
    shop {
      _id
    }
    slug
    socialMetadata {
      message
      service
    }
    supportedFulfillmentTypes
    tagIds
    tags {
      nodes {
        _id
        name
      }
    }
    title
    updatedAt
    vendor
    variants {
      ...ProductVariant
      options {
        ...ProductVariant
      }
    }
  }
  ${ProductVariant}
`;
