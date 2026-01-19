/**
 * API Service - Connect to Backend
 */

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all layouts
export const fetchLayouts = async () => {
    const response = await fetch(`${API_BASE_URL}/layouts`);
    if (!response.ok) throw new Error('Failed to fetch layouts');
    return response.json();
};

// Fetch all color palettes
export const fetchColors = async () => {
    const response = await fetch(`${API_BASE_URL}/colors`);
    if (!response.ok) throw new Error('Failed to fetch colors');
    return response.json();
};

// Fetch all animations
export const fetchAnimations = async () => {
    const response = await fetch(`${API_BASE_URL}/animations`);
    if (!response.ok) throw new Error('Failed to fetch animations');
    return response.json();
};

// Fetch all components (optionally by variant)
export const fetchComponents = async (variant = null) => {
    const url = variant
        ? `${API_BASE_URL}/components/variant/${variant}`
        : `${API_BASE_URL}/components`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch components');
    return response.json();
};

// Fetch complete builder config
export const fetchBuilderConfig = async () => {
    const response = await fetch(`${API_BASE_URL}/builder/config`);
    if (!response.ok) throw new Error('Failed to fetch builder config');
    return response.json();
};

// Fetch components for a specific section type
export const fetchComponentsBySection = async (sectionType) => {
    const response = await fetch(`${API_BASE_URL}/components/section/${sectionType}`);
    if (!response.ok) throw new Error('Failed to fetch components');
    return response.json();
};
