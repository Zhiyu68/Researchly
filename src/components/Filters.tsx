"use client";
import { Button } from "antd";
import React from "react";

function Filters({
  filters,
  setFilters,
  getData,
}: {
  filters: any;
  setFilters: any;
  getData: any;
}) {
  return (
    <div className="flex gap-3 my-3 items-end">
      <div>
        <span> Search Projects </span>
        <input
          type="text"
          value={filters.searchText}
          onChange={(e) =>
            setFilters({ ...filters, searchText: e.target.value })
          }
          placeholder="Search Projects"
        />
      </div>

      <div>
        <span> Location</span>
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">Select Location</option>
          <option value="virtual">Virtual</option>
          <option value="inPerson">In person</option>
          <option value="lab">Lab</option>
        </select>
      </div>

      <Button type="primary" onClick={getData}>
        Filter
      </Button>
    </div>
  );
}

export default Filters;
