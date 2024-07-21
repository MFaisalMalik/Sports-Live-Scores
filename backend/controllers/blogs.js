import firebase from "../firebase.js";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import fs from "fs";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
// import upload from "../utils/upload.js";

const storage = getStorage();
const db = getFirestore(firebase);

export const publishBlog = async (req, res) => {
  // upload(req, res, async (err) => {
  //   if (err) {
  //     res.status(400).send(err);
  //   } else {
      // if (req.file) {
      //   let data = {
      //     image: req.file,
      //     slug: req.body.slug,
      //     title: req.body.title,
      //     content: req.body.content,
      //   };
      //   //   // Upload image to storage and get image url first
      //   const imageURL = await uploadImage(data.image);
      //   if (imageURL) {
      //     await saveBlog({ ...data, image: imageURL, date: new Date().toLocaleDateString() })
      //       .then(() => {
      //         res.status(200).send({ statusCode: 200, message: "sucess" });
      //       })
      //       .catch(() => {
      //         res.status(400).send(error.message);
      //       });
      //   }
      // } else {
        let data = { ...req.body, date: new Date().toLocaleDateString() };
        await saveBlog(data)
          .then(() => {
            res.status(200).send({ statusCode: 200, message: "success" });
          })
          .catch((error) => {
            res.status(400).send(error.message);
          });
      // }
  //   }
  // });
};

export const updateBlog = async (req, res) => {
  // upload(req, res, async (err) => {
  //   if (err) {
  //     res.status(400).send(`58: ${err}`);
  //   } else {
  //     if (req.file) {
  //       let data = {
  //         image: req.file,
  //         slug: req.body.slug,
  //         title: req.body.title,
  //         content: req.body.content,
  //       };
  //       //   // Upload image to storage and get image url first
  //       try {
  //         const imageURL = await uploadImage(data.image)
  //         if (imageURL) {
  //           await saveBlog({ ...data, image: imageURL, date: new Date().toLocaleDateString() })
  //             .then(() => {
  //               res.status(200).send({ statusCode: 200, message: "success" });
  //             })
  //             .catch((error) => {
  //               res.status(400).send(`76,${error.message}`);
  //             });
  //         }
  //       } catch (error) {
  //         res.status(500).send(`${error.message}`)
  //       }
  //     } else {
        let data = { ...req.body, date: new Date().toLocaleDateString() };
        await saveBlog(data)
          .then(() => {
            res.status(200).send({ statusCode: 200, message: "success" });
          })
          .catch((error) => {
            res.status(400).send(`89: ${error.message}`);
          });
  //     }
  //   }
  // })
};

const uploadImage = async (file) => {
  try {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.originalname}`;
    const storageRef = ref(storage, `blog_images/${fileName}`);
    const metadata = {
      contentType: file.mimetype,
    };
    var buffer = fs.readFileSync(file.path);
    let imageURL;
    await uploadBytes(storageRef, buffer, metadata)
      .then(async () => {
        await getDownloadURL(storageRef).then((downloadURL) => {
          imageURL = downloadURL;
        });
      })
      .catch((error) => {
        console.log(`uploadbytes: ${error.message}`);
      });
    return imageURL;
  } catch (error) {
    console.log(error);
  }
};

const saveBlog = async (data) => {
  try {
    await setDoc(doc(db, "blogs", data.slug), data);
  } catch (error) {
    console.log("save error",error);
  }
};

export const checkSlugAvailability = async (req, res) => {
  try {
    const docRef = doc(db, "blogs", req.body.slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.status(200).json({ availability: false });
    } else {
      res.status(200).json({ availability: true });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getBlogs = async (req, res) => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  if (querySnapshot) {
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.json(data);
  } else {
    res.send({ error: "error" });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const docRef = doc(db, "blogs", req.body.slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.status(200).json(docSnap.data());
    } else {
      res.status(404).send({message: "Not available"});
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteBlog = async (req, res) => {
  const docRef = doc(db, "blogs", req.body.slug);
  try {
    await deleteDoc(docRef);
    res.status(204).send({message: "success"});
  } catch (error) {
    res.status(500).send(error);
  }
};


export const getArticle = async (req, res) => {
  const slug = req.params.slug;
  try {
    const docRef = doc(db, "blogs", slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.status(200).json(docSnap.data());
    } else {
      res.status(404).send({message: "Not Found"});
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

