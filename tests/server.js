import test from 'ava';
import request from 'supertest';
import punchcard from '../';

let agent;

test.cb.before(t => {
  punchcard().then(app => {
    agent = request.agent(app);

    t.end();
  });
});

test.cb('Landing Page', t => {
  agent
    .get('/create-admin')
    .expect(200)
    .end((err, res) => {
      t.is(err, null, 'Should not have an error');
      t.regex(res.text, /DOCTYPE html/, 'Should have an HTML Doctype');
      t.end();
    });
});
