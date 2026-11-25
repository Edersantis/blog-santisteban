export const SITE_TITLE = 'Blog de Eder Santisteban';
export const SITE_DESCRIPTION =
	'Blog de Eder Santisteban sobre inteligencia artificial aplicada a los negocios: estrategia, implementación, casos de uso y Radar IA, sin hype y con resultados.';

/** Título del inicio en buscadores. */
export const HOME_TITLE = 'Blog de Eder Santisteban · IA, estrategia y negocio';
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

export const X_URL = 'https://x.com/EderSantis';
export const X_HANDLE = '@EderSantis';

/**
 * Datos del autor para los datos estructurados (schema.org), llms.txt y la ficha del autor.
 * Solo información confirmada por Eder.
 */
export const AUTHOR_PROFILE = {
	name: 'Eder Santisteban',
	url: 'https://santisteban.co/sobre-mi/',
	id: 'https://santisteban.co/sobre-mi/#person',
	jobTitle: 'Consultor estratégico de inteligencia artificial y speaker',
	description:
		'Consultor estratégico de IA y speaker colombiano radicado en Guatemala. Investigador y divulgador de inteligencia artificial, educación y tecnología, con más de 15 años en marketing digital y transformación. Ha asesorado a más de 100 empresas. Fundador de MaIA Escuela Superior en Inteligencia Artificial, CEO de Makers Growth Partners, host del podcast MasterIA Live y catedrático en varias universidades.',
	shortBio:
		'Consultor estratégico de IA y speaker. Fundador de MaIA Escuela Superior en Inteligencia Artificial y CEO de Makers Growth Partners. Más de 15 años en marketing digital y transformación, y más de 100 empresas asesoradas.',
	knowsAbout: ['Inteligencia artificial', 'Estrategia de IA', 'Transformación digital', 'Marketing digital', 'Educación en IA'],
	organizations: [
		{ type: 'EducationalOrganization', name: 'MaIA Escuela Superior en Inteligencia Artificial', url: 'https://maia.school' },
		{ type: 'Organization', name: 'Makers Growth Partners' },
	],
	sameAs: [
		'https://santisteban.co',
		'https://www.linkedin.com/in/edersantis/',
		'https://x.com/EderSantis',
		'https://www.youtube.com/@EDERSANTISTEBAN',
	],
} as const;

export const EDITORIAL_TOPICS = ['IA aplicada', 'Estrategia y operaciones', 'Marketing y medición'] as const;
