
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '@/components/ui/carousel';
import { useAutoSlide } from '../../hooks/useAutoSlide';

interface Promotion {
  title: string;
  subtitle: string;
  description?: string;
  names?: string[];
  image: string;
}

const PromotionsCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  useAutoSlide(api, 4000);

  const promotions: Promotion[] = [
    {
      title: "Transact & Win",
      subtitle: "Great prizes await",
      description: "All customers who pay with PayGo in store will stand a chance to win great prizes",
      image: "/lovable-uploads/3ce9f1fb-b753-4102-8a22-a51a0cf90c72.png"
    },
    {
      title: "Mobile Money",
      subtitle: "AUGUST 27-28",
      description: "Special promotion for mobile money transactions",
      image: "/lovable-uploads/c33112b4-8b2b-4d2d-97d5-5db6d30d2254.png"
    },
    {
      title: "Winners",
      subtitle: "of K20 airtime",
      names: ["Patience Ng'andwe", "Phiri John"],
      image: "/lovable-uploads/df8c5190-45dd-42bb-a63b-2d0ac0fe8e40.png"
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4">Current Promotions</h3>
      <Carousel 
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {promotions.map((promotion, index) => (
            <CarouselItem key={index}>
              <div className="relative rounded-2xl overflow-hidden h-[240px]">
                <img 
                  src={promotion.image} 
                  alt={promotion.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default PromotionsCarousel;
