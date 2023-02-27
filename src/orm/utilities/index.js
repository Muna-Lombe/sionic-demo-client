import moment from "moment"


 export const colorTags = {
         1:  'bg-[#FFA601]',
         2:  'bg-[#2967FF]',
         3:  'bg-[#58CF18]',
         4:  'bg-[#FF7CB4]',
         5:  'bg-[#FFA601]',
         6:  'bg-[#FF2D87]'
    }
const tags = [
  [6, 'День Рождения Гриши'],
  [5, 'Подарок коллегам'],
  [4, 'Подарок'],
  [5, 'Мишка'],
  [3, 'Мартышка'],
  [2, 'Игрушка'],
  [1, 'валентинки'],
]
const productStores = [
  { id: 1, name: "Davies\' Store" },
  { id: 2, name: "Clear fawn" },
  { id: 3, name: "About face" },
  { id: 4, name: "Avita" }
]
export const calcDisc =(price, discPerc)=>{
  return (price - (price * (discPerc / 100)))
}
const sampleData = [
  [1, "some nice product 10% super CHEAP!", [tags[3], tags[4], tags[1]], productStores[0], 3000, [true, 5,]],
  [3, "Great product 5% DISCOUNT", [tags[1], tags[2], tags[3]], productStores[1], 12000, [true, 5]],
  [5, "FACIAL CREAM NEW STOCK!", [tags[4], tags[3], tags[2]], productStores[2], 1500, [false]],
  [7, "some nice product 10% super CHEAP!", [tags[6], tags[4], tags[1]], productStores[3], 1000, [false]],
  [2, "Great new from somewhere stock super cheap product", [tags[2], tags[4], tags[6]], productStores[0], 9000, [true, 5]],
  [4, "FOR YOUR FACE GREAT NICE EVERYTHING NICE!", [tags[1], tags[3], tags[5]], productStores[1], 16000, [true, 5]],
  [6, "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam quidem ipsa fugit quod i", [tags[4], tags[3], tags[2]], productStores[3], 3500, [false]]
]
export const addToProductData = (product, id) => {

  // if (id > sampleData.length) {id = 0}

  const newProduct = Object.assign({
    ...product,
    // category_tags: sampleData[id][2],
    store: sampleData[id][3],
    isDiscounted: sampleData[id][5]
  })
  return newProduct
}

export const momentDate = () => {
  let time = moment().toDate().toTimeString()
  let date = moment().toDate().getDate()
  let month = moment().toDate().getMonth()
  let year = moment().toDate().getFullYear()
  return year + "-" + month + "-" + date + "," + time
}