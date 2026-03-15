import { useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { getAllMovies, createMovie, updateMovie, deleteMovie } from "./services/movieService";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch movies on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await getAllMovies();
      setMovies(res.data);
    } catch (err) {
      toast.error("Failed to fetch movies. Is the backend running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get unique genres for filter dropdown
  const genres = useMemo(() => {
    return [...new Set(movies.map((m) => m.genre))].sort();
  }, [movies]);

  // Filtered movies
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = genreFilter ? movie.genre === genreFilter : true;
      const matchesStatus = statusFilter ? movie.watchStatus === statusFilter : true;
      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [movies, searchTerm, genreFilter, statusFilter]);

  // Handle Add/Update submission
  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editMovie) {
        const res = await updateMovie(editMovie._id, formData);
        setMovies((prev) => prev.map((m) => (m._id === editMovie._id ? res.data : m)));
        toast.success("Movie updated successfully! 🎬");
        setEditMovie(null);
        setShowForm(false);
      } else {
        const res = await createMovie(formData);
        setMovies((prev) => [res.data, ...prev]);
        toast.success("Movie added successfully! 🍿");
        setShowForm(false);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    setDeletingId(id);
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((m) => m._id !== id));
      toast.success("Movie deleted successfully");
      if (editMovie?._id === id) {
        setEditMovie(null);
        setShowForm(false);
      }
    } catch (err) {
      toast.error("Failed to delete movie");
    } finally {
      setDeletingId(null);
    }
  };

  // Handle Edit click
  const handleEdit = (movie) => {
    setEditMovie(movie);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditMovie(null);
    setShowForm(false);
  };

  // Stats
  const stats = useMemo(() => ({
    total: movies.length,
    watched: movies.filter((m) => m.watchStatus === "Watched").length,
    watching: movies.filter((m) => m.watchStatus === "Watching").length,
    planToWatch: movies.filter((m) => m.watchStatus === "Plan to Watch").length,
  }), [movies]);

  return (
    <div className="min-h-screen bg-base-100">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: "hsl(var(--b2))", color: "hsl(var(--bc))", border: "1px solid hsl(var(--b3))" },
        }}
      />

      {/* Header */}
      <header className="bg-base-200 border-b border-base-300 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎬</div>
            <div>
              <h1 className="text-xl font-bold text-primary">MovieTracker</h1>
              <p className="text-xs text-base-content/50">MERN Stack Application</p>
            </div>
          </div>
          <button
            className={`btn btn-primary btn-sm gap-2 ${showForm && !editMovie ? "btn-outline" : ""}`}
            onClick={() => {
              if (showForm && !editMovie) {
                setShowForm(false);
              } else {
                setEditMovie(null);
                setShowForm(true);
              }
            }}
          >
            {showForm && !editMovie ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Movie
              </>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Row */}
        <div className="stats shadow w-full bg-base-200 border border-base-300">
          <div className="stat place-items-center py-3">
            <div className="stat-title text-xs">Total Movies</div>
            <div className="stat-value text-2xl text-primary">{stats.total}</div>
          </div>
          <div className="stat place-items-center py-3">
            <div className="stat-title text-xs">Watched</div>
            <div className="stat-value text-2xl text-success">{stats.watched}</div>
          </div>
          <div className="stat place-items-center py-3">
            <div className="stat-title text-xs">Watching</div>
            <div className="stat-value text-2xl text-warning">{stats.watching}</div>
          </div>
          <div className="stat place-items-center py-3">
            <div className="stat-title text-xs">Plan to Watch</div>
            <div className="stat-value text-2xl text-info">{stats.planToWatch}</div>
          </div>
        </div>

        {/* Form (conditional) */}
        {showForm && (
          <MovieForm
            onSubmit={handleFormSubmit}
            editMovie={editMovie}
            onCancelEdit={handleCancelEdit}
            isLoading={formLoading}
          />
        )}

        {/* Search & Filters */}
        <div className="flex flex-col gap-3">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            genreFilter={genreFilter}
            onGenreChange={setGenreFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            genres={genres}
          />
          {(searchTerm || genreFilter || statusFilter) && (
            <div className="flex items-center gap-2 text-sm text-base-content/60">
              <span>
                Showing <strong className="text-base-content">{filteredMovies.length}</strong> of {movies.length} movies
              </span>
              <button
                className="btn btn-ghost btn-xs"
                onClick={() => { setSearchTerm(""); setGenreFilter(""); setStatusFilter(""); }}
              >
                Clear filters ✕
              </button>
            </div>
          )}
        </div>

        {/* Movie List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-base-content/50">Loading movies...</p>
          </div>
        ) : (
          <MovieList
            movies={filteredMovies}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={deletingId}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-200 border-t border-base-300 text-base-content/50 text-sm mt-8">
        <p>Movie Tracker — Built with MongoDB, Express, React & Node.js</p>
      </footer>
    </div>
  );
}

export default App;