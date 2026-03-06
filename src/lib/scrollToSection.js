/**
 * Scroll to a section by ID with smooth behavior
 * @param {string} sectionId - The ID of the section to scroll to
 */
export function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
