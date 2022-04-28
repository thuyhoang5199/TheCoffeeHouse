module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    // "./node_modules/flowbite/**/*.js",
    // "./src/**/*.{html,js,ts,tsx,jsx}", 
    // "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('flowbite/plugin')
    require("daisyui", "tw-elements/dist/plugin")

  ],
}