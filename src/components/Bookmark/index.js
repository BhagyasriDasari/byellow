import React from 'react';
import './index.css';

function Bookmark({ bookmarks }) {
  return (
    <div>
      <h1 className='heading'>Bookmarked Jobs</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarked jobs yet.</p>
      ) : (
        <div>
          {bookmarks.map((job) => (
            <div className="bookmark-card" key={job.id} >
              <h3>{job.title}</h3>
              <p>Location: {job?.primary_details?.Place || 'No location provided'}</p>
              <p>Salary: {job?.primary_details?.Salary || 'No salary information'}</p>
              <p>Phone: {job?.primary_details?.Phone || 'No phone number available'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookmark;
