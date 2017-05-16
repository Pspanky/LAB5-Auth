import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  content: String,
  cover_url: String,
  tags: String,
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  toJSON: {
    virtuals: true,
  },
});

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
