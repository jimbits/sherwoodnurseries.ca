/**
 * business.ts — name, address and contact details, kept in one place so the
 * hero cards, dialogs and (later) JSON-LD all match the Google Business Profile.
 */

export const business = {
  name: "Sherwood Nurseries",
  street: "22040 Township Rd 522",
  locality: "Sherwood Park",
  region: "AB",
  phone: "587-545-6929",
  phoneHref: "tel:+15875456929",
  email: "info@sherwoodnurseries.ca",
} as const;

/** "22040 Township Rd 522, Sherwood Park, AB" */
export const fullAddress = `${business.street}, ${business.locality}, ${business.region}`;

const destination = encodeURIComponent(fullAddress);
export const mapsLinks = {
  google: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
  apple: `https://maps.apple.com/?daddr=${destination}`,
};
