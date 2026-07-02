import React, { Component } from "react";
import API from "../services/api";

class JournalTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
    };
  }

  componentDidMount() {
    this.loadEntries();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.refreshKey !== this.props.refreshKey) {
      this.loadEntries();
    }
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

  deleteEntry = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this journal entry?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/${id}`);

      alert(res.data.message);

      this.loadEntries();

      if (this.props.onRefresh) {
        this.props.onRefresh();
      }
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
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

  statusColor(status) {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "PROCESSING":
        return "warning";
      default:
        return "secondary";
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <h2>Journal Entries</h2>

        <table className="table table-striped table-hover mt-3">

          <thead className="table-dark">

            <tr>
              <th>Entry No</th>
              <th>Company</th>
              <th>Amount</th>
              <th>Risk</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {this.state.entries.map((entry) => (

              <tr key={entry._id}>

                <td>{entry.entryNo}</td>

                <td>{entry.name}</td>

                <td>₹ {entry.amount.toLocaleString()}</td>

                <td>
                  <span
                    className={`badge bg-${this.badgeColor(entry.riskLevel)}`}
                  >
                    {entry.riskLevel}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge bg-${this.statusColor(entry.status)}`}
                  >
                    {entry.status}
                  </span>
                </td>

                <td>

                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => this.props.onView(entry._id)}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.deleteEntry(entry._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    );
  }
}

export default JournalTable;