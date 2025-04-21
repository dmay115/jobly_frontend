import React, { useEffect, useState } from "react";
import { JoblyApi } from "./App";
import JobCard from "./JobCard";

function Jobs({ currentUser }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    search();
  }, []);

  async function search() {
    setLoading(true);
    try {
      const data = await JoblyApi.getJobs();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  function hasAppliedToJob(id) {
    return currentUser?.applications?.includes(id);
  }

  async function applyToJob(id) {
    try {
      await JoblyApi.applyToJob(id);
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className="JobsList container mt-4">
      {loading ? (
        <p>Loading jobs...</p>
      ) : !jobs.length ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            hasApplied={hasAppliedToJob(job.id)}
            applyToJob={applyToJob}
          />
        ))
      )}
    </div>
  );
}

export default Jobs;
