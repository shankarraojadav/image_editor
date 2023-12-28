import fs from "fs";
import AWS from "aws-sdk";
import mysql from "mysql2/promise";

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const dbConfig = {
  host: "sql12.freemysqlhosting.net",
  user: "sql12673237",
  password: "88TUtpklnP",
  database: "sql12673237",
};

export const ImageUploader = async (req, res) => {
  try {
    const base64Image = req.body.image;
    const fileName = req.body.imageName;
    const imageBuffer = Buffer.from(base64Image, "base64");
    const bucketName = process.env.BUCKET_NAME;

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: imageBuffer,
    };

    const s3UploadPromise = s3.upload(params).promise();
    const s3Response = await s3UploadPromise;

    const connection = await mysql.createConnection(dbConfig);

    console.log("Database connected successfully");

    const insertResult = await connection.execute(
      "INSERT INTO images (filename, s3_key, s3_location) VALUES (?, ?, ?)",
      [fileName, s3Response.Key, s3Response.Location]
    );

    await connection.end();

    res
      .status(200)
      .json({ message: "Image uploaded and information saved successfully" });
  } catch (error) {
    console.error("Error:", error);

    console.error("Database connection failed");
    res.status(500).json({ error: "Internal server error" });
  }
};
