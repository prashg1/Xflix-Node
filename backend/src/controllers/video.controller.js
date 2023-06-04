const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../service");

const filteredVideos = catchAsync(async (req, res) => {

    let sf = ["releaseDate", "viewCount"];
    let sortingBy;
    if (req.query.sortingBy) {
        sortingBy = req.query.sortingBy;
    } else {
        sortingBy = sf[0];
    };

    let quers = req.query;

    if (!quers.genres && !quers.contentRating && !quers.title) {
        let videos = await videoService.getVideos(sortingBy);
        if (!videos) {
            throw new ApiError(httpStatus.NOT_FOUND)
        };
        res.send({videos:videos});
    }

    else {
        let filter = {};
        if (quers.title != null) {
            let temp = new RegExp("^" + quers.title, "i")
            console.log(temp);
            filter.title = temp;
        };
        if (quers.genres != null) {
            var arr = quers.genres.split(',');
            filter.genre = arr;
        };
        if (quers.contentRating != null) {
            var cr = ["Anyone", "7+", "12+", "16+", "18+"];
            let temp = [];
            for (let i = 4; i >=cr.indexOf(quers.contentRating); i--) {
                temp.push(cr[i]);
            };
            filter.contentRating = temp;
        };
        let videos = await videoService.filteredVideos(filter, sortingBy);
        res.send({videos: videos})
    }
})


const getVideoById = catchAsync(async (req, res) => {
    console.log(req.params.videoId);
    const video = await videoService.getVideoById(req.params.videoId);
    if (!video) {
        throw new ApiError(httpStatus.NOT_FOUND);
    };
    res.send(video);
});

const updateVotes = catchAsync(async (req, res) => {
    try {
        let id = req.params.videoId;
        let vote = req.body.vote;
        await videoService.updateVotes(id, vote);
        res.status(204).send();
    } catch (err) {
        console.log(err);
    }
});

const updateViews = catchAsync(async (req, res) => {
    try {
        let id = req.params.videoId;
        await videoService.updateViews(id);
        res.status(204).send();
    } catch (err) {
        console.log(err);
    }
});

const postingVideo = catchAsync(async (req, res) => {
    try {
        let video = await videoService.postingVideo(req.body);
        res.status(201).send(video)
    } catch (err) {
        console.log(err);
    }
})

module.exports = {
    getVideoById,
    filteredVideos,
    updateVotes,
    updateViews,
    postingVideo
}