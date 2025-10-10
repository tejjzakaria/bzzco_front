/**
 * Consistent spacing and styling utilities for the application
 * Use these constants to ensure consistent padding/margins across all components
 */

// Container padding classes - use these for main section containers
export const CONTAINER_PADDING = 'px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32';

// Alternative container with max-width approach
export const CONTAINER_MAX_WIDTH = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

// Section vertical spacing
export const SECTION_PADDING_Y = 'py-8 sm:py-12 md:py-16';
export const SECTION_PADDING_Y_SMALL = 'py-6 sm:py-8 md:py-10';
export const SECTION_PADDING_Y_LARGE = 'py-12 sm:py-16 md:py-20';

// Common spacing values
export const SPACING = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

// Card padding
export const CARD_PADDING = 'p-4 sm:p-6';
export const CARD_PADDING_LARGE = 'p-6 sm:p-8';

// Common combined classes for sections
export const SECTION_CONTAINER = `${CONTAINER_PADDING} ${SECTION_PADDING_Y}`;
export const SECTION_CONTAINER_SMALL = `${CONTAINER_PADDING} ${SECTION_PADDING_Y_SMALL}`;
export const SECTION_CONTAINER_LARGE = `${CONTAINER_PADDING} ${SECTION_PADDING_Y_LARGE}`;
