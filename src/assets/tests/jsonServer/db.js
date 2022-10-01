import 
{
  Products,
  SortedProductCategories,
  ProductCategories,
  SortedProducts,
  ProductsByMaxRange,
  LazyLoad,
  OneProduct,
  ProductsImages,
  OneProductImage,
  ProductVariations,
  OneProductVariation,
  OneProductVariationProperties,
  ProductVariationPropertyListValues,
  OneProductVariationPropertyListValues,
  ProductVariationPropertyValues
}

 from "./index" 
 export const getFromDB = {
  Products,
  SortedProductCategories,
  ProductCategories,
  SortedProducts,
  ProductsByMaxRange,
  ProductsImages,
  ProductVariationPropertyListValues,
  ProductVariationPropertyValues
};

/**
 * 
 * @param {string} query the data to be queried from the database
 * @return {}
 */
const db = {
  // return {
    lastRequest: new Date(2000, 0, 1),
    makeRequest: async function(request) {
      // first check when last request was made
      const timeSinceLast = (new Date()).getTime() - this.lastRequest.getTime();
      this.lastRequest = new Date();
      if (timeSinceLast < 1000) {
        this.lastRequest = new Date(this.lastRequest.getTime() + (1000 - timeSinceLast));
        await new Promise((resolve) => setTimeout(resolve, 1000-timeSinceLast));
      }
      return getFromDB[request];
    },
  // };
  // return requester
}
export default db;