import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import User from "./models/user.model.js";
import Post from "./models/post.model.js";
import bcrypt from "bcrypt";

configDotenv();

const demo_POSTS = [{
    title: "Mastering Tailwind v4: The Good, The Bad, and The Beautiful",
    content: "Vite and Tailwind v4 are a match made in heaven. The zero-config setup and incredibly fast build times are changing how I build frontends. What's your first impression of the new `@theme` engine?",
    tags: ["Programming", "Design"],
    votesCount: 85,
    commentsCount: 12
},
{
    title: "Why I shifted from Bootstrap to Shadcn UI",
    content: "It's all about ownership. Shadcn doesn't trap you in a package; it gives you the source code. My UI feels much more unique now. Who else has made the switch recently?",
    tags: ["Design", "Productivity"],
    votesCount: 124,
    commentsCount: 28
},
{
    title: "Project TalkFlow: Let's build a community!",
    content: "The goal of this project is to create a premium, high-performance forum experience. We're focusing on smooth transitions, secure auth, and real-time interaction. Looking for feedback on the new sidebar layout!",
    tags: ["Gaming", "General"],
    votesCount: 56,
    commentsCount: 5
}];


const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Post.deleteMany({});
        console.log("Cleared existing posts.")
        let demoUser = await User.findOne({ email: "demo@talkflow.com" });
        if (!demoUser) {
            console.log("No demo user found creating one...");

            const hashedPassword = await bcrypt.hash("password123", 12);
            demoUser = await User.create({
                username: "demo",
                email: "demo@talkflow.com",
                password: hashedPassword,
                role: "user"
            });
            console.log("Created demo user: DemoWriter");
        }

        const postsWithAuthor = demo_POSTS.map(post => ({
            ...post,
            author: demoUser._id
        }));

        await Post.insertMany(postsWithAuthor);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();