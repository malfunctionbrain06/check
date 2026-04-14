// Placeholder image generator for products
// In production, replace with actual product images or CMS images

export function getPlaceholderImage(productCode: string): string {
  // Returns a consistent placeholder image based on product code
  // Using a color gradient based on the product code hash
  const colors = [
    'F7A8B8', // soft pink
    'C97BA4', // coral pink
    'E8D5D0', // beige
    'FBF7F4', // cream
    'D4A5C3', // mauve
  ];

  // Simple hash function to get consistent color per product
  const hash = productCode.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);

  const colorIndex = hash % colors.length;
  const bgColor = colors[colorIndex];

  // Return a placeholder URL (you can use placeholder services or generate SVG)
  return `https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&q=80`;
}
