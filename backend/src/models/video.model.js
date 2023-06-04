const mongoose = require('mongoose');

// const votesSchema = mongoose.Schema(
//     {
//         upVotes: {
//             type: Number,
//             default: 0,
//         },
//         downVotes: {
//             type: Number,
//             default: 0,
//         },
//     }
// );

const videoSchema = mongoose.Schema(
    {


        videoLink: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        genre: {
            type: String,
            required: true,
            trim: true,
        },
        contentRating: {
            type: String,
            required: true,
            trim: true,
        },
        releaseDate: {
            type: String,
            required: true,
            trim: true,
        },
        previewImage: {
            type: String,
            required: true,
            trim: true,
        },
        votes: {
            upVotes: {
                type: Number,
                default: 0,
            },
            downVotes: {
                type: Number,
                default: 0,
            }
        },

        viewCount: {
            type: Number,
            default: 0,
        },
    }
);

const Videos = mongoose.model("Videos", videoSchema);

module.exports = {
    Videos
};
//  enum : ["Anyone", "7+", "12+", "16+", "18+"],