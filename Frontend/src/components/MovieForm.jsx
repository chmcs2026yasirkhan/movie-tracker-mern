import { useState, useEffect } from "react";

const INITIAL_FORM = {
  title: "",
  genre: "",
  director: "",
  releaseYear: "",
  rating: "",
  watchStatus: "Plan to Watch",
  platform: "",
  thumbnailURL: "",
  review: "",
};

const GENRES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
  "Drama", "Fantasy", "Horror", "Musical", "Mystery", "Romance",
  "Sci-Fi", "Thriller", "Western", "Other",
];

const MovieForm = ({ onSubmit, editMovie, onCancelEdit, isLoading }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editMovie) {
      setForm({
        title: editMovie.title || "",
        genre: editMovie.genre || "",
        director: editMovie.director || "",
        releaseYear: editMovie.releaseYear || "",
        rating: editMovie.rating ?? "",
        watchStatus: editMovie.watchStatus || "Plan to Watch",
        platform: editMovie.platform || "",
        thumbnailURL: editMovie.thumbnailURL || "",
        review: editMovie.review || "",
      });
    } else {
      setForm(INITIAL_FORM);
    }
    setErrors({});
  }, [editMovie]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.genre.trim()) newErrors.genre = "Genre is required";
    if (!form.director.trim()) newErrors.director = "Director is required";
    if (!form.releaseYear) {
      newErrors.releaseYear = "Release year is required";
    } else if (form.releaseYear < 1888 || form.releaseYear > new Date().getFullYear() + 5) {
      newErrors.releaseYear = "Enter a valid release year";
    }
    if (form.rating !== "" && (form.rating < 0 || form.rating > 10)) {
      newErrors.rating = "Rating must be between 0 and 10";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const payload = {
      ...form,
      releaseYear: Number(form.releaseYear),
      rating: form.rating !== "" ? Number(form.rating) : null,
    };
    onSubmit(payload);
    if (!editMovie) setForm(INITIAL_FORM);
  };

  return (
    <div className="card bg-base-200 shadow-xl border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-xl font-bold mb-2">
          {editMovie ? (
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Movie
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Movie
            </span>
          )}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Title <span className="text-error">*</span></span></label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Inception"
                className={`input input-bordered ${errors.title ? "input-error" : ""}`}
                value={form.title}
                onChange={handleChange}
              />
              {errors.title && <span className="label-text-alt text-error mt-1">{errors.title}</span>}
            </div>

            {/* Genre */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Genre <span className="text-error">*</span></span></label>
              <select
                name="genre"
                className={`select select-bordered ${errors.genre ? "select-error" : ""}`}
                value={form.genre}
                onChange={handleChange}
              >
                <option value="">Select genre</option>
                {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              {errors.genre && <span className="label-text-alt text-error mt-1">{errors.genre}</span>}
            </div>

            {/* Director */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Director <span className="text-error">*</span></span></label>
              <input
                type="text"
                name="director"
                placeholder="e.g. Christopher Nolan"
                className={`input input-bordered ${errors.director ? "input-error" : ""}`}
                value={form.director}
                onChange={handleChange}
              />
              {errors.director && <span className="label-text-alt text-error mt-1">{errors.director}</span>}
            </div>

            {/* Release Year */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Release Year <span className="text-error">*</span></span></label>
              <input
                type="number"
                name="releaseYear"
                placeholder="e.g. 2010"
                className={`input input-bordered ${errors.releaseYear ? "input-error" : ""}`}
                value={form.releaseYear}
                onChange={handleChange}
              />
              {errors.releaseYear && <span className="label-text-alt text-error mt-1">{errors.releaseYear}</span>}
            </div>

            {/* Rating */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Rating (0–10)</span></label>
              <input
                type="number"
                name="rating"
                placeholder="e.g. 8.8"
                step="0.1"
                min="0"
                max="10"
                className={`input input-bordered ${errors.rating ? "input-error" : ""}`}
                value={form.rating}
                onChange={handleChange}
              />
              {errors.rating && <span className="label-text-alt text-error mt-1">{errors.rating}</span>}
            </div>

            {/* Watch Status */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Watch Status</span></label>
              <select
                name="watchStatus"
                className="select select-bordered"
                value={form.watchStatus}
                onChange={handleChange}
              >
                <option value="Plan to Watch">Plan to Watch</option>
                <option value="Watching">Watching</option>
                <option value="Watched">Watched</option>
              </select>
            </div>

            {/* Platform */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Platform</span></label>
              <input
                type="text"
                name="platform"
                placeholder="e.g. Netflix, Prime Video"
                className="input input-bordered"
                value={form.platform}
                onChange={handleChange}
              />
            </div>

            {/* Thumbnail URL */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Thumbnail URL</span></label>
              <input
                type="url"
                name="thumbnailURL"
                placeholder="https://..."
                className="input input-bordered"
                value={form.thumbnailURL}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Review */}
          <div className="form-control mt-4">
            <label className="label"><span className="label-text font-medium">Review / Notes</span></label>
            <textarea
              name="review"
              placeholder="Write your thoughts about the movie..."
              className="textarea textarea-bordered h-20 resize-none"
              value={form.review}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="card-actions justify-end mt-5 gap-2">
            {editMovie && (
              <button type="button" className="btn btn-ghost" onClick={onCancelEdit}>
                Cancel
              </button>
            )}
            <button
              type="submit"
              className={`btn ${editMovie ? "btn-warning" : "btn-primary"} min-w-[120px]`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : editMovie ? "Update Movie" : "Add Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;