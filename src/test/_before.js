import 'babel-polyfill';
import * as maeva from 'maeva';
import connect from '../lib/connect';

maeva.connect(connect(process.env.MONGODB_URL));
