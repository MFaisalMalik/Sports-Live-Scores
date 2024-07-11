// import multer, { diskStorage } from 'multer';
// import path, { extname as _extname } from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename);

// // Set up storage engine
// const storage = diskStorage({
//     destination: './uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + _extname(file.originalname));
//     }
// });

// // Initialize upload variable
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }, // Limit file size to 1MB
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// }).single('image'); // 'file' should match the name attribute in your formData

// // Check file type
// function checkFileType(file, cb) {
//     // Allowed extensions
//     const filetypes = /jpeg|jpg|png|gif|pdf/;
//     // Check extension
//     const extname = filetypes.test(_extname(file.originalname).toLowerCase());
//     // Check mime type
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }

// export default upload;
