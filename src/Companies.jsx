import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Form, Input, Button, FormGroup, Label } from "reactstrap";
import { JoblyApi } from "./App";
import { Link } from "react-router-dom";


function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    minEmployees: "",
    maxEmployees: ""
  });

  // Fetch all companies on initial mount
  useEffect(() => {
    search();
  }, []);

  /** Call API to search with form fields */
  async function search(filters = {}) {
    setLoading(true);
    try {
      const data = await JoblyApi.getCompanies(filters);
      setCompanies(data);
    } catch (err) {
      console.error("Error fetching companies:", err);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }

  /** Handle input change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  /** Handle form submit */
  function handleSubmit(evt) {
    evt.preventDefault();

    // Prepare filter object, removing empty strings
    const filters = {};
    if (formData.name.trim()) filters.name = formData.name.trim();
    if (formData.minEmployees) filters.minEmployees = +formData.minEmployees;
    if (formData.maxEmployees) filters.maxEmployees = +formData.maxEmployees;

    search(filters);
  }

  return (
    <div className="CompanyList container mt-4">
      <h2>Search Companies</h2>

      <Form onSubmit={handleSubmit} className="mb-4">
        <FormGroup>
          <Label htmlFor="name">Company Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Apple"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="minEmployees">Min Employees</Label>
          <Input
            id="minEmployees"
            name="minEmployees"
            type="number"
            value={formData.minEmployees}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="maxEmployees">Max Employees</Label>
          <Input
            id="maxEmployees"
            name="maxEmployees"
            type="number"
            value={formData.maxEmployees}
            onChange={handleChange}
          />
        </FormGroup>

        <Button type="submit" color="primary">Search</Button>
      </Form>

      {loading ? (
        <p>Loading companies...</p>
      ) : !companies.length ? (
        <p>No companies found.</p>
      ) : (
        companies.map(c => (
          <Card className="mb-3" key={c.handle}>
            <CardBody>
              <CardTitle tag="h5">
                <Link to={`/companies/${c.handle}`}>{c.name}</Link>
              </CardTitle>
              <CardText>{c.description}</CardText>
            </CardBody>
          </Card>
        ))        
      )}
    </div>
  );
}

export default Companies;
