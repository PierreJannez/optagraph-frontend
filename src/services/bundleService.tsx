import axios from 'axios';
import { Bundle } from '../types/Bundle'; // Import the shared interface

/**
 * Fetch all bundles for a specific client from the API.
 * @param clientId The ID of the client
 * @returns A promise resolving to an array of Bundles
 */
export const fetchBundles = async (clientId: number): Promise<Bundle[]> => {
    try {
        const response = await axios.get(`/api/clients/${clientId}/bundles`);
        return response.data.bundles || [];
    } catch (error) {
        console.error(`Erreur lors de la récupération des bundles pour le client ${clientId}:`, error);
        return [];
    }
};

/**
 * Update a bundle.
 * @param bundle The bundle to update
 * @returns A promise resolving to the updated bundle
 */
export const updateBundle = async (bundle: Bundle): Promise<Bundle> => {
    try {
        const response = await axios.put(`/api/bundles/update/${bundle.id}`, bundle);
        return response.data.bundle;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du bundle ${bundle.id}:`, error);
        throw error;
    }
};

/**
 * Create a new bundle.
 * @param bundle The bundle to create
 * @returns A promise resolving to the created bundle
 */
export const createBundle = async (bundle: Omit<Bundle, "id">): Promise<Bundle> => {
    try {
        const response = await axios.post(`/api/bundles`, bundle);
        return response.data.bundle;
    } catch (error) {
        console.error("Erreur lors de la création du bundle:", error);
        throw error;
    }
};
