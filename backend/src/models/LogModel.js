const fs = require('fs');
const path = require('path');

class LogModel {
  constructor() {
    this.logFilePath = path.join(__dirname, '../../logs.json');
    this.initializeFile();
  }

  initializeFile() {
    if (!fs.existsSync(this.logFilePath)) {
      fs.writeFileSync(this.logFilePath, JSON.stringify([], null, 2));
    }
  }

  readLogs() {
    try {
      const data = fs.readFileSync(this.logFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading logs file:', error);
      return [];
    }
  }

  writeLogs(logs) {
    try {
      fs.writeFileSync(this.logFilePath, JSON.stringify(logs, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing logs file:', error);
      return false;
    }
  }

  createLog(logData) {
    const logs = this.readLogs();
    logs.push(logData);
    return this.writeLogs(logs) ? logData : null;
  }

  getAllLogs() {
    return this.readLogs();
  }

  filterLogs(filters) {
    const logs = this.readLogs();
    return logs.filter(log => {
      // Level filter
      if (filters.level && log.level !== filters.level) {
        return false;
      }

      // Message full-text search (case-insensitive)
      if (filters.message && !log.message.toLowerCase().includes(filters.message.toLowerCase())) {
        return false;
      }

      // ResourceId filter
      if (filters.resourceId && log.resourceId !== filters.resourceId) {
        return false;
      }

      // Timestamp range filter
      if (filters.timestamp_start) {
        const logTime = new Date(log.timestamp);
        const startTime = new Date(filters.timestamp_start);
        if (logTime < startTime) {
          return false;
        }
      }

      if (filters.timestamp_end) {
        const logTime = new Date(log.timestamp);
        const endTime = new Date(filters.timestamp_end);
        if (logTime > endTime) {
          return false;
        }
      }

      // TraceId filter
      if (filters.traceId && log.traceId !== filters.traceId) {
        return false;
      }

      // SpanId filter
      if (filters.spanId && log.spanId !== filters.spanId) {
        return false;
      }

      // Commit filter
      if (filters.commit && log.commit !== filters.commit) {
        return false;
      }

      return true;
    });
  }
}

module.exports = new LogModel();
