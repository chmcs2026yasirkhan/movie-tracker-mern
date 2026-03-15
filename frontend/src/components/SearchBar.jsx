const SearchBar = ({ searchTerm, onSearchChange, genreFilter, onGenreChange, statusFilter, onStatusChange, genres }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 w-full">
      {/* Search Input */}
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-3 flex items-center text-base-content/40">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full pl-9 bg-base-100 focus:outline-none focus:border-primary"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Genre Filter */}
      <select
        className="select select-bordered bg-base-100 focus:outline-none focus:border-primary min-w-[150px]"
        value={genreFilter}
        onChange={(e) => onGenreChange(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Watch Status Filter */}
      <select
        className="select select-bordered bg-base-100 focus:outline-none focus:border-primary min-w-[170px]"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="Watched">Watched</option>
        <option value="Watching">Watching</option>
        <option value="Plan to Watch">Plan to Watch</option>
      </select>
    </div>
  );
};

export default SearchBar;