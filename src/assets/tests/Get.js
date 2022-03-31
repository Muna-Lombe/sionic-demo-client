import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class Get {
  
  static propTypes = {}
   Products = async ()=>{
    const baseUrl = 'https://test2.sionic.ru/api/products';
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
  ProductCategories = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/Categories/21';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  SortedProducts = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/Products?sort=["name","ASC"]&range=[0,24]&filter={" category_id":20}';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  OneProduct = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/Products/2001';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }

  ProductsImages = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/ProductImages?sort=["image_name","ASC"]&range=[0,24]&filter={"product_id":1001}';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    return productData;
  }
  
  OneProductImage = async() => {
    const baseUrl = 'https://test2.sionic.ru/api/ProductImages/3001';
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