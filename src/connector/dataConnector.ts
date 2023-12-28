import type { Callback, Options, Parser } from 'csv-parse';
import type { ConnectionConfig, ConnectionDescription } from '../connection';
import type { Connector, ConnectorCallbackData, ConnectorConfig } from '.';
import type { DataViewConfig, ValueDelimiterId } from '../dataView';
import type { ParsedValue, PreviewColumn } from '..';

export interface DataConnector extends Connector {
    abortController?: AbortController;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;

    abort?(): void;
    authenticate?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    describe?(
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        connectionEntryId: string | undefined,
        callback: (data: ConnectorCallbackData) => void
    ): Promise<ConnectionDescription>;
    getCreateInterface?(): CreateInterface;
    getPreviewInterface?(): PreviewInterface;
    getReadInterface?(): ReadInterface;
    getWriteInterface?(): WriteInterface;
    listEntries?(settings: ListEntriesSettings): Promise<ListEntriesResult>;
}

// Create Interface
interface CreateInterface {
    connector: DataConnector;
}

// Preview Interface
export interface PreviewInterface {
    connector: DataConnector;
    preview(connector: DataConnector, DataViewConfig: DataViewConfig, settings: PreviewInterfaceSettings): Promise<Preview>;
}

export interface InterfaceSettings {
    accountId?: string;
    sessionAccessToken?: string;
}

export interface PreviewInterfaceSettings extends InterfaceSettings {
    chunkSize?: number;
}
export interface PreviewResponse {
    error?: unknown;
    result?: DataViewConfig;
}

// Declarations
export interface Encoding {
    id: string;
    confidenceLevel?: number;
}

// Declarations
export interface EncodingConfig {
    id: string;
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
}

// Declarations
export interface FileSchema {
    columns: PreviewColumn[];
    hasHeaderLine: boolean;
    records: ParsedValue[][];
    text: string;
    valueDelimiterId: ValueDelimiterId;
}

// Read Interface
export interface ReadInterface {
    connector: DataConnector;
    read(
        connector: DataConnector,
        DataViewConfig: DataViewConfig,
        settings: ReadInterfaceSettings,
        csvParse: (options?: Options, callback?: Callback) => Parser,
        callback: (data: ConnectorCallbackData) => void
    ): Promise<void>;
}
export interface ReadInterfaceSettings {
    chunk(records: DataConnectorRecord[]): void;
    chunkSize?: number;
    complete(fileInfo: DataConnectorFileInfo): void;
}
export interface DataConnectorFileInfo {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}
export interface DataConnectorRecord {
    fieldInfos: DataConnectorFieldInfo[];
    fieldValues: string[];
}
export interface DataConnectorFieldInfo {
    isQuoted: boolean;
}

// List Entries Settings
export interface ListEntriesSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}

// Connection Entry
export interface ListEntryConfig {
    childCount?: number;
    folderPath: string;
    encodingId?: string;
    extension?: string;
    handle?: DPAFileSystemFileHandle; // TODO: Remove reference to 'FileSystemFileHandle' otherwise 'datapos-connector-node-browser' does not compile.
    id: string;
    label: string;
    lastModifiedAt?: number;
    mimeType?: string;
    name: string;
    // params?: Record<string, unknown>; // TODO: What is this used for?
    // paramsString?: string; // TODO: What is this used for?
    size?: number;
    typeId: ListEntryTypeId;
}

export type ListEntryParsedValue = bigint | boolean | number | string | null;
export interface Preview {
    data: ListEntryParsedValue[][] | Uint8Array;
    typeId: PreviewTypeId;
}
export interface ListEntriesResponse {
    error?: unknown;
    result?: ListEntriesResult;
}
export interface ListEntriesResult {
    cursor: string | number | undefined;
    listEntryConfigs: ListEntryConfig[];
    isMore: boolean;
    totalCount: number;
}

export enum PreviewTypeId {
    Table = 'table',
    Uint8Array = 'uint8Array'
}
export enum ListEntryTypeId {
    File = 'file',
    Folder = 'folder'
}

export interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}

export interface WriteInterface {
    connector: DataConnector;
}
export interface WriteInterfaceSettings {
    chunk(records: DataConnectorRecord[]): void;
    chunkSize?: number;
    complete(fileInfo: DataConnectorFileInfo): void;
}
