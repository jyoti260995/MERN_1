import React, { Component } from "react";
import API from "../services/api";

class CreateEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postingDate: "",
      entryNo: "",
      name: "",
      description: "",
      amount: "",
      debit: "",
      credit: "",
      glNumber: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createEntry = async () => {
    try {
      await API.post("/", {
        postingDate: this.state.postingDate,
        entryNo: this.state.entryNo,
        name: this.state.name,
        description: this.state.description,
        amount: Number(this.state.amount),
        debit: Number(this.state.debit),
        credit: Number(this.state.credit),
        glNumber: this.state.glNumber,
      });

      alert("Journal Entry Created Successfully");

      this.setState({
        postingDate: "",
        entryNo: "",
        name: "",
        description: "",
        amount: "",
        debit: "",
        credit: "",
        glNumber: "",
      });

      if (this.props.onCreated) {
        this.props.onCreated();
      }
    } catch (err) {
      console.log(err);
      alert("Failed to create entry.");
    }
  };

  render() {
    return (
      <div className="container mt-5">

        <h2>Create Journal Entry</h2>

        <div className="row">

          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              type="date"
              name="postingDate"
              value={this.state.postingDate}
              onChange={this.handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Entry Number"
              name="entryNo"
              value={this.state.entryNo}
              onChange={this.handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Company Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="GL Number"
              name="glNumber"
              value={this.state.glNumber}
              onChange={this.handleChange}
            />
          </div>

          <div className="col-md-12 mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              className="form-control"
              type="number"
              placeholder="Amount"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              className="form-control"
              type="number"
              placeholder="Debit"
              name="debit"
              value={this.state.debit}
              onChange={this.handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              className="form-control"
              type="number"
              placeholder="Credit"
              name="credit"
              value={this.state.credit}
              onChange={this.handleChange}
            />
          </div>

        </div>

        <button
          className="btn btn-primary"
          onClick={this.createEntry}
        >
          Create Entry
        </button>

      </div>
    );
  }
}

export default CreateEntry;