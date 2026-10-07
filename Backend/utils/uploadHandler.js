const multer = require("multer");
const path = require("path");
const Boom = require("boom");
const fs = require("fs");

class UploadHandler {
  constructor(fileSize) {
    this.fileSize = fileSize;
    this.max_image_size = 204800;
    this.max_video_size = 2048000;

    const uploadFolder = "uploads";
    if (!fs.existsSync(uploadFolder)) {
      console.log("Uploads folder not found, creating...");
      fs.mkdirSync(uploadFolder);
    } else {
      console.log("Uploads folder exists");
    }

    this.storage = multer.diskStorage({
      destination(req, file, cb) {
        const root = path.normalize(`${__dirname}/../..`);
        const finalPath = `${root}/uploads/`;
        console.log("Setting destination folder:", finalPath);
        cb(null, finalPath);
      },
      filename(req, file, cb) {
        const safeName = `${Date.now()}_${file.originalname.replace(/\s/g, "")}`;
        console.log("Generating file name:", safeName);
        cb(null, safeName);
      },
    });

    this.uploadFile = this.uploadFile.bind(this);
  }

  handleUploadError(req, res, next, upload) {
    upload(req, res, function (err) {
      console.log("Upload attempt finished");
      if (err) {
        console.error("❌ Multer error caught:", err);
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(Boom.badRequest(err, "File size limit exceeds"));
        }
        return next(Boom.badRequest(err, "Error in file upload"));
      }

      console.log("✅ Upload success. Proceeding to next middleware...");
      return next();
    });
  }

  uploadFile(req, res, next) {
    console.log("📥 Incoming file upload...");

    const upload = multer({
      storage: this.storage,
      fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        console.log("📂 File received in filter:", file.originalname);
        cb(null, true);
      },
      limits: {
        fileSize: 10000000 * 30, // 300MB
      },
    }).single("file"); // Must match 'file' key in Postman

    this.handleUploadError(req, res, next, upload);
  }
}

module.exports = new UploadHandler(10);
