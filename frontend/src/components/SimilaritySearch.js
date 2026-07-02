import React, { Component } from "react";
import API from "../services/api";

class SimilaritySearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      selectedEntry: "",
      strategy: "semantic",
      results: [],
      loading: false,
      searched: false,
    };
  }

  componentDidMount() {
    this.loadEntries();
  }

  loadEntries = async () => {
    try {
      const res = await API.get("/");

      this.setState({
        entries: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  searchSimilar = async () => {
    if (!this.state.selectedEntry) {
      alert("Please select a Journal Entry");
      return;
    }

    this.setState({
      loading: true,
      searched: false,
    });

    try {
      const res = await API.post("/search/similar", {
        entryId: this.state.selectedEntry,
        strategy: this.state.strategy,
      });

      this.setState({
        results: res.data.data,
        loading: false,
        searched: true,
      });
    } catch (err) {
      console.log(err);

      this.setState({
        loading: false,
        searched: true,
      });
    }
  };

  badgeColor(level) {
    switch (level) {
      case "HIGH":
        return "danger";
      case "MEDIUM":
        return "warning";
      default:
        return "success";
    }
  }

  render() {
    return (
      <div className="container mt-5">

        <h2>Similarity Search</h2>

        <div className="row mb-3">

          <div className="col-md-5">

            <select
              className="form-select"
              value={this.state.selectedEntry}
              onChange={(e) =>
                this.setState({
                  selectedEntry: e.target.value,
                })
              }
            >
              <option value="">
                Select Journal Entry
              </option>

              {this.state.entries.map((entry) => (
                <option
                  key={entry._id}
                  value={entry._id}
                >
                  {entry.entryNo} - {entry.name}
                </option>
              ))}
            </select>

          </div>

          <div className="col-md-3">

            <select
              className="form-select"
              value={this.state.strategy}
              onChange={(e) =>
                this.setState({
                  strategy: e.target.value,
                })
              }
            >
              <option value="semantic">
                Semantic
              </option>

              <option value="financial">
                Financial
              </option>

              <option value="entity">
                Entity
              </option>

            </select>

          </div>

          <div className="col-md-4">

            <button
              className="btn btn-success w-100"
              onClick={this.searchSimilar}
              disabled={this.state.loading}
            >
              {this.state.loading
                ? "Searching..."
                : "Search Similar Entries"}
            </button>

          </div>

        </div>

        {this.state.searched &&
          this.state.results.length === 0 && (
            <div className="alert alert-warning">
              No similar entries found.
            </div>
          )}

        {this.state.results.length > 0 && (

          <>

            <h4 className="mb-3">
              Similar Entries
            </h4>

            <table className="table table-bordered table-hover">

              <thead className="table-dark">

                <tr>
                  <th>Entry No</th>
                  <th>Company</th>
                  <th>Risk</th>
                  <th>Amount</th>
                  <th>Similarity</th>
                </tr>

              </thead>

              <tbody>

                {this.state.results.map((item) => (

                  <tr key={item.entry._id}>

                    <td>{item.entry.entryNo}</td>

                    <td>{item.entry.name}</td>

                    <td>
                      <span
                        className={`badge bg-${this.badgeColor(
                          item.entry.riskLevel
                        )}`}
                      >
                        {item.entry.riskLevel}
                      </span>
                    </td>

                    <td>
                      ₹{" "}
                      {item.entry.amount.toLocaleString()}
                    </td>

                    <td>
                      {item.score.toFixed(3)}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </>

        )}

      </div>
    );
  }
}

export default SimilaritySearch;