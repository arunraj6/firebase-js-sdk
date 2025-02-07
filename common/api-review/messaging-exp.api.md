## API Report File for "@firebase/messaging-exp"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { FirebaseApp } from '@firebase/app';
import { NextFn } from '@firebase/util';
import { Observer } from '@firebase/util';
import { Unsubscribe } from '@firebase/util';

// @public
export function deleteToken(messaging: FirebaseMessaging): Promise<boolean>;

// @public (undocumented)
export interface FcmOptions {
    // (undocumented)
    analyticsLabel?: string;
    // (undocumented)
    link?: string;
}

// @public (undocumented)
export interface FirebaseMessaging {
}

// @internal (undocumented)
export type _FirebaseMessagingName = 'messaging';

// @public
export function getMessaging(app: FirebaseApp): FirebaseMessaging;

// @public
export function getToken(messaging: FirebaseMessaging, options?: {
    vapidKey?: string;
    swReg?: ServiceWorkerRegistration;
}): Promise<string>;

// @public (undocumented)
export interface MessagePayload {
    // (undocumented)
    collapseKey: string;
    // (undocumented)
    data?: {
        [key: string]: string;
    };
    // (undocumented)
    fcmOptions?: FcmOptions;
    // (undocumented)
    from: string;
    // (undocumented)
    notification?: NotificationPayload;
}

export { NextFn }

// @public
export interface NotificationPayload {
    // (undocumented)
    body?: string;
    // (undocumented)
    image?: string;
    // (undocumented)
    title?: string;
}

export { Observer }

// Warning: (ae-internal-missing-underscore) The name "onBackgroundMessage" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export function onBackgroundMessage(messaging: FirebaseMessaging, nextOrObserver: NextFn<MessagePayload> | Observer<MessagePayload>): Unsubscribe;

// @public
export function onMessage(messaging: FirebaseMessaging, nextOrObserver: NextFn<MessagePayload> | Observer<MessagePayload>): Unsubscribe;

export { Unsubscribe }


// (No @packageDocumentation comment for this package)

```
