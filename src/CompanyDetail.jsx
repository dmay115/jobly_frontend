import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { JoblyApi } from "./App";

function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const data = await JoblyApi.getCompany(id);
        setCompany(data);
      } catch (err) {
        console.error("Error loading company:", err);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    }
    fetchCompany();
  }, [id]);

  function handleBack() {
    navigate("/companies");
  }

  if (loading) return <p>Loading company info...</p>;
  if (!company) return <p>Company not found.</p>;

  return (
    <div className="CompanyDetail container mt-4">
      <Button color="secondary" onClick={handleBack} className="mb-3">
        ← Back to Companies
      </Button>

      <Card>
        <CardBody>
          <CardTitle tag="h2">{company.name}</CardTitle>
          <CardText><strong>Description:</strong> {company.description}</CardText>
          <CardText><strong>Number of Employees:</strong> {company.numEmployees}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default CompanyDetail;
