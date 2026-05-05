import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import "dotenv/config";

const s3Config = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadAvatar = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: "amazn-test-bucket-1990",
    key: function (req, file, cb) {
      const extension = file.originalname.split(".").pop();
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `avatars/avatar-${uniqueSuffix}.${extension}`);
    },
  }),
});
