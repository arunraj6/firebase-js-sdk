/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import firebase from './app';
import { name, version } from '../package.json';

import './auth';
// import './database';
// // TODO(b/158625454): Storage doesn't actually work by default in RN (it uses
// //  `atob`). We should provide a RN build that works out of the box.
// import './storage';
import './firestore';

firebase.registerVersion(name, version, 'compat-rn');

export default firebase;
