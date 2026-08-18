import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';

interface Env {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>().basePath('/api');

// Middleware to extract user ID from headers (passed by frontend or Clerk middleware)
// For simplicity in this demo, we'll expect the frontend to pass the Clerk user ID in an 'x-user-id' header.
// In a real production app, you should verify the Clerk JWT token here using @clerk/backend.
app.use('*', async (c, next) => {
  const userId = c.req.header('x-user-id');
  if (!userId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  c.set('userId', userId);
  await next();
});

// Get user profile
app.get('/user', async (c) => {
  const userId = c.get('userId');
  let user = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  
  if (!user) {
    // Create default profile
    await c.env.DB.prepare('INSERT INTO users (id, step_conversion) VALUES (?, 2000)').bind(userId).run();
    user = { id: userId, step_conversion: 2000 };
  }
  return c.json(user);
});

// Update user conversion rate
app.post('/user/conversion', async (c) => {
  const userId = c.get('userId');
  const { step_conversion } = await c.req.json();
  
  await c.env.DB.prepare('UPDATE users SET step_conversion = ? WHERE id = ?')
    .bind(step_conversion, userId)
    .run();
    
  return c.json({ success: true });
});

// Get journey logs
app.get('/logs', async (c) => {
  const userId = c.get('userId');
  const { results } = await c.env.DB.prepare('SELECT * FROM logs WHERE user_id = ? ORDER BY date DESC').bind(userId).all();
  return c.json(results);
});

// Add a log entry
app.post('/logs', async (c) => {
  const userId = c.get('userId');
  const { id, date, steps } = await c.req.json();
  
  await c.env.DB.prepare('INSERT INTO logs (id, user_id, date, steps) VALUES (?, ?, ?, ?)')
    .bind(id, userId, date, steps)
    .run();
    
  return c.json({ success: true });
});

// Delete a log entry
app.delete('/logs/:id', async (c) => {
  const userId = c.get('userId');
  const logId = c.req.param('id');
  
  await c.env.DB.prepare('DELETE FROM logs WHERE id = ? AND user_id = ?')
    .bind(logId, userId)
    .run();
    
  return c.json({ success: true });
});

export const onRequest = handle(app);
