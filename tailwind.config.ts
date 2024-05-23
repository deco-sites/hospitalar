import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "emphasis": "#E93A7D",
        "neutral-100": "#EDEDED",
        "neutral-200": "#F7F7F7",
        "main-bf-theme": "#1C1C1D !important",
        "sub-bf-theme": "#323233 !important",
        "important-white": "#fff !important",
        "sub-gray": "#C5C6CB",
        "sub-gray-2": "#4A4B51",
        "sub-gray-3": "#C5C6CB",
        "gray-4":"#999BA2",
        "gray-3": "#707279",
        "blue-bf": "#85BAD5",
        "dark-blue-bf": "#2D386E",
        "title-product": "#4A4B51",
        "price-1": "#C5C6CB",
        "warning": "#C31212",
        "box-warning": "rgba(195, 18, 18, 0.14)",
        "border-free-shipping": "#2D386E",
      },
      animation: {
        "slide-left": "slide-left-frame 0.4s ease normal",
        "slide-right": "slide-right-frame 0.4s ease normal",
        "slide-bottom": "slide-bottom-frame 0.4s ease normal",
        progress: "progress-frame ease normal",
      },
      keyframes: {
        "slide-left-frame": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-right-frame": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-bottom-frame": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "progress-frame": {
          from: {
            "--dot-progress": "0%",
          },
          to: {
            "--dot-progress": "100%",
          },
        },
      },
    },

    
  },
};
