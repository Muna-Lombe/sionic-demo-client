
export const setTextBg = (text, size={h:1, w:1, x:0, y:1, font:8})=>(
  
  { backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' height=\'' + size.h + 'px\' width=\'' + size.w + 'px\' style=\'\'><text x=\'' + size.x + '\' y=\'' + size.y + '\' fill=\'gray\' font-family=\'' + 'Raleway' +'\' font-size=\'' + size.font  +'\'>'+text+'</text></svg>")' }
)

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
