/** @type {import('tailwindcss').Config} */

// This line is a JSDoc comment that indicates the type of the configuration object.
// It tells the IDE that this configuration follows the structure defined by Tailwind CSS.

module.exports = {
  // The 'content' property defines the content source for Tailwind CSS to analyze.
  // It specifies which files should be processed to generate the final CSS file.
  content: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.css'],

  // The 'theme' property is used to extend the default theme provided by Tailwind CSS.
  // You can customize various aspects of your design here, such as colors, spacing, etc.
  theme: {
    extend: {}, // You can add your customizations here as an object.
  },

  // The 'plugins' property allows you to add additional plugins to Tailwind CSS.
  // Plugins are external modules that provide extra functionality and utilities.
  plugins: [], // You can include any plugins you need in this array.
};
