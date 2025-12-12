import React from "react";

const EventFilterBar = ({
  search,
  setSearch,
  club,
  setClub,
  location,
  setLocation,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  paidStatus,
  setPaidStatus,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-3 mb-6">

  <input
    type="text"
    placeholder="Search event title"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="input input-bordered w-full 
    border-primary/40 focus:border-primary bg-base-100 rounded-xl"
  />

  <input
    type="text"
    placeholder="Club Name"
    value={club}
    onChange={(e) => setClub(e.target.value)}
    className="input input-bordered w-full 
    border-primary/40 focus:border-primary bg-base-100 rounded-xl"
  />

  <input
    type="text"
    placeholder="Location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="input input-bordered w-full
    border-primary/40 focus:border-primary bg-base-100 rounded-xl"
  />

  {/* ⭐ Two Dates inline */}
  <input
    type="date"
    value={dateFrom}
    onChange={(e) => setDateFrom(e.target.value)}
    className="input input-bordered w-full 
    border-primary/40 focus:border-primary bg-base-100 rounded-xl"
  />

  <input
    type="date"
    value={dateTo}
    onChange={(e) => setDateTo(e.target.value)}
    className="input input-bordered w-full 
    border-primary/40 focus:border-primary bg-base-100 rounded-xl"
  />

  <select
    value={paidStatus}
    onChange={(e) => setPaidStatus(e.target.value)}
    className="select select-bordered w-full
    border-primary/40 focus:border-primary bg-base-100 rounded-xl"
  >
    <option value="">All</option>
    <option value="paid">Paid</option>
    <option value="free">Free</option>
  </select>

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="select select-bordered w-full
    border-primary/40 focus:border-primary bg-base-100 rounded-xl"
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

export default EventFilterBar;
