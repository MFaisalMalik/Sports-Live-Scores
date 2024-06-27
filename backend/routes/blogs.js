import express from 'express';
import { checkSlugAvailability, deleteBlog, getArticle, getBlogs, getSingleBlog, publishBlog, updateBlog } from '../controllers/blogs.js';

const router = express.Router();



router.post('/', publishBlog);
router.get('/', getBlogs);
router.put('/', updateBlog);
router.post('/slugs', checkSlugAvailability);
router.post('/delete', deleteBlog);
router.post('/article', getSingleBlog);
router.get('/:slug', getArticle);

export default router;