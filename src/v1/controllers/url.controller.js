const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const Url = require('../models/url.model');

const createUrl = async (req, res) => {
    const { original_url, custom_url_path } = req.body;
    let short_url;

    try {
        if (custom_url_path) {
            const existingUrl = await Url.findOne({ short_url: `${process.env.BASE_URL}/${custom_url_path}` });
            if (existingUrl) {
                return res.status(httpStatus.CONFLICT).send({ message: 'Custom URL is already in use' });
            }
            short_url = custom_url_path;
        } else {
            let isUnique = false;
            while (!isUnique) {
                short_url = uuidv4().slice(0, 4);
                const existingUrl = await Url.findOne({ short_url: `${process.env.BASE_URL}/${short_url}` });
                if (!existingUrl) {
                    isUnique = true;
                }
            }
        }

        short_url = `${process.env.BASE_URL}/${short_url}`;

        let url = new Url({ original_url, short_url });
        await url.save();

        res.status(httpStatus.CREATED).send({ original_url, short_url });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
    }
};


const redirectUrl = async (req, res) => {
    let { short_url } = req.params;

    try {
        const url = await Url.findOne({ short_url: `${process.env.BASE_URL}/${short_url}` });
        if (url) {
            return res.redirect(url.original_url);
        } else {
            return res.status(httpStatus.NOT_FOUND).send({ message: 'URL not found' });
        }
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
    }
};

module.exports = {
    createUrl,
    redirectUrl,
};