import { motion } from 'framer-motion';
import { Plane, Carrot, Apple, Wheat, ShoppingBasket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewArrivals = () => {
  const products = [
    { id: 1, name: "Fresh Strawberries", price: "₹120", image: "https://images.unsplash.com/photo-1464965911861-746a04b4b0be?auto=format&fit=crop&q=80&w=500" },
    { id: 2, name: "Organic Spinach", price: "₹45", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=500" },
    { id: 3, name: "Sweet Corn", price: "₹30", image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=500" },
    { id: 4, name: "Red Bell Peppers", price: "₹80", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=80&w=500" },
  ];

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Animation Container */}
      <div className="absolute top-0 left-0 w-full h-64 pointer-events-none overflow-hidden">
        {/* Clouds */}
        <motion.div 
          animate={{ x: [-100, 2000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-10 left-0 opacity-30"
        >
          <div className="w-20 h-10 bg-gray-100 rounded-full blur-md" />
        </motion.div>

        {/* Airplane */}
        <motion.div
          animate={{ x: [-100, window.innerWidth + 100] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute top-20 left-0 z-10 text-primary"
        >
          <Plane className="w-16 h-16 fill-current rotate-90 text-green-600" />
          
          {/* Dropping Items */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 200, opacity: [0, 1, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                delay: i * 0.5,
                ease: "easeIn"
              }}
              className="absolute top-10 left-4"
            >
              {i === 0 ? <Carrot className="w-6 h-6 text-orange-500" /> : 
               i === 1 ? <Apple className="w-6 h-6 text-red-500" /> : 
               <Wheat className="w-6 h-6 text-yellow-500" />}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
          >
            Fresh Arrivals
          </motion.h2>
          <p className="text-gray-600">Just landed from the farm!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden bg-gray-50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse shadow-sm">
                  New Arrival
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                <p className="text-green-600 font-bold mt-1">{product.price}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">Fresh Today</span>
                  <Button size="sm" variant="outline" className="hover:bg-green-600 hover:text-white border-green-200 text-green-700">
                    <ShoppingBasket className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;