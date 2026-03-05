import { motion } from 'framer-motion';
import { ArrowRight, Carrot, Apple, Wheat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: "vegetables",
    name: "Fresh Vegetables",
    description: "Farm fresh veggies delivered daily",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800",
    icon: Carrot,
    color: "bg-green-500"
  },
  {
    id: "fruits",
    name: "Juicy Fruits",
    description: "Sweet and seasonal fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=800",
    icon: Apple,
    color: "bg-red-500"
  },
  {
    id: "staples",
    name: "Staple Foods",
    description: "Rice, Wheat, Pulses & more",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
    icon: Wheat,
    color: "bg-yellow-500"
  }
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer shadow-xl"
              onClick={() => navigate(`/products?category=${category.id}`)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${category.color} mb-4 shadow-lg`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {category.description}
                </p>
                
                <Button 
                  className="bg-white text-gray-900 hover:bg-primary hover:text-white transition-colors duration-300 rounded-full px-6 group-hover:px-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/products?category=${category.id}`);
                  }}
                >
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;