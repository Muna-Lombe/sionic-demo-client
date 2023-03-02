
export const setTextBg = (text, size={h:1, w:1, x:0, y:1, font:8})=>(
  
  { backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' height=\'' + size.h + 'px\' width=\'' + size.w + 'px\' style=\'\'><text x=\'' + size.x + '\' y=\'' + size.y + '\' fill=\'gray\' font-family=\'' + 'Raleway' +'\' font-size=\'' + size.font  +'\'>'+text+'</text></svg>")' }
)

export const titleTagTypes={
  currencyType : "USD",
  location: { city: "Kazan", state: "Republic of Tatarstan" },
  buyBtn:{
    mainText :"Add to cart", subText :"Delivery Tomorrow", tooltip :"Item already in cart"
  },
  collectionCard:{
    text:"New Collection"
  },
  home:{
    categoriesText: "Categories", settingsText: "Settings"
  },
  cart:{
    currencyType : "USD", cartTag:"Cart", emptyCartBtnTag:"Empty Cart",
    qtyType: "pcs.", promoCountdown: "to ", priceMinTag: "from", checkoutTag:"Checkout", totalInCartTag:"Cart Total"
  },
  checkout:{
    checkoutText: "Complete Checkout", orderWhenText : "Delivery date", orderToWhereText : "Delivery address",
     receiverNameText : "Receiver's name", phoneText :"Receiver's contact",
    totalPriceText : "Order total", deliveryCostText : "Delivery cost", sumTotalText : "Total", checkoutBtnText : "Checkout" 
  },
  contentSpecification:{
    mainText : "Go to the description", subText :"Unit value of the product"
  },
  discountInfo:{
    titleText: "The best price for Ozon", moreText: "Learn About Price Reduction",
  },
  footer:{
    storename: "Katundu", joinus: "Join Us!", appInstall: "Install the app", trademark: "© Katundu", legal:"legal information",
    privacy:"Privacy Policy"
  },
  noItem:{
    mainText : "😃 Waiting for products to load 😃", subText :"🙅 looks like no items here 👀"
  },
  orderHistory:{
    mainText: "History of orders", showMoretext : "Read more", orderStatusText : "Order status", orderNumberText : "Order number", 
    quantityOrderedText : "Number of goods", orderCostText : "Order cost", deliveryAddressText :"Delivery address"
  },
  orderInfo:{
    text : "information about delivery"
  },
  paymentType:{
    mainText :"Ozon installments", subText :"Read more"
  },
  pickupPoints:{
    text : "Supply points and postmates"
  },
  questionBanner:{
    mainText: "Ask a question about the product",
    subText: "You will be answered by the seller, brand representative or user who bought this product.We will send a notification when a response is received"
  },
  reviewsAndQuestions:{
    mainText:"Reviews and questions about the product", 
    productReviewsText:"PRODUCT REVIEWS",
    QAsText:"QUESTIONS AND ANSWERS ABOUT THE PRODUCT"
  }

  
}

export {default as SearchIco } from './SearchIco';
export {default as PinIco } from './PinIco';
export {default as BasketIco } from './BasketIco';
export {default as CartIco } from './CartIco';
export {default as SidebarBanner } from './SidebarBanner';
export {default as DiscountIco } from './DiscountIco';
export {default as DeleteIco } from './DeleteIco';
export {default as LocationIco } from './LocationIco';
export {default as OpenIco } from './OpenIco';
export {default as CopyIco } from './CopyIco';
export {default as HomeIco} from './HomeIco';
export { default as AvatarIco } from './AvatarIco';
export { default as FbIco } from './FbIco';
export { default as InstaIco } from './InstaIco';
export { default as VkIco } from './VkIco';
export { default as ArrowRight } from './ArrowRight';
export { default as ArrowLeft } from './ArrowLeft';
export { default as ArrowDown } from './ArrowDown';
export { default as BellIco } from './BellIco';
export { default as InfoIco } from './InfoIco';
export { default as CheckIco } from './CheckIco';
export { default as StarIco } from './StarIco';
export { default as ThumbIco } from './ThumbIco';
export { default as CancelIco } from './CancelIco';
export { default as ToggleIco } from './ToggleIco';
export { default as FilterIco } from './FilterIco';
