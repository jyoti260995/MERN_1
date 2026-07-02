import React, { Component } from "react";
import API from "../services/api";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: {
        totalEntries: 0,
        completed: 0,
        pending: 0,
        processing: 0,
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
        anomalies: 0,
      },
    };
  }

  componentDidMount() {
    this.loadDashboard();
  }

  loadDashboard = async () => {
    try {
      const res = await API.get("/dashboard/stats");

      this.setState({
        stats: res.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  renderCard(title, value, color) {
    return (
      <div className="col-md-3 mb-4">
        <div className={`card border-${color} shadow-sm`}>
          <div className="card-body text-center">
            <h6>{title}</h6>
            <h2>{value}</h2>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { stats } = this.state;

    return (
      <div className="container mt-4">

        <h2 className="mb-4">
          Dashboard
        </h2>

        <div className="row">

          {this.renderCard(
            "Total Entries",
            stats.totalEntries,
            "primary"
          )}

          {this.renderCard(
            "Completed",
            stats.completed,
            "success"
          )}

          {this.renderCard(
            "Pending",
            stats.pending,
            "warning"
          )}

          {this.renderCard(
            "Processing",
            stats.processing,
            "info"
          )}

          {this.renderCard(
            "High Risk",
            stats.highRisk,
            "danger"
          )}

          {this.renderCard(
            "Medium Risk",
            stats.mediumRisk,
            "warning"
          )}

          {this.renderCard(
            "Low Risk",
            stats.lowRisk,
            "success"
          )}

          {this.renderCard(
            "Anomalies",
            stats.anomalies,
            "dark"
          )}

        </div>
      </div>
    );
  }
}

export default Dashboard;