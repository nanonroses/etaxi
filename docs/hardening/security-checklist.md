# CHECKLIST DE SEGURIDAD — ETAXI

**Fecha**: 2025-11-16
**Versión**: 1.0

---

## 1. AUTENTICACIÓN Y AUTORIZACIÓN

### NextAuth (Admin/Backoffice)

- [ ] **JWT secret configurado** en `.env` (no usar default)
- [ ] **NEXTAUTH_SECRET** único y seguro (mínimo 32 caracteres)
- [ ] **Passwords hasheados** con bcrypt (10+ rounds)
- [ ] **Session expiration** configurado (default: 30 días → reducir a 7 días)
- [ ] **HTTPS obligatorio** en producción
- [ ] **Verificación de roles** en todos los endpoints admin/operator

### JWT Driver Authentication

- [🔴] **DRIVER_JWT_SECRET obligatorio** - eliminar fallback inseguro (`lib/driver-auth.ts:14`)
- [ ] **JWT expiration** configurado (actual: 7 días → OK)
- [ ] **Token revocation** implementado (recomendado)
- [ ] **Refresh tokens** (opcional, mejora UX)

---

## 2. ENDPOINTS API

### Protección de rutas

- [ ] **Todos los endpoints protegidos** tienen middleware de auth
- [ ] **Endpoints públicos** validados:
  - `/api/ride-requests` ✅ (público)
  - `/api/company-leads` ✅ (público)
  - `/api/driver-leads` ✅ (público)
  - `/api/driver/login` ✅ (público)
- [⚠️] **Endpoints de exportación** verificar autenticación:
  - `/api/admin/ride-requests/export`
  - `/api/admin/drivers/export`
  - `/api/admin/companies/export`

### Rate Limiting

- [🔴] **Implementar rate limiting** en endpoints públicos:
  - `/api/ride-requests` → 10 req/min por IP
  - `/api/company-leads` → 5 req/min por IP
  - `/api/driver-leads` → 5 req/min por IP
  - `/api/driver/login` → 5 intentos/15min por IP

### Validación de Inputs

- [⚠️] **Migrar a Zod** para validaciones (recomendado)
- [ ] **Validar query params** en GET requests
- [ ] **Validar todos los campos requeridos**
- [ ] **Sanitizar inputs** (`.trim()` implementado)
- [ ] **Limitar tamaño de strings** (implementado)

---

## 3. BASE DE DATOS

### Prisma ORM

- [✅] **Uso de Prisma** (previene SQL injection)
- [❌] **NUNCA usar** `prisma.$executeRaw` con input de usuario sin sanitizar
- [✅] **Transacciones** implementadas donde corresponde
- [ ] **Índices optimizados** (revisar performance)

### Datos Sensibles

- [✅] **Passwords hasheados** (bcrypt)
- [✅] **Passwords nunca en respuestas** API
- [ ] **Encriptación de datos PII** (opcional, futuro)
- [ ] **Soft-delete** en lugar de hard-delete (recomendado)

---

## 4. CORS Y HEADERS

### CORS

- [🔴] **Configurar CORS explícitamente** en `next.config.js`
- [ ] **Allowed origins** definidos (no usar `*` en producción)

### Security Headers

- [ ] **Content-Security-Policy** configurado
- [ ] **X-Frame-Options: DENY**
- [ ] **X-Content-Type-Options: nosniff**
- [ ] **Referrer-Policy: no-referrer**
- [ ] **Permissions-Policy** configurado

**Ejemplo** `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'no-referrer' },
      ],
    },
  ];
}
```

---

## 5. VARIABLES DE ENTORNO

### Secrets requeridos

