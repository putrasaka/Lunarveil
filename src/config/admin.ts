export const SECRET_ADMIN_PATH = '/portal-internal-vault-99x';

export const getAdminUrl = () => {
  return `${window.location.protocol}//${window.location.hostname}:3001${SECRET_ADMIN_PATH}`;
};
