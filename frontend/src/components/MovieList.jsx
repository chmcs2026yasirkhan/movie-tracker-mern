const STATUS_BADGE = {
  "Watched": "badge-success",
  "Watching": "badge-warning",
  "Plan to Watch": "badge-info",
};

const STATUS_ICON = {
  "Watched": "✅",
  "Watching": "▶️",
  "Plan to Watch": "🕐",
};

const FALLBACK_IMG = "https://placehold.co/300x420/1a1a2e/e94560?text=No+Poster&font=roboto";

const StarRating = ({ rating }) => {
  if (rating === null || rating === undefined) return <span className="text-base-content/40 text-sm">No rating</span>;
  const stars = Math.round(rating / 2);
  return (
    <div className="flex items-center gap-1">
      <div className="rating rating-sm">
        {[1, 2, 3, 4, 5].map((i) => (
          <input
            key={i}
            type="radio"
            className={`mask mask-star-2 ${i <= stars ? "bg-warning" : "bg-base-300"}`}
            disabled
            readOnly
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-base-content/70">{Number(rating).toFixed(1)}</span>
    </div>
  );
};

const MovieList = ({ movies, onEdit, onDelete, isDeleting }) => {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-base-content/50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
        <p className="text-lg font-medium">No movies found</p>
        <p className="text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {movies.map((movie) => (
        <div
          key={movie._id}
          className="card bg-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-base-300 overflow-hidden group"
        >
          {/* Poster */}
          <figure className="relative h-56 overflow-hidden bg-base-300">
            <img
              src={movie.thumbnailURL || FALLBACK_IMG}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.src = FALLBACK_IMG; }}
            />
            {/* Platform badge overlay */}
            {movie.platform && (
              <div className="absolute top-2 right-2">
                <span className="badge badge-neutral badge-sm opacity-90 font-medium">{movie.platform}</span>
              </div>
            )}
            {/* Watch status overlay */}
            <div className="absolute bottom-2 left-2">
              <span className={`badge ${STATUS_BADGE[movie.watchStatus] || "badge-ghost"} badge-sm gap-1`}>
                {STATUS_ICON[movie.watchStatus]} {movie.watchStatus}
              </span>
            </div>
          </figure>

          <div className="card-body p-4 gap-2">
            {/* Title & Year */}
            <div>
              <h2 className="card-title text-base font-bold leading-tight line-clamp-2" title={movie.title}>
                {movie.title}
              </h2>
              <p className="text-base-content/60 text-sm">{movie.releaseYear}</p>
            </div>

            {/* Genre & Director */}
            <div className="flex flex-wrap gap-1">
              <span className="badge badge-primary badge-outline badge-sm">{movie.genre}</span>
            </div>
            <p className="text-sm text-base-content/70 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="truncate">{movie.director}</span>
            </p>

            {/* Rating */}
            <StarRating rating={movie.rating} />

            {/* Review snippet */}
            {movie.review && (
              <p className="text-xs text-base-content/60 line-clamp-2 italic border-l-2 border-primary/30 pl-2">
                "{movie.review}"
              </p>
            )}

            {/* Actions */}
            <div className="card-actions justify-end mt-2 gap-2">
              <button
                className="btn btn-sm btn-warning btn-outline gap-1"
                onClick={() => onEdit(movie)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                className="btn btn-sm btn-error btn-outline gap-1"
                onClick={() => onDelete(movie._id)}
                disabled={isDeleting === movie._id}
              >
                {isDeleting === movie._id ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;