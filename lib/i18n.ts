import type { Language } from "./resume-types"

// ============================================================================
// Static label dictionaries. The global language selector swaps between these
// maps. `uiLabels` are for the editor chrome; `resumeLabels` are the section
// headings rendered inside the printable CV.
// ============================================================================

export interface ResumeLabels {
  summary: string
  experience: string
  education: string
  skills: string
  projects: string
  languages: string
  references: string
  publications: string
  present: string
  tech: string
}

export interface UILabels {
  // Toolbar & Global
  profiles: string
  atsSim: string
  sample: string
  export: string
  import: string
  print: string
  privacyFooter: string

  // Profiles Modal
  privacyTitle: string
  privacyDesc: string
  profilesTitle: string
  profilesDesc: string
  profileName: string
  profileNameHint: string
  updateBtn: string
  saveNewBtn: string
  savedProfiles: string
  noProfiles: string
  activeBadge: string
  loadBtn: string
  deleteBtn: string

  // Editor Tabs
  headerTab: string
  summaryTab: string
  experienceTab: string
  educationTab: string
  skillsTab: string
  projectsTab: string
  languagesTab: string
  publicationsTab: string
  referencesTab: string
  themeTab: string

  // Section Cards & Forms Generic
  addLabel: string
  dragToReorder: string
  deleteItem: string
  description: string

  // Header Form
  uploadPhoto: string
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  website: string
  github: string
  linkedin: string

  // Summary Form
  summaryLabel: string
  summaryPlaceholder: string
  summaryHint: string

  // Experience Form
  roleTitle: string
  company: string
  startDate: string
  endDate: string
  currentRole: string
  experienceDescHint: string
  noExperienceHint: string
  addRole: string

  // Education Form
  degree: string
  institution: string
  noEducationHint: string
  addEducation: string

  // Skills & Languages Form
  skillsDesc: string
  category: string
  categoryHint: string
  commaSeparated: string
  commaSeparatedHint: string
  noSkillsHint: string
  addGroup: string

  language: string
  level: string
  levelHint: string
  noLanguagesHint: string
  addLanguage: string

  // Projects Form
  projectName: string
  url: string
  urlHint: string
  techStack: string
  noProjectsHint: string
  addProject: string

  // Publications Form
  title: string
  publisher: string
  date: string
  noPublicationsHint: string
  addPublication: string

  // References Form
  name: string
  relation: string
  contactInfo: string
  noReferencesHint: string
  addReference: string

  // Theme Form
  accentColor: string
  textColor: string
  mutedColor: string
  themeHint: string
}

const resumeLabelMap: Record<Language, ResumeLabels> = {
  en: {
    summary: "Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    languages: "Languages",
    references: "References",
    publications: "Publications",
    present: "Present",
    tech: "Tech",
  },
  es: {
    summary: "Perfil",
    experience: "Experiencia Laboral",
    education: "Educación",
    skills: "Habilidades",
    projects: "Proyectos",
    languages: "Idiomas",
    references: "Referencias",
    publications: "Publicaciones",
    present: "Actualidad",
    tech: "Tecnologías",
  },
}

