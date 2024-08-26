import express from 'express';
import { checkSlugAvailability, deleteBlog, getArticle, getBlogs, getSingleBlog, getSportBlogs, publishBlog, updateBlog } from '../controllers/blogs.js';

const router = express.Router();



router.post('/', publishBlog);
router.post('/default', getBlogs);
router.get('/sport', getSportBlogs);
router.put('/', updateBlog);
router.post('/slugs', checkSlugAvailability);
router.post('/delete', deleteBlog);
router.post('/article', getSingleBlog);
router.get('/:slug', getArticle);

export default router;