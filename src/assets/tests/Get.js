import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class Get {
  static propTypes = {}
  static productObj= {}
  fn=function(){};

  Products = async ()=>{
    const baseUrl = 'https://test2.sionic.ru/an pi/products';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  SortedProductCategories = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/Categories?sort=[%22name%22,%22ASC%22]&range=[0,24]';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  ProductCategories = async(range=null, prevRange=0) => {
    const baseUrl = `https://test2.sionic.ru/api/Categories/${range ? `range=[${prevRange},${range}]`: ''}`;
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  SortedProducts = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/Products?sort=["name","ASC"]&range=[0,10]&filter={" category_id":20}';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  ProductsByMaxRange = async(range=null, prevRange=0) => {
    const baseUrl = `https://test2.sionic.ru/api/Products?sort=["name","ASC"]&range=[${prevRange},${range}]&filter={" category_id":20}`;
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  LazyLoad= async(fn, opt={range:0, prevRange:0, interval:0,limit:0, currentProductData:[]}) => {
    let productData;
    let checkOpts = () => {return Object.keys(opt).every((e)=>(opt[e] !== 0))}
    if(fn === "ProductsByMaxRange"){
        if( checkOpts() && typeof opt.interval === "number" && opt.prevRange !== null ){
          if(opt.limit > 4) return opt.currentProductData;

          for (const func of [this.ProductsByMaxRange, this.ProductsImages, this.ProductCategories,]) {
            let tempData;
            setTimeout(async function(){
              tempData = await func(opt.range, opt.prevRange)
            }, 2000+opt.interval);
            productData = opt.currentProductData[1] ? [...opt.currentProductData, ...tempData] : tempData
          }
          
          return this.LazyLoadProductsByMaxRange(opt.range+10, opt.range, opt.interval, opt.limit++, productData )
      }
      productData = opt.currentProductData.length > 0 ? opt.currentProductData : await this.ProductsByMaxRange(opt.range)
      return productData;
    }
    if(fn === "ProductCategories"){
      let tempData;
            setTimeout(async function(){
              tempData = await this.ProductCategories()
            }, 2000+opt.interval);
      
      return productData = tempData
    }
    
  }

  OneProduct = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/Products/2001';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }

  ProductsImages = async(range=null, prevRange=0) => {
    const baseUrl = `https://test2.sionic.ru/api/ProductImages?sort=["image_name","ASC"]&range=[${prevRange},${range}]]&filter={" product_id":1001}`;
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  
  OneProductImage = async(productid) => {
    const baseUrl = `https://test2.sionic.ru/api/ProductImages/${productid}`;
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  ProductVariations = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/ProductVariations';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }

  OneProductVariation = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/ProductVariations/1';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  OneProductVariationProperties = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/ProductVariationProperties/1';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  //tags
  ProductVariationPropertyListValues = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/ProductVariationPropertyListValues';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  OneProductVariationPropertyListValues = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/ProductVariationPropertyListValues/1';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  ProductVariationPropertyValues = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/ProductVariationPropertyValues';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  OneProductVariationPropertyValues = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/ProductVariationPropertyValues/1';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
}



export default Get;