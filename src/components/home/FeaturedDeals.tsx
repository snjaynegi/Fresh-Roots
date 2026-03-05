import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { cmsService, Banner } from "../../services/cmsService";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const defaultDeals: Banner[] = [
  {
    id: "1",
    title: "50% OFF Fresh Vegetables",
    image_url: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=1000",
    type: "promotional",
    display_order: 1,
    is_active: true,
    badge: "50% OFF",
    subtitle: "Limited Time Offer",
    color: "text-green-800",
    bg: "bg-green-100"
  } as any,
  {
    id: "2",
    title: "Christmas Special Deals",
    image_url: "https://images.unsplash.com/photo-1576092762791-2f94f2555448?auto=format&fit=crop&q=80&w=1000",
    type: "promotional",
    display_order: 2,
    is_active: true,
    badge: "XMAS SALE",
    subtitle: "Celebrate with Freshness",
    color: "text-red-800",
    bg: "bg-red-100"
  } as any
];

const CountdownTimer = ({ expiry }: { expiry: Date }) => {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold mt-2">
      <Clock className="w-4 h-4 animate-pulse" />
      <span>Ends in: 23h 59m 42s</span>
    </div>
  );
};

const FeaturedDeals = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await cmsService.getBanners();
        const activeBanners = data.filter(b => b.is_active);
        setBanners(activeBanners.length > 0 ? activeBanners : defaultDeals);
      } catch (error) {
        setBanners(defaultDeals);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (isLoading) return <div className="w-full h-[250px] bg-gray-100 animate-pulse rounded-2xl" />;

  return (
    <section className="w-full py-6">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={30}
        effect={'fade'}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="w-full h-[250px] rounded-2xl overflow-hidden shadow-xl"
      >
        {banners.map((deal: any) => (
          <SwiperSlide key={deal.id}>
            <div className={`relative w-full h-full flex items-center ${deal.bg || 'bg-gray-100'}`}>
              <div className="absolute inset-0 z-0">
                <img src={deal.image_url} alt={deal.title} className="w-full h-full object-cover opacity-50" />
                <div className={`absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent`} />
              </div>
              
              <div className="relative z-10 container mx-auto px-8 md:px-12 flex flex-col items-start max-w-lg justify-center h-full">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="mb-2"
                >
                  <span className={`inline-block px-3 py-1 rounded-full text-white font-bold text-xs shadow-md animate-bounce ${
                    deal.bg?.includes('green') ? 'bg-green-600' : deal.bg?.includes('red') ? 'bg-red-600' : 'bg-primary'
                  }`}>
                    {deal.badge || deal.type.toUpperCase()}
                  </span>
                </motion.div>
                
                <motion.h2 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={`text-2xl md:text-4xl font-extrabold mb-1 leading-tight ${deal.color || 'text-gray-900'}`}
                >
                  {deal.title}
                </motion.h2>
                
                <motion.p 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-sm md:text-base text-gray-700 font-medium mb-2"
                >
                  {deal.subtitle || "Exclusive Deal"}
                </motion.p>
                
                <div className="scale-90 origin-left">
                  <CountdownTimer expiry={new Date(Date.now() + 86400000)} />
                </div>
                
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-3"
                >
                  <Button 
                    size="sm" 
                    onClick={() => deal.link_url && window.open(deal.link_url, '_self')}
                    className={`${
                      deal.bg?.includes('green') ? 'bg-green-600 hover:bg-green-700' : 
                      deal.bg?.includes('red') ? 'bg-red-600 hover:bg-red-700' : 
                      'bg-primary hover:bg-primary/90'
                    } text-white px-6 py-4 text-sm rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}
                  >
                    Shop Now
                  </Button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedDeals;