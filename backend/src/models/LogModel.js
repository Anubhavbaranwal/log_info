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
      if (filters.level && log.level !== filters.level) {
        return false;
      }

      if (filters.message && !log.message.toLowerCase().includes(filters.message.toLowerCase())) {
        return false;
      }

      if (filters.resourceId && !log.resourceId.toLowerCase().includes(filters.resourceId.toLowerCase())) {
        return false;
      }

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

      if (filters.traceId && !log.traceId.toLowerCase().includes(filters.traceId.toLowerCase())) {
        return false;
      }

      if (filters.spanId && !log.spanId.toLowerCase().includes(filters.spanId.toLowerCase())) {
        return false;
      }

      if (filters.commit && !log.commit.toLowerCase().includes(filters.commit.toLowerCase())) {
        return false;
      }

      return true;
    });
  }
}

module.exports = new LogModel();
