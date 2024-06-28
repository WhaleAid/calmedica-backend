const axios = require('axios');
const { Image } = require('../models');
const { Generation } = require('../models');
const { extractUUID } = require('../utils/uuid.utils');

//! This is the call that the midjourney will make
exports.midjourneyWebhook = async (req, res, next) => {
    console.log('Midjourney webhook called')
    const { status, result, progress, hash, status_reason, created_at } = req.body;
    console.log("🚀 ~ exports.midjourneyWebhook= ~ req.body:", req.body)

    const images = await Image.find({ hash: hash })
    if (!images) {
        return res.status(404).json("Images not found");
    }

    images.map(async (image, index) => {
        switch (status) {
            case "sent":
                image.status = "sent"
                console.log("🚀 ~ exports.midjourneyWebhook= ~ status:", status)
                break;
            case "waiting":
                image.status = "waiting"
                console.log("🚀 ~ exports.midjourneyWebhook= ~ status:", status)
                break;
            case "progress":
                image.status = "progress"
                console.log("🚀 ~ exports.midjourneyWebhook= ~ status:", status)
                break;
            case "done":
                image.status = "done"
                const imageUuid = extractUUID(result.url)
                image.image = `${process.env.MIDJOURNEY_CDN_URL}/${imageUuid}/0_${index}.png`
                console.log("🚀 ~ exports.midjourneyWebhook= ~ status:", status)
                break;
            case "error":
                image.status = "error"
                console.log("🚀 ~ exports.midjourneyWebhook= ~ status:", status)
                break;
            default:
                console.log("🚀 ~ exports.midjourneyWebhook= ~ status:", status)
                break;
        }
        image.progress = progress
        image.status_reason = status_reason
        image.createdAt = created_at
        await image.save()
    })
}

exports.triggerWebhook = async (req, res, next) => {
    const response = await axios.post('https://webhook-test.com/534bd77e6cb949f5b12fde887bf23289', req.body);
    console.log("🚀 ~ exports.triggerWebhook= ~ response:", response)
    res.status(200).json();
}