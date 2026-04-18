import Tag from "../models/tag.model.js";
import Post from "../models/post.model.js";
import redisClient from "../config/redis.config.js";


export const getAllTags = async (req, res) => {
    const cacheKey = 'all_tags';
    const cachedTags = await redisClient.get(cacheKey);
    if (cachedTags) {
        return res.status(200).json({
            success: true,
            tags: JSON.parse(cachedTags)
        });
    }

    const tags = await Tag.find().sort({ name: 1 });

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(tags));

    // const tags = (await Tag.find()).sort({ name: 1 });
    return res.status(200).json({
        success: true,
        tags
    });
};

export const getPostsByTag = async (req, res) => {
    const { slug } = req.params;
    const tag = await Tag.findOne({ slug });
    if (!tag) {
        return res.status(404).json({
            success: false,
            message: "Tag not found!"
        });
    }
    const posts = await Post.find({
        tags: tag.name
    })
        .populate('author', 'username reputation avatar')
        .sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        tag: tag.name,
        count: posts.length,
        posts
    });
}

