export interface OnboardingStep {
  id: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
}

export interface OnboardingPhase {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
  steps: OnboardingStep[];
}

export const onboardingPhases: OnboardingPhase[] = [
  {
    id: 'descarga',
    titleKey: 'phases.descarga.title',
    descriptionKey: 'phases.descarga.description',
    icon: 'Download',
    color: '#dd1828',
    steps: [
      {
        id: 'step-01',
        image: '/images/onboarding/conductor/01_google_play_busqueda_etaxi.webp',
        titleKey: 'steps.01.title',
        descriptionKey: 'steps.01.description',
      },
    ],
  },
  {
    id: 'acceso',
    titleKey: 'phases.acceso.title',
    descriptionKey: 'phases.acceso.description',
    icon: 'LogIn',
    color: '#182b33',
    steps: [
      {
        id: 'step-02',
        image: '/images/onboarding/conductor/02_app_pantalla_bienvenida.webp',
        titleKey: 'steps.02.title',
        descriptionKey: 'steps.02.description',
      },
      {
        id: 'step-03',
        image: '/images/onboarding/conductor/03_login_formulario_vacio.webp',
        titleKey: 'steps.03.title',
        descriptionKey: 'steps.03.description',
      },
      {
        id: 'step-04',
        image: '/images/onboarding/conductor/04_login_credenciales_ingresadas.webp',
        titleKey: 'steps.04.title',
        descriptionKey: 'steps.04.description',
      },
    ],
  },
  {
    id: 'configuracion',
    titleKey: 'phases.configuracion.title',
    descriptionKey: 'phases.configuracion.description',
    icon: 'Settings',
    color: '#fff500',
    steps: [
      {
        id: 'step-05',
        image: '/images/onboarding/conductor/05_seleccion_modo_trabajo_vista.webp',
        titleKey: 'steps.05.title',
        descriptionKey: 'steps.05.description',
      },
      {
        id: 'step-06',
        image: '/images/onboarding/conductor/06_seleccion_vehiculo.webp',
        titleKey: 'steps.06.title',
        descriptionKey: 'steps.06.description',
      },
      {
        id: 'step-07',
        image: '/images/onboarding/conductor/07_dialogo_activar_biometria.webp',
        titleKey: 'steps.07.title',
        descriptionKey: 'steps.07.description',
      },
    ],
  },
  {
    id: 'permisos',
    titleKey: 'phases.permisos.title',
    descriptionKey: 'phases.permisos.description',
    icon: 'ShieldCheck',
    color: '#596065',
    steps: [
      {
        id: 'step-08',
        image: '/images/onboarding/conductor/08_aviso_permisos_requeridos.webp',
        titleKey: 'steps.08.title',
        descriptionKey: 'steps.08.description',
      },
      {
        id: 'step-09',
        image: '/images/onboarding/conductor/09_permiso_camara_fotos_video.webp',
        titleKey: 'steps.09.title',
        descriptionKey: 'steps.09.description',
      },
      {
        id: 'step-10',
        image: '/images/onboarding/conductor/10_permiso_grabar_audio.webp',
        titleKey: 'steps.10.title',
        descriptionKey: 'steps.10.description',
      },
      {
        id: 'step-11',
        image: '/images/onboarding/conductor/11_permiso_notificaciones.webp',
        titleKey: 'steps.11.title',
        descriptionKey: 'steps.11.description',
      },
      {
        id: 'step-12',
        image: '/images/onboarding/conductor/12_permiso_llamadas_telefonicas.webp',
        titleKey: 'steps.12.title',
        descriptionKey: 'steps.12.description',
      },
      {
        id: 'step-13',
        image: '/images/onboarding/conductor/13_permiso_archivos_audio.webp',
        titleKey: 'steps.13.title',
        descriptionKey: 'steps.13.description',
      },
      {
        id: 'step-14',
        image: '/images/onboarding/conductor/14_aviso_permiso_ubicacion.webp',
        titleKey: 'steps.14.title',
        descriptionKey: 'steps.14.description',
      },
      {
        id: 'step-15',
        image: '/images/onboarding/conductor/15_permiso_ubicacion_opciones.webp',
        titleKey: 'steps.15.title',
        descriptionKey: 'steps.15.description',
      },
      {
        id: 'step-16',
        image: '/images/onboarding/conductor/16_permisos_ubicacion_segundo_plano.webp',
        titleKey: 'steps.16.title',
        descriptionKey: 'steps.16.description',
      },
      {
        id: 'step-17',
        image: '/images/onboarding/conductor/17_ajustes_info_aplicacion.webp',
        titleKey: 'steps.17.title',
        descriptionKey: 'steps.17.description',
      },
      {
        id: 'step-18',
        image: '/images/onboarding/conductor/18_permiso_ubicacion_permitir_siempre.webp',
        titleKey: 'steps.18.title',
        descriptionKey: 'steps.18.description',
      },
      {
        id: 'step-19',
        image: '/images/onboarding/conductor/19_ajustes_info_app_permisos.webp',
        titleKey: 'steps.19.title',
        descriptionKey: 'steps.19.description',
      },
      {
        id: 'step-20',
        image: '/images/onboarding/conductor/20_otros_permisos_configuracion.webp',
        titleKey: 'steps.20.title',
        descriptionKey: 'steps.20.description',
      },
      {
        id: 'step-21',
        image: '/images/onboarding/conductor/21_permiso_accesos_directos.webp',
        titleKey: 'steps.21.title',
        descriptionKey: 'steps.21.description',
      },
      {
        id: 'step-22',
        image: '/images/onboarding/conductor/22_pantalla_principal_aviso_permisos.webp',
        titleKey: 'steps.22.title',
        descriptionKey: 'steps.22.description',
      },
      {
        id: 'step-23',
        image: '/images/onboarding/conductor/23_ajustes_bateria_sin_restricciones.webp',
        titleKey: 'steps.23.title',
        descriptionKey: 'steps.23.description',
      },
      {
        id: 'step-24',
        image: '/images/onboarding/conductor/24_ajustes_acceso_modos.webp',
        titleKey: 'steps.24.title',
        descriptionKey: 'steps.24.description',
      },
      {
        id: 'step-25',
        image: '/images/onboarding/conductor/25_permiso_acceso_modos_dialogo.webp',
        titleKey: 'steps.25.title',
        descriptionKey: 'steps.25.description',
      },
    ],
  },
  {
    id: 'funciones',
    titleKey: 'phases.funciones.title',
    descriptionKey: 'phases.funciones.description',
    icon: 'Smartphone',
    color: '#dd1828',
    steps: [
      {
        id: 'step-26',
        image: '/images/onboarding/conductor/26_pantalla_principal_estado_ocupado.webp',
        titleKey: 'steps.26.title',
        descriptionKey: 'steps.26.description',
      },
      {
        id: 'step-27',
        image: '/images/onboarding/conductor/27_pantalla_principal_estado_libre.webp',
        titleKey: 'steps.27.title',
        descriptionKey: 'steps.27.description',
      },
      {
        id: 'step-28',
        image: '/images/onboarding/conductor/28_bandeja_mensajes.webp',
        titleKey: 'steps.28.title',
        descriptionKey: 'steps.28.description',
      },
      {
        id: 'step-29',
        image: '/images/onboarding/conductor/29_servicios_programados.webp',
        titleKey: 'steps.29.title',
        descriptionKey: 'steps.29.description',
      },
      {
        id: 'step-30',
        image: '/images/onboarding/conductor/30_listado_servicios_recaudacion.webp',
        titleKey: 'steps.30.title',
        descriptionKey: 'steps.30.description',
      },
      {
        id: 'step-31',
        image: '/images/onboarding/conductor/31_menu_lateral_perfil.webp',
        titleKey: 'steps.31.title',
        descriptionKey: 'steps.31.description',
      },
      {
        id: 'step-32',
        image: '/images/onboarding/conductor/32_vista_mapa_santiago.webp',
        titleKey: 'steps.32.title',
        descriptionKey: 'steps.32.description',
      },
      {
        id: 'step-33',
        image: '/images/onboarding/conductor/33_preferencias_generales.webp',
        titleKey: 'steps.33.title',
        descriptionKey: 'steps.33.description',
      },
      {
        id: 'step-34',
        image: '/images/onboarding/conductor/34_seccion_referidos.webp',
        titleKey: 'steps.34.title',
        descriptionKey: 'steps.34.description',
      },
      {
        id: 'step-35',
        image: '/images/onboarding/conductor/35_formulario_reporte_incidencia.webp',
        titleKey: 'steps.35.title',
        descriptionKey: 'steps.35.description',
      },
      {
        id: 'step-36',
        image: '/images/onboarding/conductor/36_menu_solucion_gps.webp',
        titleKey: 'steps.36.title',
        descriptionKey: 'steps.36.description',
      },
      {
        id: 'step-37',
        image: '/images/onboarding/conductor/37_ayuda_solucion_problemas_gps.webp',
        titleKey: 'steps.37.title',
        descriptionKey: 'steps.37.description',
      },
    ],
  },
];
