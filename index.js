const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { randomInt } = require('crypto');

const s3Client = new S3Client({
  region: 'us-east-1',
});

const folderNames = ['em-preparacao', 'pronto'];
const users = ['rafael', 'pedro', 'teresa', 'natalia', 'eduardo'];
const bucketName = 'orders-pizzaria';

async function uploadRandomFileToS3() {
  const fileNumber = randomInt(1, 1000);
  const userIndex = randomInt(0, users.length - 1);
  const file = `${fileNumber}-${users[userIndex]}`;

  for (const folder of folderNames) {
    const fileName = `${folder}/${file}`;
    const fileContent = `This is a test content for ${fileName}`;

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileContent,
    };

    try {
      await s3Client.send(new PutObjectCommand(params));
      console.info(
        `bucket > uploadRandomFileToS3 > File ${fileName} uploaded successfully to ${bucketName} > success`
      );
    } catch (error) {
      console.error(
        `bucket > uploadRandomFileToS3 > error uploading ${fileName}`,
        { error }
      );
    }
  }
}

for (let i = 0; i < 10; i++) {
  uploadRandomFileToS3();
}
