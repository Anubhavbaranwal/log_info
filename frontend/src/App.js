import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [filters, setFilters] = useState({
    level: '',
    message: '',
    resourceId: '',
    timestamp_start: '',
    timestamp_end: '',
    traceId: '',
    spanId: '',
    commit: ''
  });

  const [searchDebounceTimeout, setSearchDebounceTimeout] = useState(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value.trim()) {
          queryParams.append(key, value.trim());
        }
      });
      
      const response = await axios.get(`${API_BASE_URL}/api/v1/logs?${queryParams}`);
      const logsData = response.data.data || response.data;
      const logsArray = Array.isArray(logsData) ? logsData : [];
      setLogs(logsArray);
      setFilteredLogs(logsArray);
    } catch (err) {
      setError('Failed to fetch logs. Please ensure the backend server is running.');
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
    
    if (searchDebounceTimeout) {
      clearTimeout(searchDebounceTimeout);
    }
    
    const newTimeout = setTimeout(() => {
    }, 300);
    
    setSearchDebounceTimeout(newTimeout);
  };

  useEffect(() => {
    if (searchDebounceTimeout) {
      clearTimeout(searchDebounceTimeout);
    }
    
    const timeout = setTimeout(() => {
      fetchLogs();
    }, 300);
    
    setSearchDebounceTimeout(timeout);
    
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [filters, fetchLogs]);

  const clearFilters = () => {
    setFilters({
      level: '',
      message: '',
      resourceId: '',
      timestamp_start: '',
      timestamp_end: '',
      traceId: '',
      spanId: '',
      commit: ''
    });
  };

  const formatTimestamp = (timestamp) => {
    try {
      return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
    } catch (err) {
      return timestamp;
    }
  };

  const formatDateTimeLocal = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return format(date, "yyyy-MM-dd'T'HH:mm");
    } catch (err) {
      return '';
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>Log Ingestion and Querying System</h1>
        </div>
      </header>

      <div className="container">
        <div className="filter-bar">
          <div className="filter-grid">
            <div className="filter-group">
              <label className="filter-label">Search Message</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Search in log messages..."
                value={filters.message}
                onChange={(e) => handleFilterChange('message', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Log Level</label>
              <select
                className="filter-select"
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="error">Error</option>
                <option value="warn">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Resource ID</label>
              <input
                type="text"
                className="filter-input"
                placeholder="e.g., server-1234"
                value={filters.resourceId}
                onChange={(e) => handleFilterChange('resourceId', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Trace ID</label>
              <input
                type="text"
                className="filter-input"
                placeholder="e.g., abc-xyz-123"
                value={filters.traceId}
                onChange={(e) => handleFilterChange('traceId', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Span ID</label>
              <input
                type="text"
                className="filter-input"
                placeholder="e.g., span-456"
                value={filters.spanId}
                onChange={(e) => handleFilterChange('spanId', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Commit</label>
              <input
                type="text"
                className="filter-input"
                placeholder="e.g., 5e5342f"
                value={filters.commit}
                onChange={(e) => handleFilterChange('commit', e.target.value)}
              />
            </div>
          </div>

          <div className="datetime-group">
            <div className="filter-group">
              <label className="filter-label">Start Date/Time</label>
              <input
                type="datetime-local"
                className="filter-input"
                value={formatDateTimeLocal(filters.timestamp_start)}
                onChange={(e) => handleFilterChange('timestamp_start', e.target.value ? new Date(e.target.value).toISOString() : '')}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">End Date/Time</label>
              <input
                type="datetime-local"
                className="filter-input"
                value={formatDateTimeLocal(filters.timestamp_end)}
                onChange={(e) => handleFilterChange('timestamp_end', e.target.value ? new Date(e.target.value).toISOString() : '')}
              />
            </div>

            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Logs Container */}
        <div className="logs-container">
          <div className="logs-header">
            <h2>Log Entries</h2>
            <div className="logs-count">
              {loading ? 'Loading...' : `${filteredLogs.length} log(s) found`}
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading logs...</div>
          ) : filteredLogs.length === 0 ? (
            <div className="no-logs">
              <h3>No logs found</h3>
              <p>Try adjusting your filters or check if the backend server is running.</p>
            </div>
          ) : (
            <div className="logs-list">
              {filteredLogs.map((log, index) => (
                <div key={index} className="log-entry">
                  <div className="log-header">
                    <span className={`log-level ${log.level}`}>{log.level}</span>
                    <span className="log-timestamp">{formatTimestamp(log.timestamp)}</span>
                  </div>
                  
                  <div className="log-message">{log.message}</div>
                  
                  <div className="log-details">
                    <div className="log-detail">
                      <span className="log-detail-label">Resource:</span> {log.resourceId}
                    </div>
                    <div className="log-detail">
                      <span className="log-detail-label">Trace:</span> {log.traceId}
                    </div>
                    <div className="log-detail">
                      <span className="log-detail-label">Span:</span> {log.spanId}
                    </div>
                    <div className="log-detail">
                      <span className="log-detail-label">Commit:</span> {log.commit}
                    </div>
                    {log.metadata && Object.keys(log.metadata).length > 0 && (
                      <div className="log-detail">
                        <span className="log-detail-label">Metadata:</span> {JSON.stringify(log.metadata)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
