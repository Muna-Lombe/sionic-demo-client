import React from 'react'

const ImageMagnifier = ({ img_root, products, sqrW = 400 }) => {
  function magnify(imgId, zoom) {
    let img, mesh, glass, w, h, bw, maxCanHeight, minCanHeight, maxCanWidth, minCanWidth;

    img = document.getElementById(imgId)
    glass = document.querySelector(".img-magnifier-glass")
    mesh = document.querySelector(".mesh-mask")

    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    maxCanHeight = img.clientHeight/2
    maxCanWidth = img.clientLeft
    minCanHeight = 0// img.offsetHeight
    minCanWidth = 0//img.offsetWidth
    // w = maxCanWidth - (glass.offsetWidth) - minCanWidth;
    // h = maxCanHeight - (glass.offsetHeight) - minCanHeight;
    w = glass.offsetWidth;
    h = glass.offsetHeight;

    glass.addEventListener("mousemove", moveMagnifier);
    mesh.addEventListener("mousemove", moveMagnifier);

    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {

      let pos, x, y;
      e.preventDefault();

      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;

      if (x > img.width - (w / zoom)) { x = img.width - (w/zoom); }
      if (x < w / zoom) { x = w / zoom; }
      if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
      if (y < h / zoom) { y = h / zoom; }

      const left = (x - w) + "px";
      const top = (y - h) + "px";
      console.log("glass", glass.offsetWidth)
      glass.style.left = left;
      glass.style.top = top;
      console.log("current bg-poz", glass.style.backgroundPosition)
      glass.style.backgroundPosition = `-${((x * zoom*0.919) + w + bw)}px -${((y * zoom) - h + bw)}px`;

      console.log("new bg-poz", glass.style.backgroundPosition)


    }

    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      console.log("cursor pos", e.clientX, e.clientY)
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
        Array(count).fill().map(i => <div className="line w-full h-[1px] border border-black border-b-[0.6px] opacity-20"></div>)
      }
    </div>

  )
  const VerticalLine = ({ count }) => (
    <div className="absolute w-full h-full flex justify-center items-center gap-1">
      {
        Array(count).fill().map(i => {
          return <div className="line w-[1px] h-full border border-black border-b-[0.6px] opacity-20 "></div>
        })
      }
    </div>

  )
  const handleSetActive = () => { }

  const SmallSizeImageArray = () => (
    <>
      {
        products.length ?
          (
            <div className="flex">
              <img id="myimage" alt="gallery" onClick={() => handleSetActive()} className="w-[100px] h-[100px] p-2 object-cover object-center block" src={img_root(+products[0]?.images[0].id)} />
              <img id="myimage" alt="gallery" onClick={() => handleSetActive()} className="w-[100px] h-[100px] p-2 object-cover object-center block" src={img_root(+products[0]?.images[1].id)} />
              <img id="myimage" alt="gallery" onClick={() => handleSetActive()} className="w-[100px] h-[100px] p-2 object-cover object-center block" src={img_root(+products[0]?.images[2].id)} />
            </div>
          )

          : ""
      }
    </>
  )
  const CurrentImage = () => (
    <div>
      <div className={`mesh-magnifier-container relative w-[${sqrW}px] aspect-square border border-red-500`}>
        <div onMouseEnter={(e) => magnify("myimage", 3)} className={`mesh-mask modal absolute w-full h-full `}>
          <VerticalLine count={Number.parseInt((sqrW / 5.5).toString())} />
          <HorizontalLine count={Number.parseInt((sqrW / 5.5).toString())} />

        </div>
          {
            products.length ?
              <img id="myimage" alt="gallery" className="w-[400px] h-[400px] object-cover object-center block" src={img_root(+products[0]?.images[0].id)} />
              : ""
          }
        <div className="img-magnifier-glass absolute w-24 h-24 border-[3px] border-[#000] rounded-md cursor-none"></div>
      </div>
      
      

    </div>
  )
  return (
    <div className="img-magnifier-container relative p-3 flex flex-col  border border-green-400 " >
      {/* <img id="myimage" src="img_girl.jpg" width="600" height="400" alt="Girl"/> */}
      <CurrentImage />
      <SmallSizeImageArray />

    </div>
  )
}

export default ImageMagnifier