import request from 'supertest';
import app from '../app.js';
import db from '../src/database/index.js';

describe('Database Schema Validation', () => {
  beforeAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  afterAll(() => {
    db.close();
  });

  const tables = [
    {
      name: 'clients',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'customer_id', type: 'TEXT' },
        { name: 'document', type: 'TEXT' },
        { name: 'name', type: 'TEXT' },
      ],
    },
    {
      name: 'billets',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'customer_id', type: 'TEXT' },
        { name: 'value', type: 'NUMBER' },
        { name: 'url', type: 'TEXT' },
      ],
    },
    {
      name: 'creditcards',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'customer_id', type: 'TEXT' },
        { name: 'value', type: 'NUMBER' },
        { name: 'payment_id', type: 'TEXT' },
      ],
    },
    {
      name: 'qrcodes',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'customer_id', type: 'TEXT' },
        { name: 'value', type: 'NUMBER' },
        { name: 'key', type: 'TEXT' },
        { name: 'encoded_image', type: 'TEXT' },
        { name: 'payload', type: 'TEXT' },
      ],
    },
    {
      name: 'payments',
      columns: [
        { name: 'id', type: 'TEXT' },
        { name: 'customer_id', type: 'TEXT' },
        { name: 'type', type: 'TEXT' },
        { name: 'context_id', type: 'INTEGER' },
        { name: 'status', type: 'TEXT' },
        { name: 'created_at', type: 'DATETIME' },
      ],
    },
  ];

  tables.forEach((table) => {
    test(`Table ${table.name} should exist with correct schema`, async () => {
      const query = `PRAGMA table_info(${table.name})`;
      const columns = db.prepare(query).all();

      expect(columns.length).toBe(table.columns.length);

      table.columns.forEach((expectedColumn) => {
        const column = columns.find((col) => col.name === expectedColumn.name);
        expect(column).toBeDefined();
        expect(column.type).toBe(expectedColumn.type);
      });
    });
  });
});
