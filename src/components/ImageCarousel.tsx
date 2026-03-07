import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Props = {
  images: string[];
};

const ImageCarousel = ({ images }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
      <div ref={emblaRef}>
        <div className="flex">
          {images.map((src) => (
            <div key={src} className="flex-[0_0_100%]">
              <div className="w-full aspect-[4/3] sm:aspect-[16/9]">
                <img src={src} alt="" className="w-full h-full object-cover rounded-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
