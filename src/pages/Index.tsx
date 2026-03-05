
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import PersonalizedRecommendations from "../components/PersonalizedRecommendations";
import LoyaltyBanner from "../components/LoyaltyBanner";
import FeaturedDeals from "../components/home/FeaturedDeals";
import NewArrivals from "../components/home/NewArrivals";
import CategorySection from "../components/home/CategorySection";
import { extendedProducts } from "../data/products";
import { Button } from "@/components/ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    // Check if user is logged in and fetch user data
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching user data:', error);
            return;
          }

          setCurrentUser(userData);
          
          // Fetch recently viewed products
          if (userData?.viewedProducts?.length) {
            const recentlyViewedItems = extendedProducts.filter(product => 
              userData.viewedProducts.includes(product.id)
            ).slice(0, 4);
            
            setRecentlyViewed(recentlyViewedItems);
          }
          
          // Generate recommendations based on favorite categories
          if (userData?.favoriteCategories?.length) {
            const recommendations = extendedProducts.filter(product => 
              userData.favoriteCategories.includes(product.category)
            ).slice(0, 8);
            
            setRecommendedProducts(recommendations);
          } else {
            // Default recommendations
            setRecommendedProducts(extendedProducts.slice(0, 8));
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };

    fetchUserData();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="flex-grow">
        {/* Featured Deals Section */}
        <div className="container mx-auto px-4 pt-6">
          <FeaturedDeals />
        </div>

        {/* New Arrivals Section */}
        <NewArrivals />

        {/* Category Section */}
        <CategorySection />

        <div className="container mx-auto px-4 py-8">
          {currentUser && <LoyaltyBanner user={currentUser} />}
        
        {recentlyViewed.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">{t("Recently Viewed")}</h2>
            <ProductGrid products={recentlyViewed} />
          </div>
        )}
        
        {recommendedProducts.length > 0 && (
          <PersonalizedRecommendations products={recommendedProducts} />
        )}

        <div className="flex justify-center my-12">
          <Link to="/products">
            <Button size="lg" className="text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-primary hover:bg-primary/90">
              {t("Explore All Products")}
            </Button>
          </Link>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
