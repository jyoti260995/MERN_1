import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import JournalTable from "./components/JournalTable";
import EntryModal from "./components/EntryModal";
import SimilaritySearch from "./components/SimilaritySearch";
import CreateEntry from "./components/CreateEntry";
import API from "./services/api";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEntry: null,
      refreshKey: 0,
    };
  }

  // View Journal Entry
  handleView = async (id) => {
    try {
      const res = await API.get(`/${id}`);

      this.setState({
        selectedEntry: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Close Modal
  closeModal = () => {
    this.setState({
      selectedEntry: null,
    });
  };

  // Refresh Dashboard, Table & Search
  refreshData = () => {
    this.setState((prevState) => ({
      refreshKey: prevState.refreshKey + 1,
    }));
  };

  render() {
    return (
      <>
        <Dashboard
          key={`dashboard-${this.state.refreshKey}`}
        />

        <CreateEntry
          onCreated={this.refreshData}
        />

        <JournalTable
          key={`table-${this.state.refreshKey}`}
          refreshKey={this.state.refreshKey}
          onView={this.handleView}
          onRefresh={this.refreshData}
        />

        <SimilaritySearch
          key={`search-${this.state.refreshKey}`}
        />

        <EntryModal
          entry={this.state.selectedEntry}
          onClose={this.closeModal}
        />
      </>
    );
  }
}

export default App;