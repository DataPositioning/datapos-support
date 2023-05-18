/**
 * @file datapos-engine-support/src/connectionEntry.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Engine Dependencies
import type { DPAFileSystemFileHandle } from '.';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection Entry
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ConnectionEntry {
    childEntryCount?: number;
    folderPath?: string;
    encodingId?: string;
    extension?: string;
    handle?: DPAFileSystemFileHandle; // TODO: Remove reference to 'FileSystemFileHandle' otherwise 'datapos-connector-node-browser' does not compile.
    id?: string;
    label?: string;
    lastModifiedAt?: number;
    mimeType?: string;
    name?: string;
    params?: Record<string, unknown>;
    paramsString?: string;
    referenceId?: string;
    size?: number;
    typeId?: ConnectionEntryTypeId;
}

export interface ConnectionEntryPreview {
    data: ParsedValue[][] | Uint8Array;
    fields: PreviewField[];
    typeId: ConnectionEntryPreviewTypeId;
}

export type ParsedValue = boolean | number | string | null;

export interface PreviewField {
    dataTypeId?: DataTypeId;
    id?: string;
    label?: string;
    previewValues?: PreviewValue[];
}

interface PreviewValue {
    id: string;
    label: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection - Retrieve Entries
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ConnectionEntriesPage {
    cursor: string | number | undefined;
    entries: ConnectionEntry[];
    isMore: boolean;
    totalCount: number;
}

export interface ConnectionEntriesRetrievalProperties {
    limit: number;
    offset: number;
    totalCount?: number;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection Entry - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export enum ConnectionEntryPreviewTypeId {
    JSON = 'json',
    Table = 'table',
    Uint8Array = 'uint8Array'
}

export enum ConnectionEntryTypeId {
    File = 'file',
    Folder = 'folder'
}

export enum DataFormatId {
    DelimitedText = 'dtv',
    EntityEvent = 'e/e',
    JSON = 'json',
    SPSS = 'spss',
    Table = 'table',
    XLS = 'xls',
    XLSX = 'xlsx',
    XML = 'xml'
}

export enum DataTypeId {
    Binary = 'binary',
    Boolean = 'boolean',
    Date = 'date',
    DateTime = 'dateTime',
    DateTimeOffset = 'dateTimeOffset',
    DecimalNumber = 'decimalNumber',
    Object = 'object',
    String = 'string',
    Time = 'time',
    Unknown = 'unknown',
    WholeNumber = 'wholeNumber'
}

export enum ValueDelimiterId {
    Colon = ':',
    Comma = ',',
    ExclamationMark = '!',
    Other = '',
    RecordSeparator = '0x1E',
    Semicolon = ';',
    Space = ' ',
    Tab = '\t',
    Underscore = '_',
    UnitSeparator = '0x1F',
    VerticalBar = '|'
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection Entry - Preview
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection Entry - Audit Content
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection Entry - Parse Text Value
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// MAYBE THIS IS IN CORE?
