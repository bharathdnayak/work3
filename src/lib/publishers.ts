/**
 * Data access helpers for publisher records.
 *
 * These queries keep the app-facing `Publisher` type separate from the raw
 * Drizzle row shape so Astro pages can consume a stable, typed model.
 */
import { asc } from 'drizzle-orm';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';
import type { Database } from './db';

/** Selects only the fields required by the app's publisher model. */
const publisherSelection = {
    id: publishers.id,
    name: publishers.name,
};

type PublisherSelectionRow = {
    id: number;
    name: string;
}

/** Maps a raw publisher row into the application-facing publisher type. */
function mapPublisher(row: PublisherSelectionRow): Publisher {
    return {
        id: row.id,
        name: row.name,
    };
}

/** Returns every publisher ordered alphabetically by name. */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select(publisherSelection)
        .from(publishers)
        .orderBy(asc(publishers.name));
    return rows.map(mapPublisher);
}
