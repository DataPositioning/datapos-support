/**
 * @file datapos-engine-support/src/nodeConnector.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine
import { ConnectionConfig } from '../connection';
import type { Connector, ConnectorConfig } from './';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Node Connector
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// interface NodeConnectorConstructor {
//     new (connectionConfig: ConnectionConfig): NodeConnector;
// }

export interface NodeConnector extends Connector {
    abortController?: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;
    readonly id: string;
    readonly version: string;

    // Node Item(s) - Delete List & Upsert
    deleteNodeItem(nodeItemTypeId: NodeItemTypeId, id: string): Promise<void>;
    getNodeItem(nodeItemTypeId: NodeItemTypeId, id: string): Promise<NodeItem>;
    listNodeItems(nodeItemTypeId?: NodeItemTypeId): Promise<NodeItem[]>;
    upsertNodeItem(nodeItemTypeId: NodeItemTypeId, nodeItem: NodeItem | Partial<NodeItem>, id?: string): Promise<NodeItem>;

    // Node Item Properties - Get & Upsert
    getNodeItemProperties(nodeItemTypeId: NodeItemTypeId, id: string): Promise<NodeItemProperties>;
    upsertNodeItemProperties(nodeItemTypeId: NodeItemTypeId, properties: NodeItemProperties, id?: string | Partial<NodeItemProperties>): Promise<NodeItemProperties>;

    // Node Item Data - Clear, Count, Determine, Insert & Retrieve
    clearNodeItemData(nodeItemTypeId: NodeItemTypeId, collection: unknown): Promise<void>;
    countNodeItemData(nodeItemTypeId: NodeItemTypeId, collection: unknown): Promise<number>;
    determineNodeItemData(nodeItemTypeId: NodeItemTypeId, id: string, nodeDataTypeId: NodeDataTypeId, isToBeCleared: boolean): Promise<unknown>;
    insertNodeItemData(nodeItemTypeId: NodeItemTypeId, collection: unknown, data: Record<string, unknown>[]): Promise<void>;
    retrieveNodeItemData(
        nodeItemTypeId: NodeItemTypeId,
        collection: unknown,
        lineCount?: number,
        startRow?: number,
        query?: NodeQuery,
        before?: number,
        after?: number
    ): Promise<NodeItemDataPage>;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Node Connector - Item
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface NodeItem {
    placeholder?: string;
}

export type NodeItemProperties = Record<string, unknown>;

export interface NodeItemDataPage {
    after?: number;
    before?: number;
    data: Record<string, unknown>[];
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Node Connector - Query
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface NodeQuery {
    select: NodeQuerySelect;
}

interface NodeQuerySelect {
    columns: NodeQueryColumn[];
}

interface NodeQueryColumn {
    expression: NodeQueryExpression;
}

export interface NodeQueryExpression {
    expressions: NodeQueryExpressionItem[];
    type: string;
}

export interface NodeQueryExpressionItem {
    placeholder?: string;
}

export interface NodeQueryExpressionValue {
    dataItemName: string;
    type: string;
    value: boolean | number | string | null | unknown;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Node Connector - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export enum NodeDataTypeId {
    Data = 'data',
    Events = 'events',
    Facts = 'facts'
}

export enum NodeItemTypeId {
    Dimension = 'dimension',
    Entity = 'entity',
    EventQuery = 'eventQuery',
    SourceView = 'sourceView',
    Workbook = 'workbook'
}
