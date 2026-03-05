import { useTheme } from "../context/ThemeContext";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const ThemeSwitcher = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleDarkMode}
      className={cn(
        "relative w-16 h-8 rounded-full transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden",
        isDarkMode ? "bg-slate-900" : "bg-sky-300"
      )}
      aria-label={isDarkMode ? t("Switch to light mode") : t("Switch to dark mode")}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        {/* Light Mode: Birds */}
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-500", 
            isDarkMode ? "opacity-0" : "opacity-100"
          )}
        >
          {/* Bird 1 */}
          <svg 
            className="absolute top-2 right-3 w-3 h-2 text-white/90 animate-bird-fly" 
            viewBox="0 0 10 5" 
            style={{ animationDelay: '0s' }}
          >
            <path d="M0 4 Q 2.5 0, 5 4 T 10 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {/* Bird 2 */}
          <svg 
            className="absolute top-4 right-7 w-2.5 h-1.5 text-white/70 animate-bird-fly" 
            viewBox="0 0 10 5" 
            style={{ animationDelay: '1.2s' }}
          >
            <path d="M0 4 Q 2.5 0, 5 4 T 10 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {/* Cloud hint */}
          <div className="absolute bottom-[-2px] right-2 w-6 h-3 bg-white/40 rounded-full blur-[2px]" />
        </div>

        {/* Dark Mode: Stars */}
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-500", 
            isDarkMode ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Main big star */}
          <div className="absolute top-2 left-3 text-white animate-star-twinkle" style={{ animationDelay: '0.2s' }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          {/* Medium stars */}
          <div className="absolute top-5 left-7 text-white/90 animate-star-twinkle" style={{ animationDelay: '0.8s' }}>
             <svg width="6" height="6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <div className="absolute bottom-2 left-4 text-white/80 animate-star-twinkle" style={{ animationDelay: '0.5s' }}>
            <svg width="5" height="5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          {/* Small dot stars */}
          <div className="absolute top-3 left-9 w-[2px] h-[2px] bg-white rounded-full animate-star-twinkle" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>

      {/* Toggle Thumb (Sun/Moon) */}
      <div
        className={cn(
          "absolute top-1 left-1 w-6 h-6 rounded-full shadow-md transform transition-transform duration-500 flex items-center justify-center z-10",
          isDarkMode 
            ? "translate-x-8 bg-slate-200" 
            : "translate-x-0 bg-yellow-400"
        )}
      >
        {isDarkMode ? (
          /* Moon Craters */
          <div className="relative w-full h-full overflow-hidden rounded-full opacity-40">
            <div className="absolute top-[25%] left-[30%] w-[20%] h-[20%] rounded-full bg-slate-400/50" />
            <div className="absolute top-[55%] left-[20%] w-[15%] h-[15%] rounded-full bg-slate-400/50" />
            <div className="absolute top-[40%] left-[60%] w-[25%] h-[25%] rounded-full bg-slate-400/50" />
          </div>
        ) : (
          /* Sun Rays (Subtle glow/ring) */
          <div className="w-full h-full rounded-full border-2 border-yellow-300/50" />
        )}
      </div>
    </button>
  );
};

export default ThemeSwitcher;
