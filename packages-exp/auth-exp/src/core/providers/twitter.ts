/**
 * @license
 * Copyright 2020 Google LLC
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

/**
 * @license
 * Copyright 2020 Twitter LLC
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

import {
  ProviderId,
  SignInMethod,
  UserCredential
} from '../../model/public_types';
import { FirebaseError } from '@firebase/util';

import { SignInWithIdpResponse } from '../../api/authentication/idp';
import { TaggedWithTokenResponse } from '../../model/id_token';
import { UserCredentialInternal } from '../../model/user';
import { OAuthCredential } from '../credentials/oauth';
import { BaseOAuthProvider } from './oauth';

/**
 * Provider for generating an {@link OAuthCredential} for {@link ProviderId.TWITTER}.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new TwitterAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Twitter Access Token and Secret.
 *   const credential = provider.credentialFromResult(auth, result);
 *   const token = credential.accessToken;
 *   const secret = credential.secret;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new TwitterAuthProvider();
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Twitter Access Token and Secret.
 * const credential = provider.credentialFromResult(auth, result);
 * const token = credential.accessToken;
 * const secret = credential.secret;
 * ```
 *
 * @public
 */
export class TwitterAuthProvider extends BaseOAuthProvider {
  static readonly TWITTER_SIGN_IN_METHOD = SignInMethod.TWITTER;
  static readonly PROVIDER_ID = ProviderId.TWITTER;

  constructor() {
    super(ProviderId.TWITTER);
  }

  /**
   * Creates a credential for Twitter.
   *
   * @param token - Twitter access token.
   * @param secret - Twitter secret.
   */
  static credential(token: string, secret: string): OAuthCredential {
    return OAuthCredential._fromParams({
      providerId: TwitterAuthProvider.PROVIDER_ID,
      signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
      oauthToken: token,
      oauthTokenSecret: secret
    });
  }

  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
   *
   * @param userCredential - The user credential.
   */
  static credentialFromResult(
    userCredential: UserCredential
  ): OAuthCredential | null {
    return TwitterAuthProvider.credentialFromTaggedObject(
      userCredential as UserCredentialInternal
    );
  }

  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
   * thrown during a sign-in, link, or reauthenticate operation.
   *
   * @param userCredential - The user credential.
   */
  static credentialFromError(error: FirebaseError): OAuthCredential | null {
    return TwitterAuthProvider.credentialFromTaggedObject(
      (error.customData || {}) as TaggedWithTokenResponse
    );
  }

  private static credentialFromTaggedObject({
    _tokenResponse: tokenResponse
  }: TaggedWithTokenResponse): OAuthCredential | null {
    if (!tokenResponse) {
      return null;
    }
    const {
      oauthAccessToken,
      oauthTokenSecret
    } = tokenResponse as SignInWithIdpResponse;
    if (!oauthAccessToken || !oauthTokenSecret) {
      return null;
    }

    try {
      return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
    } catch {
      return null;
    }
  }
}
