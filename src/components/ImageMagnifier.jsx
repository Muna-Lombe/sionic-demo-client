import React, { useEffect, useState } from 'react'
import { imagepath } from '../assets/images'

const ImageMagnifier = ({  handleClick,images, sqrDim = 400 }) => {
  const [itemsCentered, setItemsCenter] = useState(false)
  const [activeImage, setActiveImage] = useState(false)
  const img_root = imagepath
  useEffect(()=>{
    return images?.length
    ? setActiveImage(images[0])
    : ""
  }, [images])
  function magnify(imgId, zoom) {
    let img, mesh, glass, w, h, bw;

    img = document.getElementById(imgId)
    glass = document.querySelector(".img-magnifier-glass")
    mesh = document.querySelector(".mesh-mask")

    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth;
    h = glass.offsetHeight;

    glass.addEventListener("mousemove", moveMagnifier);
    mesh.addEventListener("mousemove", moveMagnifier);

    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {

      let pos, x, y, whOffsetBal, bgPosOffset;
      e.preventDefault();

      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      whOffsetBal =50
      bgPosOffset = 0.89
      if (x > img.width - (w / zoom)) { x = img.width - (w/zoom); }
      if (x < w / zoom) { x = w / zoom; }
      if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
      if (y < h / zoom) { y = h / zoom; }

      const left = (x - w+whOffsetBal) + "px";
      const top = (y - h+whOffsetBal) + "px";
      glass.style.left = left;
      glass.style.top = top;
      glass.style.backgroundPosition = `-${((x * zoom*bgPosOffset) + w + bw)}px -${((y * zoom) - h + bw)}px`;

    }

    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }

  }
  const HorizontalLine = ({ count }) => (
    <div className="absolute w-full h-full flex flex-col justify-center items-center gap-1">
      {
        Array(count).fill().map((i,x) => <div key={x} className="line w-full h-[1px] border border-black border-b-[0.6px] opacity-20"></div>)
      }
    </div>

  )
  const VerticalLine = ({ count }) => (
    <div className="absolute w-full h-full flex justify-center items-center gap-1">
      {
        Array(count).fill().map((i,x) => <div key={x}  className="line w-[1px] h-full border border-black border-b-[0.6px] opacity-20 "></div>)
      }
    </div>

  )
  const handleSetActive = (id) => { 
      // console.log("active id", e)
      if(activeImage.id !== id) setActiveImage(images.find((i) => i.id === id ))
  }

  const SmallSizeImageArray = () => (
      <div className={" w-["+sqrDim+"px] max-w-full flex justify-center "}>
        {
          
          images?.map((i,idx)=>
            <img 
              key={idx}
              id={(activeImage.id === i.id) ? "active " : i.id} 
              alt="gallery"
              onClick={handleClick} 
              onMouseEnter={(e) => (activeImage.id !== i.id ? handleSetActive(Number.parseInt(e.target.id)) : ("")  )} 
              className={"w-[" + (sqrDim / (sqrDim / 10) * 10)+"px] aspect-square" + ((activeImage.id === i.id) ? " p-[0.8px] border-[3px] border-[#00000037] rounded-md" : " p-2") +" object-cover object-center block cursor-pointer"} 
              src={img_root(i.id)} 
            />
          )
        }
      </div>
  )
  const CurrentImage = () => (
      <div className={"mesh-magnifier-container relative w-[" +sqrDim+ "px] max-w-full aspect-square"}>
        <div onMouseEnter={(e) => magnify("activeImage", 3)} className={"mesh-mask modal absolute w-full h-full bg-black opacity-50"}>
          {/* <VerticalLine count={Number.parseInt(((sqrDim / (sqrDim / 10) * 5)).toString())} />
          <HorizontalLine count={Number.parseInt(((sqrDim / (sqrDim / 10) * 5)).toString())} /> */}

        </div>
          {
            images?.length ?
            <img id="activeImage" alt="gallery" className={"w-full aspect-square object-cover object-center block"} src={img_root(activeImage.id || images[0].id)} />
              : ""
          }
      <div className={"img-magnifier-glass absolute bottom-0 right-0 w-[100px] aspect-square border-[3px] border-slate-600  rounded-md cursor-none"}></div>
      </div>
  )
  const ToggleBtn = () =>(
    <div onClick={()=> setItemsCenter(prevState => !prevState)} className={"w-[42px] border border-slate-200 flex flex-row self-end cursor-pointer items-start "+ (itemsCentered ? "justify-end ": "justify-start ") }>
      {
        itemsCentered ?
        <span>🟩</span>
        : <span>🟥</span>
      }
    </div>
  )
  return (
    <div className={"img-magnifier-container relative flex flex-col" + (itemsCentered ? " items-center" : " ") + " "} >
      <CurrentImage />
      <SmallSizeImageArray  />
      {/* <ToggleBtn /> */}
    </div>
  )
}

export default ImageMagnifier