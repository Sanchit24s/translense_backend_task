const express = require("express");
const {
    createOwner,
    getAllOwner,
    getOwnerById,
    updateOwner,
    deleteOwner,
    uploadProfilePicImage,
    sendOTP,
    verifyOTP
} = require("../controllers/ownerController");
const { uploadImage } = require("../middlewares/fileUpload");
const router = express.Router();

router.post("/", createOwner);
router.get("/", getAllOwner);
router.get("/:id", getOwnerById);
router.patch("/:id", updateOwner);
router.delete("/:id", deleteOwner);
router.post("/upload-profile-pic/:id", uploadImage, uploadProfilePicImage);

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;
