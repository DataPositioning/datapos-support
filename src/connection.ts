/**
 * @file datapos-engine-support/src/connection.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Engine Dependencies
import { FirebaseTimestamp } from '.';
import type { Component, ComponentConfig } from './component';
import { ConnectorConfig, ConnectorImplementation } from './connector';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface Connection extends Component {
    config: ConnectionConfig;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection - Config
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ConnectionConfig extends ComponentConfig {
    authorization?: Record<string, ConnectionAuthorization>;
    connectorConfig: ConnectorConfig;
    implementation: ConnectorImplementation;
    implementationId?: string;
    notation?: string;
    verifiedAt?: FirebaseTimestamp;
}

interface ConnectionAuthorization {
    access_token: string; // Dropbox.
    account_id: string; // Dropbox.
    expires_at: number; // Dropbox.
    expires_in: number; // Dropbox.
    refresh_token: string; // Dropbox.
    scope: string; // Dropbox.
    token_type: string; // Dropbox.
    uid: string; // Dropbox.
}
