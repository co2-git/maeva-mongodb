import 'babel-polyfill';
import connector from './lib/connect';

const conn = connector('mongodb://localhost:7007/wallets');

conn.emitter.on('error', (error) => console.log('////////'));

conn.actions.connect();
