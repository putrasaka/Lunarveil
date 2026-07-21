export const SECRET_ADMIN_PATH = '/portal-internal-vault-99x';

export const getAdminUrl = () => {
  const serverUrl = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:3001`;
  return `${serverUrl}${SECRET_ADMIN_PATH}`;
};
