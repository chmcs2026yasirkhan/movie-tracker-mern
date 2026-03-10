import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    director: {
      type: String,
      required: [true, "Director is required"],
      trim: true,
    },
    releaseYear: {
      type: Number,
      required: [true, "Release year is required"],
      min: [1888, "Release year must be after 1888"],
    },
    rating: {
      type: Number,
      min: [0, "Rating must be at least 0"],
      max: [10, "Rating cannot exceed 10"],
      default: null,
    },
    watchStatus: {
      type: String,
      enum: ["Watched", "Watching", "Plan to Watch"],
      default: "Plan to Watch",
    },
    platform: { type: String, trim: true, default: "" },
    thumbnailURL: { type: String, trim: true, default: "" },
    review: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;