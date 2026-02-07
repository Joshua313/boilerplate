import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    files: [{
        url: String,
        publicID: String,
        format: String,
    }],
});


const Post = mongoose.model("post", Schema);

export default Post;