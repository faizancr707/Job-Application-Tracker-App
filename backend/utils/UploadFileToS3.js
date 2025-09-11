const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

async function uploadFileToS3(buffer, originalname, mimetype) {
  const bucketName = process.env.AWS_BUCKET_NAME;
  if (!bucketName) throw new Error("AWS_BUCKET_NAME is not defined in .env");

  const uniqueFilename = `${uuidv4()}-${originalname}`;

  const params = {
    Bucket: bucketName,
    Key: uniqueFilename,
    Body: buffer,
    ContentType: mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(params));
    const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFilename}`;
    return fileUrl;
  } catch (error) {
    console.error("S3 upload error:", error.message || error);
    throw error;
  }
}

module.exports = uploadFileToS3;
