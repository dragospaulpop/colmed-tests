// Import screenshots
import appointmentsScreenshot from '../assets/screenshots/appointments-main.svg';
import ticketsScreenshot from '../assets/screenshots/tickets-main.svg';
import structureScreenshot from '../assets/screenshots/structure-main.svg';
import monitoringScreenshot from '../assets/screenshots/monitoring-main.svg';
import whatsappScreenshot from '../assets/screenshots/whatsapp-main.svg';
import patientAppScreenshot from '../assets/screenshots/patient-app-main.svg';

// Demo data for the demonstrations section
export interface DemoItem {
  id: string;
  title: string;
  description: string;
  screenshot: string;
  thumbnail: string;
  features: string[];
  category: 'core' | 'special';
}

export const DEMO_DATA: DemoItem[] = [
  {
    id: 'appointments',
    title: 'Programări Medicale',
    description: 'Sistemul Colmed de gestionare a programărilor oferă o interfață intuitivă cu calendar interactiv, notificări automate și sincronizare în timp real pentru o experiență optimă.',
    screenshot: appointmentsScreenshot,
    thumbnail: appointmentsScreenshot,
    features: [
      'Calendar interactiv cu vizualizare zilnică, săptămânală și lunară pentru o planificare eficientă',
      'Programări automate cu confirmări prin SMS și email pentru reducerea no-show-urilor',
      'Gestionarea inteligentă a listelor de așteptare și reprogramări cu notificări automate',
      'Sincronizare în timp real între toate dispozitivele pentru acces permanent la informații'
    ],
    category: 'core'
  },
  {
    id: 'tickets',
    title: 'Modul Tickete',
    description: 'Platforma Colmed include un sistem avansat de ticketing pentru gestionarea eficientă a solicitărilor, problemelor și comunicării interne cu urmărire completă.',
    screenshot: ticketsScreenshot,
    thumbnail: ticketsScreenshot,
    features: [
      'Creare și atribuire automată de tickete cu categorii personalizabile și workflow-uri definite',
      'Sistem inteligent de prioritizare și escaladare bazat pe urgență și impact',
      'Urmărirea statusului în timp real cu notificări automate pentru toate părțile implicate',
      'Istoric complet al comunicărilor cu audit trail pentru transparență maximă'
    ],
    category: 'core'
  },
  {
    id: 'structure',
    title: 'Gestionare Structură',
    description: 'Modulul Colmed de gestionare structură permite administrarea completă a clinicilor, specialităților, serviciilor medicale și organizarea ierarhică flexibilă a întregii instituții.',
    screenshot: structureScreenshot,
    thumbnail: structureScreenshot,
    features: [
      'Organizarea ierarhică flexibilă a clinicilor, departamentelor și cabinetelor cu relații complexe',
      'Gestionarea completă a specialităților medicale și serviciilor cu configurări personalizate',
      'Configurarea dinamică a tarifelor, pachetelor de servicii și politicilor de preț',
      'Rapoarte detaliate și analize pe structuri organizaționale cu metrici de performanță'
    ],
    category: 'core'
  },
  {
    id: 'monitoring',
    title: 'Sistem Monitorizare',
    description: 'Sistemul avansat de monitorizare Colmed oferă vizibilitate completă asupra traficului, cozilor de așteptare și performanțelor în timp real cu alerte inteligente și analize predictive.',
    screenshot: monitoringScreenshot,
    thumbnail: monitoringScreenshot,
    features: [
      'Dashboard interactiv în timp real cu metrici cheie și indicatori de performanță vizuali',
      'Monitorizarea avansată a cozilor de așteptare, timpilor de servire și fluxurilor de pacienți',
      'Sistem inteligent de alerte automate pentru situații critice cu notificări personalizate',
      'Analize predictive și machine learning pentru optimizarea resurselor și planificarea capacității'
    ],
    category: 'special'
  },
  {
    id: 'whatsapp',
    title: 'Modul WhatsApp',
    description: 'Asistentul virtual inteligent Colmed integrat cu WhatsApp revoluționează comunicarea cu pacienții prin automatizarea programărilor și oferirea de suport 24/7.',
    screenshot: whatsappScreenshot,
    thumbnail: whatsappScreenshot,
    features: [
      'Programări automate prin conversații naturale WhatsApp cu confirmări instantanee',
      'Notificări și reminder-uri personalizate cu timing optim pentru fiecare pacient',
      'Răspunsuri inteligente bazate pe AI la întrebări frecvente și suport tehnic',
      'Integrare seamless cu sistemul Colmed pentru sincronizare completă a datelor'
    ],
    category: 'special'
  },
  {
    id: 'patient-app',
    title: 'Aplicația Pacient',
    description: 'Aplicația mobilă Colmed pentru pacienți oferă o experiență digitală completă cu programări online, acces la rezultate medicale și comunicare directă cu echipa medicală.',
    screenshot: patientAppScreenshot,
    thumbnail: patientAppScreenshot,
    features: [
      'Programări online intuitive și rapide cu calendar în timp real și confirmare instantanee',
      'Acces securizat la rezultate medicale, analize și istoric complet cu vizualizare optimizată',
      'Notificări push inteligente pentru programări, rezultate și reminder-uri personalizate',
      'Chat direct criptat cu echipa medicală pentru consultații și întrebări urgente'
    ],
    category: 'special'
  }
];

// Demo categories for tab navigation
export const DEMO_CATEGORIES = [
  {
    id: 'all',
    label: 'Toate Modulele',
    description: 'Vizualizează toate funcționalitățile disponibile'
  },
  {
    id: 'core',
    label: 'Module Principale',
    description: 'Funcționalitățile de bază ale platformei'
  },
  {
    id: 'special',
    label: 'Module Speciale',
    description: 'Funcționalități avansate și inovatoare'
  }
] as const;