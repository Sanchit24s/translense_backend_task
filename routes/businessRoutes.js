const express = require("express");
const {
    createBusinessInfo,
    getAllBusinesses,
    getBusinessById,
    updateBusiness,
    deleteBusiness,
    uploadRestaurantImage,
    sendOTP,
    verifyOTP,
} = require("../controllers/businessController");
const { uploadImage } = require("../middlewares/fileUpload");
const router = express.Router();

router.post("/", createBusinessInfo);
router.get("/", getAllBusinesses);
router.get("/:id", getBusinessById);
router.patch("/:id", updateBusiness);
router.delete("/:id", deleteBusiness);
router.post("/upload-restuarant-image/:id", uploadImage, uploadRestaurantImage);

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;
