const express = require('express');
const router = express.Router();
const File = require('../models/file');
const fs = require('fs');
const path = require('path');

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.status(404).send({ error: "File not found" });
        }

        const filePath = `${__dirname}/../${file.path}`;
        const fileName = filePath.split("/").pop(); // Assuming file paths are using forward slashes

        // Check file permissions
        fs.access(filePath, fs.constants.R_OK, (err) => {
            if (err) {
                console.error('File access error:', err);
                return res.status(403).send('Forbidden');
            }

            // Set content type based on the file type (you may need to adjust this based on your file types)
            const contentType = 'text/plain'; // Assuming the file is a text file

            // Set headers to indicate file download
            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-type', contentType);

            // Create a read stream to the file
            const fileStream = fs.createReadStream(filePath);

            // Pipe the file stream to the response
            fileStream.pipe(res);
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/normal/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.status(404).send({ error: "File not found" });
        }

        const filePath = `${file.path2}`;
        const fileName = filePath.split("/").pop(); // Assuming file paths are using forward slashes
        console.log("hj",fileName);
        // Check file permissions
        fs.access(filePath, fs.constants.R_OK, (err) => {
            if (err) {
                console.error('File access error:', err);
                return res.status(403).send('Forbidden');
            }

            // Set content type based on the file type (you may need to adjust this based on your file types)
            const contentType = 'text/plain'; // Assuming the file is a text file

            // Set headers to indicate file download
            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-type', contentType);

            // Create a read stream to the file
            const fileStream = fs.createReadStream(filePath);

            // Pipe the file stream to the response
            fileStream.pipe(res);
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
