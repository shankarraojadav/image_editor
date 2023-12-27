import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

  if (allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Supported only image files (JPEG, PNG, GIF)!"), false);
  }
};

const uploader = multer({ storage: storage, fileFilter: fileFilter });

export default uploader;
