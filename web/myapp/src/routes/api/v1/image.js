'use strict';

const express = require('express')
const router = express.Router({mergeParams: true})
const models = require('../../../models')
const debug = require('debug')('myapp:api:image');
const auth = require('../../../middleware/auth')
const fs = require('fs')
const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: './uploads/', limits:{ fileSize: 1024 * 1024 * 16}})
const faker = require('faker')
const ACCEPT_TYPE = ['image/png', 'image/jpg', 'image/jpeg']

/**
 * Upload an image.
 * 
 * @return json -> file name or error.
 */
router.post('/upload', auth.check(), upload.single('image'), (req, res) => {
    if (req.file === undefined) { return res.status(400).json({error: 'No file input.'}) }
    let file = req.file
    if (ACCEPT_TYPE.indexOf(file.mimetype) === -1) {
        return res.status(403).json({error: 'This file is not a image. Accept only .png, .jpg, .jpeg'})
    }

    const pathName = path.join('public', (req.user.id).toString())
    if (!fs.existsSync(pathName)){
        fs.mkdirSync(pathName);
    }
    const fileNameSplit = file.originalname.split('.')
    const extension = fileNameSplit[fileNameSplit.length - 1]

    const fakeFilename = faker.random.uuid()
    const fileName = path.join(pathName, fakeFilename + '.' + extension)

    fs.rename(file.path, fileName, (err) => {
        if (err) {
            debug(err)
            return res.status(500).json({error: 'System error.'})
        }
        return res.json({fileName: `${req.user.id}/${fakeFilename}.${extension}`})  
    })
})

module.exports = router