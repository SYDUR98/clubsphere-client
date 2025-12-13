import React from "react";

const EventFilterBarTwo = ({
  search,
  setSearch,
  club,
  setClub,
  paidStatus,
  setPaidStatus,
  registrationStatus,
  setRegistrationStatus,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="space-y-6 mb-6">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by event title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/4 border-primary/40 focus:border-primary bg-base-100 rounded-xl"
        />

        {/* Club Filter */}
        <input
          type="text"
          placeholder="Filter by club"
          value={club}
          onChange={(e) => setClub(e.target.value)}
          className="input input-bordered w-full md:w-1/4 border-primary/40 focus:border-primary bg-base-100 rounded-xl"
        />

        {/* Paid Status */}
        <select
          value={paidStatus}
          onChange={(e) => setPaidStatus(e.target.value)}
          className="select select-bordered w-full md:w-1/4 border-primary/40 focus:border-primary bg-base-100 rounded-xl"
        >
          <option value="">All</option>
          <option value="paid">Paid</option>
          <option value="free">Free</option>
        </select>

        {/* Registration Status */}
        <select
          value={registrationStatus}
          onChange={(e) => setRegistrationStatus(e.target.value)}
          className="select select-bordered w-full md:w-1/4 border-primary/40 focus:border-primary bg-base-100 rounded-xl"
        >
          <option value="">All</option>
          <option value="registered">Registered</option>
          <option value="unregistered">Not Registered</option>
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered w-full md:w-1/4 border-primary/40 focus:border-primary bg-base-100 rounded-xl"
        >
          <option value="">Sort By</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highestFee">Highest Fee</option>
          <option value="lowestFee">Lowest Fee</option>
        </select>
      </div>
    </div>
  );
};

export default EventFilterBarTwo;
