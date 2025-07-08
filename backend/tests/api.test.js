const request = require('supertest');
const app = require('../src/app');

describe('Log Ingestion API', () => {
  describe('GET /api/v1/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/v1/health')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('OK');
      expect(response.body.data.timestamp).toBeDefined();
    });
  });

  describe('GET /api/v1/logs', () => {
    it('should return all logs', async () => {
      const response = await request(app)
        .get('/api/v1/logs')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should filter logs by level', async () => {
      const response = await request(app)
        .get('/api/v1/logs?level=error')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      response.body.data.forEach(log => {
        expect(log.level).toBe('error');
      });
    });

    it('should filter logs by message', async () => {
      const response = await request(app)
        .get('/api/v1/logs?message=database')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      response.body.data.forEach(log => {
        expect(log.message.toLowerCase()).toContain('database');
      });
    });
  });

  describe('POST /api/v1/logs', () => {
    it('should create a new log entry', async () => {
      const newLog = {
        level: 'info',
        message: 'Test log message',
        resourceId: 'test-server-001',
        timestamp: new Date().toISOString(),
        traceId: 'test-trace-123',
        spanId: 'test-span-456',
        commit: 'test-commit',
        metadata: { test: true }
      };

      const response = await request(app)
        .post('/api/v1/logs')
        .send(newLog)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject(newLog);
    });

    it('should return 400 for invalid log entry', async () => {
      const invalidLog = {
        level: 'invalid-level',
        message: 'Test message'
        // missing required fields
      };

      const response = await request(app)
        .post('/api/v1/logs')
        .send(invalidLog)
        .expect(400);
        
      expect(response.body.success).toBe(false);
    });
  });
});