- [ ] **DATABASE_URL** (PostgreSQL connection string)
- [ ] **NEXTAUTH_SECRET** (min 32 chars)
- [ ] **NEXTAUTH_URL** (https://etaxi.cl en producción)
- [🔴] **DRIVER_JWT_SECRET** (obligatorio, eliminar fallback)
- [ ] **JWT_SECRET** (si se usa diferente de NEXTAUTH_SECRET)

### Archivos

- [✅] **`.env.local`** en `.gitignore`
- [✅] **`.env.local.example`** con template
- [ ] **Secrets en Vercel** configurados
- [ ] **No commitear** `.env` con valores reales

---

## 6. LOGGING Y MONITOREO

### Logs seguros

- [⚠️] **Sanitizar logs** - no logear passwords, tokens, PII
- [ ] **Structured logging** (recomendado: Winston, Pino)
- [ ] **Log levels** apropiados (error, warn, info, debug)
- [ ] **Monitoreo de errores** (recomendado: Sentry)

### Audit Log

- [✅] **AuditLog implementado** para acciones críticas
- [ ] **Extender a todos los endpoints** críticos
- [ ] **Logs inmutables** (no editar/eliminar)

---

## 7. MANEJO DE ERRORES

### Mensajes de error

- [⚠️] **No revelar detalles internos** al cliente
- [✅] **Errores genéricos** en producción
- [✅] **Logs detallados** en servidor
- [ ] **Códigos HTTP correctos**:
  - 400: Bad Request
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
  - 422: Unprocessable Entity
  - 500: Internal Server Error

### Stack traces

- [❌] **NUNCA devolver stack traces** en producción
- [ ] **Solo en desarrollo** (`NODE_ENV=development`)

---

## 8. DEPENDENCIAS

### Actualizaciones

- [ ] **Dependencias actualizadas** regularmente
- [ ] **Vulnerabilidades conocidas** resueltas
- [ ] **npm audit** ejecutado sin HIGH/CRITICAL

**Comando**:
```bash
npm audit
npm audit fix
```

### Dependencias no usadas

- [⚠️] **Eliminar dependencias** no utilizadas (ver HARD-7)

---

## 9. CONFIGURACIÓN DE PRODUCCIÓN

### Next.js

- [ ] **`NODE_ENV=production`**
- [ ] **`npm run build`** exitoso
- [ ] **Error handling** custom (`app/error.tsx`)
- [ ] **404 custom** (`app/not-found.tsx`)

### Vercel (si se usa)

- [ ] **Environment variables** configuradas
- [ ] **Production domain** con HTTPS
- [ ] **Preview deployments** protegidos
- [ ] **Logs** habilitados

---

## 10. COMPLIANCE Y NORMATIVA

### GDPR / Privacidad

- [ ] **Política de privacidad** publicada
- [ ] **Consentimiento** para tracking/cookies
- [ ] **Derecho al olvido** implementado (soft-delete)
- [ ] **Encriptación en tránsito** (HTTPS)

### Normativa local (Chile)

- [ ] **Cumplimiento Ley 19.496** (Protección al Consumidor)
- [ ] **Cumplimiento Ley 19.628** (Protección de datos personales)
- [ ] **Términos y condiciones** claros

---

## 11. CHECKLIST POR ENDPOINT

**Template** para revisar cada endpoint:

```markdown
## Endpoint: POST /api/ejemplo

- [ ] ¿Requiere autenticación? → Middleware implementado
- [ ] ¿Valida todos los inputs? → Zod schema
- [ ] ¿Sanitiza inputs? → .trim(), regex
- [ ] ¿Limita tamaño de datos? → max length
- [ ] ¿Usa Prisma para queries? → ✅
- [ ] ¿Maneja errores correctamente? → try/catch
- [ ] ¿Logs sanitizados? → no passwords/tokens
- [ ] ¿Registra en AuditLog? → si es acción crítica
- [ ] ¿Rate limiting? → si es público
- [ ] ¿Códigos HTTP correctos? → 400, 401, 500
```

---

## 12. TESTING DE SEGURIDAD

### Tests automáticos

- [ ] **SQL injection** → usar Prisma (protegido)
- [ ] **XSS** → sanitizar outputs (React escapa por default)
- [ ] **CSRF** → NextAuth tiene protección
- [ ] **Rate limiting** → tests de carga

### Tests manuales

- [ ] **Intentar acceder** a endpoints protegidos sin token
- [ ] **Intentar inyecciones** en formularios
- [ ] **Intentar bypass** de validaciones
- [ ] **Intentar acceso** con roles incorrectos

---

## 13. INCIDENTES Y RESPUESTA

### Plan de respuesta

- [ ] **Contacto de seguridad** definido
- [ ] **Proceso de reporte** de vulnerabilidades
- [ ] **Plan de rollback** en caso de breach
- [ ] **Backup de BD** automatizado

### Monitoreo

- [ ] **Alertas** de intentos fallidos de login
- [ ] **Alertas** de rate limiting excedido
- [ ] **Alertas** de errores 500
- [ ] **Dashboard** de métricas de seguridad

---

## RESUMEN DE PRIORIDADES

### 🔴 CRÍTICO (Implementar ANTES de producción)

1. Eliminar fallback de DRIVER_JWT_SECRET
2. Verificar autenticación en endpoints de exportación
3. Implementar rate limiting en endpoints públicos
4. Configurar CORS explícitamente
5. Configurar security headers

### ⚠️ ALTO (Implementar pronto)

6. Migrar validaciones a Zod
7. Sanitizar logs (no passwords/tokens)
8. Implementar monitoreo de errores (Sentry)
9. Agregar audit log a todos los endpoints críticos
10. Configurar backup automático de BD

### 🔵 MEDIO (Mejora continua)

11. Implementar refresh tokens
12. Agregar MFA para admin
13. Encriptación de datos PII
14. Soft-delete en lugar de hard-delete

---

**Fin del documento**
