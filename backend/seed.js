const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  // Keychains
  {
    name: 'Pastel Bear Keychain',
    description: 'Adorable fluffy bear keychain in soft pastel pink. Perfect bag charm!',
    price: 149,
    originalPrice: 199,
    category: 'keychains',
    emoji: '🧸',
    badge: 'Bestseller',
    isFeatured: true,
    isBestseller: true,
    rating: 4.8,
    reviews: 124,
    tags: ['cute', 'bear', 'pastel'],
    images: ['https://placehold.co/400x400/ffb6c1/ff69b4?text=🧸+Bear+Keychain']
  },
  {
    name: 'Bunny Pom Pom Keychain',
    description: 'Fluffy bunny ears keychain with pom pom tail. So kawaii!',
    price: 129,
    originalPrice: 179,
    category: 'keychains',
    emoji: '🐰',
    badge: 'New',
    isNew: true,
    rating: 4.7,
    reviews: 89,
    tags: ['bunny', 'kawaii', 'fluffy'],
    images: ['https://placehold.co/400x400/ffe4e1/ff69b4?text=🐰+Bunny+Keychain']
  },
  {
    name: 'Strawberry Charm Keychain',
    description: 'Sweet strawberry shaped keychain with glitter details.',
    price: 99,
    category: 'keychains',
    emoji: '🍓',
    rating: 4.6,
    reviews: 67,
    tags: ['fruit', 'strawberry', 'charm'],
    images: ['https://placehold.co/400x400/ffc0cb/dc143c?text=🍓+Strawberry']
  },
  {
    name: 'Star Cluster Keychain',
    description: 'Sparkly star cluster keychain with rainbow shimmer.',
    price: 149,
    category: 'keychains',
    emoji: '⭐',
    isNew: true,
    rating: 4.9,
    reviews: 43,
    tags: ['star', 'sparkle', 'rainbow'],
    images: ['https://placehold.co/400x400/fff0f5/ff69b4?text=⭐+Star+Keychain']
  },

  // Bracelets
  {
    name: 'Pearl & Heart Bracelet',
    description: 'Dainty pearl bracelet with tiny gold heart charms. Korean style elegance.',
    price: 249,
    originalPrice: 349,
    category: 'bracelets',
    emoji: '💎',
    badge: 'Trending',
    isFeatured: true,
    rating: 4.9,
    reviews: 203,
    tags: ['pearl', 'heart', 'gold', 'elegant'],
    images: ['https://placehold.co/400x400/fff5f5/ff69b4?text=💎+Pearl+Bracelet']
  },
  {
    name: 'Beaded Rainbow Bracelet',
    description: 'Colourful beaded bracelet. Mix and match with friends!',
    price: 179,
    category: 'bracelets',
    emoji: '🌈',
    isFeatured: true,
    rating: 4.7,
    reviews: 156,
    tags: ['beads', 'rainbow', 'friendship'],
    images: ['https://placehold.co/400x400/ffe4e1/ff1493?text=🌈+Rainbow+Bracelet']
  },
  {
    name: 'Daisy Chain Bracelet',
    description: 'Delicate daisy flower chain bracelet in silver. Garden fairy vibes!',
    price: 199,
    originalPrice: 279,
    category: 'bracelets',
    emoji: '🌼',
    rating: 4.6,
    reviews: 98,
    tags: ['daisy', 'flower', 'silver', 'dainty'],
    images: ['https://placehold.co/400x400/fffff0/daa520?text=🌼+Daisy+Bracelet']
  },
  {
    name: 'Butterfly Stack Bracelet Set',
    description: 'Set of 3 stackable butterfly bracelets. Wear together or solo!',
    price: 299,
    originalPrice: 399,
    category: 'bracelets',
    emoji: '🦋',
    badge: 'Set of 3',
    isFeatured: true,
    isBestseller: true,
    rating: 4.8,
    reviews: 312,
    tags: ['butterfly', 'stackable', 'set'],
    images: ['https://placehold.co/400x400/e6e6fa/9370db?text=🦋+Butterfly+Set']
  },

  // Goggles / Sunglasses
  {
    name: 'Y2K Heart Sunglasses',
    description: 'Retro Y2K style heart-shaped pink tinted sunglasses. Total bratz energy.',
    price: 449,
    originalPrice: 599,
    category: 'goggles',
    emoji: '🕶️',
    badge: 'Viral',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviews: 441,
    tags: ['Y2K', 'heart', 'sunglasses', 'retro'],
    images: ['https://placehold.co/400x400/ffb6c1/ff1493?text=🕶️+Heart+Sunnies']
  },
  {
    name: 'Star Shape Sunnies',
    description: 'Cute star-shaped frames in lavender tint. Festival must-have!',
    price: 399,
    category: 'goggles',
    emoji: '⭐',
    isNew: true,
    rating: 4.7,
    reviews: 88,
    tags: ['star', 'festival', 'lavender'],
    images: ['https://placehold.co/400x400/e6e6fa/9370db?text=⭐+Star+Sunnies']
  },
  {
    name: 'Butterfly Frame Glasses',
    description: 'Clear lens butterfly frame glasses. Aesthetic & functional!',
    price: 349,
    originalPrice: 449,
    category: 'goggles',
    emoji: '🦋',
    rating: 4.6,
    reviews: 119,
    tags: ['butterfly', 'clear', 'aesthetic'],
    images: ['https://placehold.co/400x400/f0fff0/32cd32?text=🦋+Butterfly+Frames']
  },

  // Stationery
  {
    name: 'Kawaii Bear Notebook',
    description: 'Spiral notebook with adorable bear cover. 120 pages, dotted grid.',
    price: 199,
    category: 'stationery',
    emoji: '📓',
    badge: 'Bestseller',
    isBestseller: true,
    rating: 4.8,
    reviews: 267,
    tags: ['notebook', 'kawaii', 'bear', 'dotted'],
    images: ['https://placehold.co/400x400/ffe4e1/ff69b4?text=📓+Bear+Notebook']
  },
  {
    name: 'Pastel Gel Pen Set (12 pcs)',
    description: '12 pastel gel pens — perfect for journaling, notes & doodling.',
    price: 249,
    originalPrice: 349,
    category: 'stationery',
    emoji: '✏️',
    isFeatured: true,
    rating: 4.9,
    reviews: 534,
    tags: ['pens', 'pastel', 'gel', 'journaling'],
    images: ['https://placehold.co/400x400/fff0f5/ff69b4?text=✏️+Pastel+Pens']
  },
  {
    name: 'Sticky Note Cube - Bunny',
    description: 'Cube of 300 bunny-themed sticky notes. Stick your thoughts everywhere!',
    price: 149,
    category: 'stationery',
    emoji: '🐰',
    isNew: true,
    rating: 4.7,
    reviews: 89,
    tags: ['sticky notes', 'bunny', 'cute'],
    images: ['https://placehold.co/400x400/ffe4b5/ff8c00?text=🐰+Sticky+Notes']
  },

  // Plushies
  {
    name: 'Mini Cloud Plushie',
    description: 'Super soft cloud shaped plushie with sleepy face. Cloud 9 feeling!',
    price: 299,
    originalPrice: 399,
    category: 'plushies',
    emoji: '☁️',
    isFeatured: true,
    rating: 4.9,
    reviews: 389,
    tags: ['cloud', 'soft', 'plushie'],
    images: ['https://placehold.co/400x400/f0f8ff/87ceeb?text=☁️+Cloud+Plushie']
  },
  {
    name: 'Pink Bunny Plushie',
    description: 'Classic pink bunny with rosy cheeks. Your new best friend!',
    price: 349,
    category: 'plushies',
    emoji: '🐰',
    isBestseller: true,
    rating: 4.8,
    reviews: 456,
    tags: ['bunny', 'pink', 'classic'],
    images: ['https://placehold.co/400x400/ffb6c1/ff69b4?text=🐰+Pink+Bunny']
  },

  // Accessories
  {
    name: 'Velvet Hair Scrunchie Set',
    description: 'Set of 5 velvet scrunchies in pastel shades. Hair goals!',
    price: 179,
    originalPrice: 249,
    category: 'accessories',
    emoji: '🎀',
    isFeatured: true,
    isBestseller: true,
    rating: 4.8,
    reviews: 621,
    tags: ['scrunchie', 'velvet', 'hair', 'pastel'],
    images: ['https://placehold.co/400x400/ffb6c1/ff69b4?text=🎀+Scrunchies']
  },
  {
    name: 'Pearl Hair Clip Set',
    description: 'Dainty pearl hair clips — 6 pcs. Old money aesthetic unlocked.',
    price: 199,
    category: 'accessories',
    emoji: '✨',
    isNew: true,
    rating: 4.7,
    reviews: 178,
    tags: ['pearl', 'hair clips', 'old money'],
    images: ['https://placehold.co/400x400/fffaf0/daa520?text=✨+Pearl+Clips']
  },
  {
    name: 'Butterfly Bobby Pins (12 pcs)',
    description: '12 butterfly bobby pins in assorted pastel colors.',
    price: 129,
    originalPrice: 179,
    category: 'accessories',
    emoji: '🦋',
    rating: 4.6,
    reviews: 234,
    tags: ['bobby pins', 'butterfly', 'assorted'],
    images: ['https://placehold.co/400x400/e6e6fa/9370db?text=🦋+Bobby+Pins']
  },

  // Bags
  {
    name: 'Mini Bear Backpack',
    description: 'Tiny kawaii bear backpack. Fits your essentials + all the cuteness.',
    price: 549,
    originalPrice: 749,
    category: 'bags',
    emoji: '🎒',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviews: 287,
    tags: ['backpack', 'bear', 'mini', 'kawaii'],
    images: ['https://placehold.co/400x400/ffe4e1/ff69b4?text=🎒+Bear+Backpack']
  },
  {
    name: 'Heart Crossbody Bag',
    description: 'Heart shaped mini crossbody bag in PU leather. Y2K approved!',
    price: 449,
    category: 'bags',
    emoji: '💕',
    badge: 'Trending',
    rating: 4.8,
    reviews: 193,
    tags: ['crossbody', 'heart', 'Y2K', 'PU leather'],
    images: ['https://placehold.co/400x400/ffb6c1/dc143c?text=💕+Heart+Bag']
  },

  // Beauty
  {
    name: 'Peach Lip Gloss Set',
    description: 'Set of 4 peachy pink lip glosses. Your pout, perfected.',
    price: 299,
    originalPrice: 399,
    category: 'beauty',
    emoji: '💋',
    isFeatured: true,
    isBestseller: true,
    rating: 4.8,
    reviews: 512,
    tags: ['lip gloss', 'peach', 'pink', 'set'],
    images: ['https://placehold.co/400x400/ffe4b5/ff69b4?text=💋+Lip+Gloss+Set']
  },
  {
    name: 'Glitter Nail Art Kit',
    description: 'Complete glitter nail art kit with 8 shades + tools. Nail that look!',
    price: 349,
    category: 'beauty',
    emoji: '💅',
    isNew: true,
    rating: 4.7,
    reviews: 234,
    tags: ['nail art', 'glitter', 'kit'],
    images: ['https://placehold.co/400x400/e6e6fa/ff69b4?text=💅+Nail+Art+Kit']
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);

    // Create admin user
    await User.deleteMany({ email: 'admin@scoopsy.com' });
    const admin = new User({
      name: 'Scoopsy Admin',
      email: 'admin@scoopsy.com',
      password: 'admin123',
      isAdmin: true
    });
    await admin.save();
    console.log('✅ Admin user created: admin@scoopsy.com / admin123');

    mongoose.disconnect();
    console.log('🎀 Seed complete!');
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
