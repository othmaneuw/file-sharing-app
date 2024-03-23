const router = require("express").Router();
const multer = require("multer");
const File = require("../models/file");
const crypto = require("crypto");
const fs = require("fs");
const path = require('path');


// Encryption parameters
const encryptionOptions = {
  keyLength: 2048,
  padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  oaepHash: 'sha256', // Hash function for OAEP padding
  oaepLabel: Buffer.from('') // Optional label for OAEP padding
};

// Decryption parameters
const decryptionOptions = {
  padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  oaepHash: 'sha256', // Hash function for OAEP padding
  oaepLabel: Buffer.from('') // Optional label for OAEP padding
};

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});





const upload = multer({ dest: "uploads/" }); // Destination folder for uploaded files

router.post("/", upload.single("file"), (req, res) => {
  console.log("heellooooo", req.file);
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.status(400).send("No file uploaded.");
  }
  // Read the file content
  const fileContent = fs.readFileSync(uploadedFile.path);
  // Encrypt the file content with RSA
  const encryptedData = crypto.publicEncrypt({
    key: publicKey,
    padding: encryptionOptions.padding,
    oaepHash: encryptionOptions.oaepHash,
    oaepLabel: encryptionOptions.oaepLabel
  },Buffer.from(fileContent),'utf8')

  // Store the encrypted file content to disk
  fs.writeFile(`uploads/${req.body.uuid}.encrypted`, encryptedData, async (err) => {
    if (err) {
      console.error('Error saving encrypted file:', err);
      return res.status(500).send('Error saving encrypted file.');
    }
    // DELETE FILE
    fs.unlink(`${req.file.path}`,(err)=>{
      if(err){
        return res.status(400).send("Cannot remove file");
      }

      console.log("file deleted successfully");

    })



    const file = new File({
        filename: req.file.filename,
         uuid: req.body.uuid,
         //path: req.file.path,
         path : `uploads/${req.body.uuid}.encrypted`,
         size: req.file.size,
         path2 : ""
    })
    const response = await file.save();
    // Return a response indicating success
    res.send('File uploaded and encrypted successfully.');
  });


});


router.get("/decrypt/:uuid", async (req, res) => {
//   const originalMessage = 'This is a test message to check if the keys match.';
//   const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(originalMessage, 'utf8'));
//   console.log("enc",encryptedData);
//   const decryptedData = crypto.privateDecrypt(privateKey, encryptedData);
//  console.log("dec",decryptedData.toString());

  try {
    // Find the file in the database by uuid
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
      return res.status(404).send("File not found.");
    }

    // Construct the file path for the encrypted file
    const encryptedFilePath = path.join(__dirname, "..", "uploads", `${file.uuid}.encrypted`);
    console.log(encryptedFilePath);

    // Read the encrypted file content
    const encryptedData = fs.readFileSync(encryptedFilePath);

    // Decrypt the file content with RSA private key
    const decryptedData = crypto.privateDecrypt({
      key: privateKey,
      padding: decryptionOptions.padding,
      oaepHash: decryptionOptions.oaepHash,
      oaepLabel: decryptionOptions.oaepLabel
    },encryptedData);

    const decryptedFile = decryptedData.toString('utf8');

    // Write the decrypted data to a new file in the uploads folder
    const decryptedFilePath = path.join(__dirname, "..", "uploads", `${file.uuid}.decrypted`);
    fs.writeFileSync(decryptedFilePath, decryptedFile);

    const fileUpdated = await File.updateOne({uuid : req.params.uuid},{$set : {path2 : decryptedFilePath}})

    // Send a response with the path to the decrypted file
    res.send(`Decrypted file saved at: ${decryptedFilePath}`);
  } catch (err) {
    console.error('Error decrypting file:', err);
    res.status(500).send('Error decrypting file.');
  }
});




module.exports = router;
