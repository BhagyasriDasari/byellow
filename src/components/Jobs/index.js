import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

class Jobs extends Component {
  state = {
    jobs: [],
    page: 1,
    isLoading: false,
  };

  // Fetch jobs
  fetchJobs = async (page) => {
    this.setState({ isLoading: true });
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const newJobs = response.data.results;
      if (Array.isArray(newJobs)) {
        this.setState((prevState) => ({
          jobs: [...prevState.jobs, ...newJobs],
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      this.setState({ isLoading: false });
    }
  };

  // Call API on mount
  componentDidMount() {
    this.fetchJobs(this.state.page);
  }

  // Handle Load More button
  handleLoadMore = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => this.fetchJobs(this.state.page)
    );
  };

  // Handle Bookmark
  handleBookmark = (job) => {
    console.log(`Job with ID: ${job.id} bookmarked!`);
    this.props.handleBookmark(job); // Call the prop method
  };

  render() {
    const { jobs, isLoading } = this.state;

    return (
      <div>
        <h2>Job Listings</h2>
        <div>
          {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.title}</h3>

              {/* Accessing correct property names */}
              <p>Location: {job?.primary_details?.Place || 'No location provided'}</p>
              <p>Salary: {job?.primary_details?.Salary || 'No salary information'}</p>
              <p>Phone: {job?.primary_details?.Phone || 'No phone number available'}</p>

              {/* Add a Bookmark button */}
              <button onClick={() => this.handleBookmark(job)}>Bookmark</button>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={this.handleLoadMore}>Load More</button>
        )}
      </div>
    );
  }
}

export default Jobs;
