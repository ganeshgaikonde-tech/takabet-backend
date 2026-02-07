require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');
const Post = require('../models/Post');
const connectDB = require('../config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Post.deleteMany();

    console.log('Data cleared');

    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@takabet.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created');

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Sports Betting',
        description: 'Latest sports betting news and tips',
        icon: '⚽',
        order: 1
      },
      {
        name: 'Casino Games',
        description: 'Casino game guides and strategies',
        icon: '🎰',
        order: 2
      },
      {
        name: 'Promotions',
        description: 'Latest betting promotions and bonuses',
        icon: '🎁',
        order: 3
      },
      {
        name: 'Betting Tips',
        description: 'Expert betting tips and predictions',
        icon: '💡',
        order: 4
      },
      {
        name: 'News',
        description: 'Latest betting industry news',
        icon: '📰',
        order: 5
      }
    ]);

    console.log('Categories created');

    // Create sample posts
    const posts = [];
    const titles = [
      'Top 10 Betting Strategies for Beginners',
      'How to Choose the Best Online Casino',
      'Understanding Betting Odds: A Complete Guide',
      'Weekly Football Betting Tips and Predictions',
      'New Player Welcome Bonus: 100% Match up to $500',
      'Live Casino vs Online Casino: Which is Better?',
      'Basketball Betting: Tips for March Madness',
      'Responsible Gambling: Setting Your Limits',
      'Cryptocurrency Betting: The Future of Online Gambling',
      'Best Casino Games with Highest RTP',
      'Tennis Betting Guide: Grand Slam Tournaments',
      'Slot Machine Tips and Tricks',
      'Sports Betting vs Casino: Which Offers Better Odds?',
      'Mobile Betting Apps: Top Picks for 2024',
      'Poker Strategy: Advanced Techniques',
      'Weekend Football Accumulator Tips',
      'How to Claim Your Free Bets',
      'Esports Betting: Complete Beginners Guide',
      'VIP Loyalty Program: Exclusive Benefits',
      'Horse Racing Betting Tips for Beginners'
    ];

    for (let i = 0; i < titles.length; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      posts.push({
        title: titles[i],
        content: `<p>This is a comprehensive guide about ${titles[i].toLowerCase()}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        
        <h2>Introduction</h2>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        
        <h2>Key Points</h2>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        
        <h2>Tips and Strategies</h2>
        <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
        
        <h2>Conclusion</h2>
        <p>Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>`,
        excerpt: `A comprehensive guide to ${titles[i].toLowerCase()}. Learn the best strategies and tips from experts.`,
        category: randomCategory._id,
        author: admin._id,
        status: 'published',
        featured: i < 5,
        tags: ['betting', 'tips', 'guide'],
        featuredImage: `https://picsum.photos/800/450?random=${i}`,
        views: Math.floor(Math.random() * 1000),
        publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      });
    }

    await Post.insertMany(posts);
    console.log('Posts created');

    console.log('✅ Database seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: admin@takabet.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
