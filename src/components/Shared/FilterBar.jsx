import React from "react";

const FilterBar = ({ search, setSearch, category, setCategory, location, setLocation, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        type="text"
        placeholder="Search club name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full md:w-64"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input input-bordered w-full md:w-48"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="input input-bordered w-full md:w-48"
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="select select-bordered w-full md:w-48"
      >
        <option value="">Sort By</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="highestFee">Highest Fee</option>
        <option value="lowestFee">Lowest Fee</option>
      </select>
    </div>
  );
};

export default FilterBar;
