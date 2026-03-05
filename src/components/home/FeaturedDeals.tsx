import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const deals = [
  {
    id: 1,
    title: "50% OFF Fresh Vegetables",
    subtitle: "Limited Time Offer",
    bg: "bg-green-100",
    color: "text-green-800",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=1000",
    badge: "50% OFF",
    expiry: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
  },
  {
    id: 2,
    title: "Christmas Special Deals",
    subtitle: "Celebrate with Freshness",
    bg: "bg-red-100",
    color: "text-red-800",
    image: "https://images.unsplash.com/photo-1576092762791-2f94f2555448?auto=format&fit=crop&q=80&w=1000",
    badge: "XMAS SALE",
    expiry: new Date(Date.now() + 48 * 60 * 60 * 1000)
  },
  {
    id: 3,
    title: "Holi Festival Offers",
    subtitle: "Colors of Nature",
    bg: "bg-purple-100",
    color: "text-purple-800",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1000",
    badge: "HOLI SPECIAL",
    expiry: new Date(Date.now() + 72 * 60 * 60 * 1000)
  }
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
        {deals.map((deal) => (
          <SwiperSlide key={deal.id}>
            <div className={`relative w-full h-full flex items-center ${deal.bg}`}>
              <div className="absolute inset-0 z-0">
                <img src={deal.image} alt={deal.title} className="w-full h-full object-cover opacity-50" />
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
                    deal.id === 1 ? 'bg-green-600' : deal.id === 2 ? 'bg-red-600' : 'bg-purple-600'
                  }`}>
                    {deal.badge}
                  </span>
                </motion.div>
                
                <motion.h2 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={`text-2xl md:text-4xl font-extrabold mb-1 leading-tight ${deal.color}`}
                >
                  {deal.title}
                </motion.h2>
                
                <motion.p 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-sm md:text-base text-gray-700 font-medium mb-2"
                >
                  {deal.subtitle}
                </motion.p>
                
                <div className="scale-90 origin-left">
                  <CountdownTimer expiry={deal.expiry} />
                </div>
                
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-3"
                >
                  <Button size="sm" className={`${
                    deal.id === 1 ? 'bg-green-600 hover:bg-green-700' : 
                    deal.id === 2 ? 'bg-red-600 hover:bg-red-700' : 
                    'bg-purple-600 hover:bg-purple-700'
                  } text-white px-6 py-4 text-sm rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}>
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