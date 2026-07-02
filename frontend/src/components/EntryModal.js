import React, { Component } from "react";
import API from "../services/api";

class EntryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: "",
      workflowStatus: "OPEN",
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.entry &&
      (!prevProps.entry ||
        prevProps.entry._id !== this.props.entry._id)
    ) {
      this.setState({
        comments: this.props.entry.comments || "",
        workflowStatus:
          this.props.entry.workflowStatus || "OPEN",
      });
    }
  }

  saveMetadata = async () => {
    try {
      const { entry } = this.props;

      const response = await API.put(
        `/${entry._id}/metadata`,
        {
          comments: this.state.comments,
          workflowStatus: this.state.workflowStatus,
        }
      );

      alert(response.data.message);

      this.props.onClose();
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong.");
      }
    }
  };

  render() {
    const { entry, onClose } = this.props;

    if (!entry) return null;

    return (
      <div
        className="modal fade show"
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">
                Journal Entry Details
              </h4>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">

              <table className="table table-bordered">
                <tbody>

                  <tr>
                    <th>Entry No</th>
                    <td>{entry.entryNo}</td>
                  </tr>

                  <tr>
                    <th>Company</th>
                    <td>{entry.name}</td>
                  </tr>

                  <tr>
                    <th>Description</th>
                    <td>{entry.description}</td>
                  </tr>

                  <tr>
                    <th>Amount</th>
                    <td>₹ {entry.amount}</td>
                  </tr>

                  <tr>
                    <th>Risk Score</th>
                    <td>{entry.riskScore}</td>
                  </tr>

                  <tr>
                    <th>Risk Level</th>
                    <td>{entry.riskLevel}</td>
                  </tr>

                  <tr>
                    <th>Status</th>
                    <td>{entry.status}</td>
                  </tr>

                </tbody>
              </table>

              <hr />

              <h5>Metadata Update</h5>

              <div className="mb-3">
                <label className="form-label">
                  Comments
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  value={this.state.comments}
                  onChange={(e) =>
                    this.setState({
                      comments: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Workflow Status
                </label>

                <select
                  className="form-select"
                  value={this.state.workflowStatus}
                  onChange={(e) =>
                    this.setState({
                      workflowStatus: e.target.value,
                    })
                  }
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_REVIEW">IN REVIEW</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <hr />

              <h5>Anomalies</h5>

              {entry.anomalies &&
              entry.anomalies.length > 0 ? (
                <ul>
                  {entry.anomalies.map(
                    (anomaly, index) => (
                      <li key={index}>
                        <strong>
                          {anomaly.field}
                        </strong>{" "}
                        — {anomaly.message}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-muted">
                  No anomalies detected.
                </p>
              )}

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>

              <button
                className="btn btn-success"
                onClick={this.saveMetadata}
              >
                Save Metadata
              </button>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default EntryModal;