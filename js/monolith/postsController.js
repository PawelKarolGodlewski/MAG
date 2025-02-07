const postService = require('./postsService');

exports.getAllPosts = async (req, res) => {
    try {
        const category = req.query.category;
        const posts = await postService.getAllPosts(category);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.addPost = async (req, res) => {
    try {
        const { title, content, category_id } = req.body;
        await postService.addPost(title, content, category_id);
        res.status(201).json({ message: 'Post added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await postService.deletePost(id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
