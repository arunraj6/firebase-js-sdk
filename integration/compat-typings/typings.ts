/**
 * @license
 * Copyright 2021 Google LLC
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

import firebase from 'firebase-exp/compat';
import { FirebaseAuth, User } from '@firebase/auth-types';
import { FirebaseAnalytics } from '@firebase/analytics-types';
import { FirebaseApp } from '@firebase/app-compat';
import {
  FirebaseFirestore,
  DocumentReference,
  CollectionReference
} from '@firebase/firestore-types';
import { FirebaseFunctions } from '@firebase/functions-types';
import { FirebaseInstallations } from '@firebase/installations-types';
// Get type directly from messaging package, messaging-compat does not implement
// the current messaging API.
import { MessagingCompat } from '../../packages-exp/messaging-compat/src/messaging-compat';
import { FirebasePerformance } from '@firebase/performance-types';
import { RemoteConfig } from '@firebase/remote-config-types';
import {
  FirebaseStorage,
  Reference as StorageReference
} from '@firebase/storage-types';

/**
 * Test namespaced types from compat/index.d.ts against the types used in
 * implementation of the actual compat services. In almost all cases the services
 * implement types found in the corresponding -types package. The only exceptions
 * are
 * - messaging, which has changed its public API in the compat version
 * - app-compat, which defines its FirebaseApp type in its own package
 */

const namespaced: {
  auth: firebase.auth.Auth;
  analytics: firebase.analytics.Analytics;
  app: firebase.app.App;
  firestore: firebase.firestore.Firestore;
  functions: firebase.functions.Functions;
  installations?: firebase.installations.Installations;
  messaging: firebase.messaging.Messaging;
  performance: firebase.performance.Performance;
  remoteConfig: firebase.remoteConfig.RemoteConfig;
  storage: firebase.storage.Storage;
  storageReference: firebase.storage.Reference;
  firestoreDocumentReference: firebase.firestore.DocumentReference;
  firestoreCollectionReference: firebase.firestore.CollectionReference;
  authUser: firebase.User;
} = {
  auth: firebase.auth(),
  analytics: firebase.analytics(),
  app: firebase.initializeApp({}),
  firestore: firebase.firestore(),
  functions: firebase.functions(),
  installations: {} as firebase.installations.Installations,
  messaging: firebase.messaging(),
  performance: firebase.performance(),
  remoteConfig: firebase.remoteConfig(),
  storage: firebase.storage(),
  storageReference: {} as firebase.storage.Reference,
  firestoreDocumentReference: {} as firebase.firestore.DocumentReference,
  firestoreCollectionReference: {} as firebase.firestore.CollectionReference,
  authUser: {} as firebase.User
};

const compatTypes: {
  auth: FirebaseAuth;
  analytics: FirebaseAnalytics;
  app: FirebaseApp;
  firestore: FirebaseFirestore;
  functions: FirebaseFunctions;
  installations?: FirebaseInstallations;
  messaging: MessagingCompat;
  performance: FirebasePerformance;
  remoteConfig: RemoteConfig;
  storage: FirebaseStorage;
  storageReference: StorageReference;
  firestoreDocumentReference: DocumentReference;
  firestoreCollectionReference: CollectionReference;
  authUser: User;
} = {
  auth: namespaced.auth,
  analytics: namespaced.analytics,
  app: namespaced.app,
  firestore: namespaced.firestore,
  functions: namespaced.functions,
  installations: namespaced.installations,
  messaging: namespaced.messaging,
  performance: namespaced.performance,
  remoteConfig: namespaced.remoteConfig,
  storage: namespaced.storage,
  storageReference: namespaced.storageReference,
  firestoreDocumentReference: namespaced.firestoreDocumentReference,
  firestoreCollectionReference: namespaced.firestoreCollectionReference,
  authUser: namespaced.authUser
};
