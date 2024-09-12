import React, { Component } from 'react';
import Jobs from './components/Jobs';
import Bookmarks from './components/Bookmark'; 
import './App.css';

class App extends Component {
  state = {
    activeTab: 'jobs',
    bookmarks: JSON.parse(localStorage.getItem('bookmarkedJobs')) || [],
  };

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  handleBookmark = (job) => {
    this.setState((prevState) => {
      // Prevent duplicates
      const isAlreadyBookmarked = prevState.bookmarks.some((bookmark) => bookmark.id === job.id);
      
      if (isAlreadyBookmarked) {
        return null; // Do nothing if already bookmarked
      }

      const updatedBookmarks = [...prevState.bookmarks, job];
      localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
      return { bookmarks: updatedBookmarks };
    });
  };

  clearBookmarks = () => {
    localStorage.removeItem('bookmarkedJobs');
    this.setState({ bookmarks: [] });
  };

  render() {
    const { activeTab, bookmarks } = this.state;

    return (
      <div className="App">
        <div className="app-content">
          {activeTab === 'jobs' ? (
            <Jobs handleBookmark={this.handleBookmark} />
          ) : (
            <Bookmarks bookmarks={bookmarks} />
          )}
        </div>
        <div className="bottom-nav">
          <button onClick={() => this.handleTabChange('jobs')}>Jobs</button>
          <button onClick={() => this.handleTabChange('bookmarks')}>Bookmarks</button>
          <button className="clear-btn" onClick={this.clearBookmarks}>Clear Bookmarks</button>
        </div>
      </div>
    );
  }
}

export default App;
