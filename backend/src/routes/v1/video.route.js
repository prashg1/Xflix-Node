const express = require("express");
const videoController = require("../../controllers/video.controller");


const router = express.Router();


 router.get('/:videoId', videoController.getVideoById);
router.get('/', videoController.filteredVideos);

router.patch('/:videoId/votes', videoController.updateVotes);
router.patch('/:videoId/views', videoController.updateViews);

router.post('/', videoController.postingVideo);

module.exports = router;