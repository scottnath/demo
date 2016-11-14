import test from 'ava';
import tests from 'punchcard-shared-tests';

import addressPlugin from '../input-plugins/input-plugin-address';

tests.plugins(test, addressPlugin);