const uiLabelMap: Record<Language, UILabels> = {
  en: {
    profiles: "Profiles",
    atsSim: "ATS Sim",
    sample: "Sample",
    export: "Export",
    import: "Import",
    print: "Print / PDF",
    privacyFooter: "Privacy First: All CV data is strictly stored in your browser's local storage. Zero server tracking.",

    privacyTitle: "Privacy First — 100% Local Storage",
    privacyDesc: "Your data is completely private. All profiles are saved securely within your browser's local storage. We do not track, collect, or send any information to our servers.",
    profilesTitle: "Profiles",
    profilesDesc: "Save multiple versions of your CV (e.g. Backend, Frontend) in this browser.",
    profileName: "Profile name",
    profileNameHint: "e.g. Backend Engineer",
    updateBtn: "Update current",
    saveNewBtn: "Save as new",
    savedProfiles: "Saved profiles",
    noProfiles: "No saved profiles yet.",
    activeBadge: "active",
    loadBtn: "Load",
    deleteBtn: "Delete",

    headerTab: "Header",
    summaryTab: "Summary",
    experienceTab: "Experience",
    educationTab: "Education",
    skillsTab: "Skills",
    projectsTab: "Projects",
    languagesTab: "Languages",
    publicationsTab: "Publications",
    referencesTab: "References",
    themeTab: "Theme",

    addLabel: "Add item",
    dragToReorder: "Drag to reorder",
    deleteItem: "Delete item",
    description: "Description",

    uploadPhoto: "Upload Photo",
    fullName: "Full name",
    jobTitle: "Job title",
    email: "Email",
    phone: "Phone",
    location: "Location",
    website: "Website",
    github: "GitHub",
    linkedin: "LinkedIn",

    summaryLabel: "Professional summary",
    summaryPlaceholder: "2-4 sentences summarizing your experience, specialties, and impact.",
    summaryHint: "Keep it keyword-rich and plain text — ATS parsers index this heavily.",

    roleTitle: "Role / Title",
    company: "Company",
    startDate: "Start Date",
    endDate: "End Date",
    currentRole: "I currently work here",
    experienceDescHint: "One achievement per line. Each line becomes a bullet point.",
    noExperienceHint: "No roles yet. Add your work history.",
    addRole: "Add role",

    degree: "Degree / Title",
    institution: "Institution",
    noEducationHint: "No education records yet.",
    addEducation: "Add education",

    skillsDesc: "Grouped by category, comma-separated. No progress bars — plain text keeps it ATS-safe.",
    category: "Category",
    categoryHint: "e.g. Languages",
    commaSeparated: "Items (comma-separated)",
    commaSeparatedHint: "Go, TypeScript, Python",
    noSkillsHint: "No skill groups yet.",
    addGroup: "Add group",

    language: "Language",
    level: "Level",
    levelHint: "e.g. Native / C1 / Professional",
    noLanguagesHint: "No languages yet.",
    addLanguage: "Add language",

    projectName: "Project Name",
    url: "URL (optional)",
    urlHint: "https://...",
    techStack: "Tech stack",
    noProjectsHint: "No projects yet.",
    addProject: "Add project",

    title: "Title",
    publisher: "Publisher / Journal",
    date: "Date",
    noPublicationsHint: "No publications yet.",
    addPublication: "Add publication",

    name: "Name",
    relation: "Relation / Title",
    contactInfo: "Contact Info",
    noReferencesHint: "No references yet.",
    addReference: "Add reference",

    accentColor: "Accent (headings)",
    textColor: "Body text",
    mutedColor: "Secondary text",
    themeHint: "Colors are applied via CSS variables on the document. Text stays real, selectable text — never an image — so ATS parsing is unaffected.",
  },
  es: {
    profiles: "Perfiles",
    atsSim: "Simulador ATS",
    sample: "Ejemplo",
    export: "Exportar",
    import: "Importar",
    print: "Imprimir / PDF",
    privacyFooter: "Tu Privacidad, Nuestra Prioridad: Todo se guarda exclusivamente en el almacenamiento local de tu navegador. Cero rastreo.",

    privacyTitle: "Tu Privacidad Primero — 100% Almacenamiento Local",
    privacyDesc: "Tus datos son completamente privados. Todos los perfiles se guardan de forma segura en tu navegador. No rastreamos, recopilamos ni enviamos nada a nuestros servidores.",
    profilesTitle: "Perfiles",
    profilesDesc: "Guarda múltiples versiones de tu CV (ej. Backend, Frontend) en este navegador.",
    profileName: "Nombre del perfil",
    profileNameHint: "ej. Ingeniero Backend",
    updateBtn: "Actualizar actual",
    saveNewBtn: "Guardar nuevo",
    savedProfiles: "Perfiles guardados",
    noProfiles: "Aún no hay perfiles guardados.",
    activeBadge: "activo",
    loadBtn: "Cargar",
    deleteBtn: "Borrar",

    headerTab: "Cabecera",
    summaryTab: "Perfil",
    experienceTab: "Experiencia",
    educationTab: "Educación",
    skillsTab: "Habilidades",
    projectsTab: "Proyectos",
    languagesTab: "Idiomas",
    publicationsTab: "Publicaciones",
    referencesTab: "Referencias",
    themeTab: "Tema",

    addLabel: "Añadir",
    dragToReorder: "Arrastrar para reordenar",
    deleteItem: "Borrar elemento",
    description: "Descripción",

    uploadPhoto: "Subir Foto",
    fullName: "Nombre completo",
    jobTitle: "Título profesional",
    email: "Correo electrónico",
    phone: "Teléfono",
    location: "Ubicación",
    website: "Sitio web",
    github: "GitHub",
    linkedin: "LinkedIn",

    summaryLabel: "Resumen profesional",
    summaryPlaceholder: "2-4 oraciones que resuman tu experiencia, especialidades y el impacto que generas.",
    summaryHint: "Utiliza palabras clave y texto plano — los sistemas ATS lo valoran mucho.",

    roleTitle: "Cargo / Puesto",
    company: "Empresa",
    startDate: "Fecha Inicio",
    endDate: "Fecha Fin",
    currentRole: "Trabajo aquí actualmente",
    experienceDescHint: "Un logro por línea. Cada línea se convertirá en una viñeta.",
    noExperienceHint: "Sin experiencia aún. Añade tu historial.",
    addRole: "Añadir experiencia",

    degree: "Título / Grado",
    institution: "Institución",
    noEducationHint: "Sin registros de educación aún.",
    addEducation: "Añadir educación",

    skillsDesc: "Agrupadas por categoría y separadas por comas. Sin barras de progreso (el texto plano es seguro para ATS).",
    category: "Categoría",
    categoryHint: "ej. Lenguajes de Programación",
    commaSeparated: "Elementos (separados por comas)",
    commaSeparatedHint: "Go, TypeScript, Python",
    noSkillsHint: "No hay habilidades aún.",
    addGroup: "Añadir grupo",

    language: "Idioma",
    level: "Nivel",
    levelHint: "ej. Nativo / B2 / Profesional",
    noLanguagesHint: "No hay idiomas aún.",
    addLanguage: "Añadir idioma",

    projectName: "Nombre del proyecto",
    url: "URL (opcional)",
    urlHint: "https://...",
    techStack: "Tecnologías utilizadas",
    noProjectsHint: "No hay proyectos aún.",
    addProject: "Añadir proyecto",

    title: "Título",
    publisher: "Editorial / Publicación",
    date: "Fecha",
    noPublicationsHint: "No hay publicaciones aún.",
    addPublication: "Añadir publicación",

    name: "Nombre",
    relation: "Relación / Cargo",
    contactInfo: "Datos de contacto",
    noReferencesHint: "No hay referencias aún.",
    addReference: "Añadir referencia",

    accentColor: "Color de acento (Títulos)",
    textColor: "Color de texto (Cuerpo)",
    mutedColor: "Color secundario",
    themeHint: "Los colores se aplican mediante variables CSS. El texto se mantiene real y seleccionable (nunca una imagen), por lo que el análisis ATS no se ve afectado.",
  },
}

export function getResumeLabels(language: Language): ResumeLabels {
  return resumeLabelMap[language]
}

export function getUILabels(language: Language): UILabels {
  return uiLabelMap[language]
}
