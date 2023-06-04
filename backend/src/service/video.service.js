const { Videos } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { http } = require("winston");

// const getVideoById = async (id) => {
//     try {
//         const Video_ = await Video.findById(id);
//         return Video_;
//     } catch (error) {
//         throw new ApiError(httpStatus.BAD_REQUEST, '""videoId"" must be a valid mongo id');
//     }
// };



// const getVideoByTitle = async (title) => {
//     try {
//         const videos = await Video.find({ title: title });
//         return videos;
//     } catch (error) {
//         throw new ApiError(httpStatus.NOT_FOUND, "Video not found with the title");
//     }
// };

// const getVideoByGenre = async (genre) => {
//     try {
//         let bool = genre.incudes("All");
//         if (bool) {
//             const videos = await Video.find();
//             return videos;
//         } else {
//             if (genre.length > 1) {
//                 let videos = [];
//                 for (let i = 0; i < genre.length; i++){
//                     var video_ = await Video.find({ genre: genre[i] });
//                     videos.push(video_);
//                 }
//                 return videos;
//             } else if(genre.length == 1)   {
//                 const videos = await Video.find({ genre: genre[0] });
//                 return videos;
//             }
//         }
//     } catch (error) {
//         throw new ApiError(httpStatus.NOT_FOUND, "Video not found with this genre");
//     }
// };

// const getVideoBycontentRating = async (contentRating) => {
//     try {
        
//     } catch (error) {
//         throw new ApiError(httpStatus.NOT_FOUND, "Video not found with this content-rating");
//     }
// }; 

// const getVideoMultiFilter = async (title, genre, contentRating) => {
//     try {
        
//     } catch (error) {
//         throw new ApiError(httpStatus.NOT_FOUND, "Video not found by this title, genre and content-rating");
//     }
// };

// const getvideosortBy = async (sortBy) => {
//     try {
        
//     } catch (error) {
//         throw new ApiError(httpStatus.NOT_FOUND, "Video not found");
//     }
// };
const getVideoById = async (id) => {
    return Videos.findById(id);
};



const filteredVideos = async (q, sortingBy) => {
    //console.log(sortingBy, q);
    let videos = Videos.find(q).sort({ [sortingBy]: 1 })
    return videos
}



const getVideos = async (sortingBy) => {
    return Videos.find({}).sort({ [sortingBy]: -1 });
};

const updateVotes = async (id, votes) => {
    let video = await getVideoById(id);

    let count = 0
    //console.log(video.id);
    if (votes === 'upVote') {
        // await Videos.updateOne({ "_id": video.id }, { $inc: { "votes.upVotes": 1 } });
        // let idvideo = Videos.findOne({ _id: video.id })
        // console.log(idvideo, video.id);
        // return idvideo;
        count = parseInt(video.votes.upVotes) + 1;
        video.votes.upVotes = count;

    }
    else if (votes === 'downVote') {
        // await Videos.updateOne({ "_id": video.id }, { $inc: { "votes.downVotes": 1 } })
        // let idVideo = Videos.findOne({ _id: video.id })
        // console.log(video.id);
        // return idVideo;
        count = parseInt(video.votes.downVotes) + 1;
        video.votes.downVotes = count;
    };
    await video.save();
};

const updateViews = async (id) => {
    let video = await getVideoById(id);
    let count = parseInt(video.viewCount) + 1;
    video.viewCount = count;
    await video.save();
};

const postingVideo = async (body) => {
    let video = await Videos.create(body);
    return video;
};

// const getVideoAll = async () => {
//     const videos = await Video.find();
//     return videos ;
// };

module.exports = {
    getVideoById,
    getVideos,
    filteredVideos,
    updateVotes,
    updateViews,
    postingVideo
};