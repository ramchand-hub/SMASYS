import multer from "multer";
import path from "path";
import fs from "fs";

const upload_folder = "uploads";

if (!fs.existsSync(upload_folder)) {
  fs.mkdirSync(upload_folder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, upload_folder);
  },

  filename: (req, file, cb) => {
    const rawName = file.originalname.split("_")[0];
    const moduleName = rawName.toLowerCase().replace(/[^a-z]/g, "");
    const ext = path.extname(file.originalname);
    const uniqueName = `${moduleName}_${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file,cb)=>{

    const ext = path.extname(file.originalname).toLowerCase();
    const imageType = ["image/jpg","image/jpeg","image/png"];
    const imageExts = [".jpg", ".jpeg", ".png"]
    const pdfType = ["application/pdf"];
    const pdfExts = [".pdf"];
     if (
    (imageType.includes(file.mimetype) && imageExts.includes(ext)) ||
    (pdfType.includes(file.mimetype) && pdfExts.includes(ext))
  ) {
    return cb(null, true);
  }

  return cb(
    new Error("Only JPG, JPEG, PNG and PDF files are allowed")
  );
}

const multer_config = multer({
  storage,
  fileFilter,
  limits:{
    fileSize: 5*1024*1024
  }
});

export default multer_config;