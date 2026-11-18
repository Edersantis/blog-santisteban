export const SITE_TITLE = 'Eder Santisteban';
export const SITE_DESCRIPTION =
	'Blog personal sobre inteligencia artificial, tecnología y enseñanza.';
export const AUTHOR = 'Eder Santisteban';

/** Open Graph locale. Cambiar si se prefiere otro territorio. */
export const OG_LOCALE = 'es_GT';

/** Imagen social por defecto, en `public/`. */
export const DEFAULT_OG_IMAGE = '/og-default.png';

export const SOCIAL_LINKS = [
	{ label: 'Sitio', href: 'https://santisteban.co' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/edersantis' },
	{ label: 'YouTube', href: 'https://www.youtube.com/@EDERSANTISTEBAN' },
	{ label: 'GitHub', href: 'https://github.com/Edersantis' },
] as const;

/**
 * Usuario de X todavía sin confirmar. Si se rellena, el enlace aparece en el pie.
 * Ejemplo: 'https://x.com/usuario'
 */
export const X_URL = '';
