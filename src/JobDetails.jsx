import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { JoblyApi } from "./App";

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const data = await JoblyApi.getJob(id);
        setJob(data);
      } catch (err) {
        console.error("Error loading job:", err);
        setJob(null);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  function handleBack() {
    navigate("/jobs");
  }

  if (loading) return <p>Loading job info...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="JobDetail container mt-4">
      <Button color="secondary" onClick={handleBack} className="mb-3">
        ← Back to Jobs
      </Button>

      <Card>
        <CardBody>
          <CardTitle tag="h2">{job.title}</CardTitle>
          <CardText><strong>Company:</strong> {job.company.handle}</CardText>
          <CardText><strong>Salary:</strong> ${job.salary}</CardText>
          {job.equity && (
            <CardText><strong>Equity:</strong> {job.equity}</CardText>
            )}
            <Button onClick={async () => {await JoblyApi.applyToJob(job.id);alert("Applied!");}} color="primary">Apply
            </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default JobDetail;
