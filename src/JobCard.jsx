import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { JoblyApi } from "./App";


function JobCard({ job, hasApplied, applyToJob }) {
  const [applied, setApplied] = useState(hasApplied);

  async function handleApply() {
    if (applied) return;
    console.log("Current token:", JoblyApi.token); // Debug!
    try {
      await applyToJob(job.id);
      setApplied(true);
    } catch (err) {
      console.error("Error applying to job:", err);
    }
  }
  
  

  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5">{job.title}</CardTitle>
        <CardText><strong>Salary:</strong> ${job.salary}</CardText>
        {job.equity && (
          <CardText><strong>Equity:</strong> {job.equity}</CardText>
        )}
        <Button
          onClick={handleApply}
          color={applied ? "secondary" : "primary"}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </Button>
      </CardBody>
    </Card>
  );
}

export default JobCard;
