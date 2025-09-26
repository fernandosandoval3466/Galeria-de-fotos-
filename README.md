# Tienda Online FSG

Una aplicación híbrida correspondiente a una tienda online desarrollada con Ionic y Angular, integrada con Firebase para autenticación y base de datos en tiempo real.

## 📋 Descripción

Esta aplicación permite a los usuarios navegar por productos, agregar productos al carrito de compras, y gestionar su cuenta personal. Los usuarios autenticados pueden agregar y eliminar sus propios productos. Incluye funcionalidades de búsqueda, carrito de compras, y autenticación con email/contraseña y Google.

## ✨ Características

### Autenticación
- Registro e inicio de sesión con email y contraseña
- Inicio de sesión con Google (web y móvil)
- Restablecimiento de contraseña
- Protección de rutas con AuthGuard
- Persistencia de sesión

### Gestión de Productos
- Visualización de productos desde Firestore
- Agregar productos al carrito
- Búsqueda en tiempo real por nombre de producto
- Agregar nuevos productos (solo usuarios autenticados)
- Eliminar productos propios (solo usuarios autenticados)

### Carrito de Compras
- Agregar/quitar productos
- Calcular total en COP
- Persistencia del carrito
- Botón de compra (placeholder para funcionalidad futura)

### Experiencia de Usuario
- Interfaz responsiva con Ionic
- Mensajes de error y éxito en español
- Estados de carga
- Navegación intuitiva con tabs

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Ionic 8**: Framework para aplicaciones híbridas
- **Angular 20**: Framework principal
- **TypeScript**: Lenguaje de programación
- **RxJS**: Programación reactiva

### Backend y Servicios
- **Firebase Authentication**: Autenticación de usuarios
- **Firestore**: Base de datos NoSQL en tiempo real
- **Firebase Hosting**: Despliegue (opcional)

### Plugins y Librerías
- **@angular/fire**: Integración Angular-Firebase
- **@ionic-native/google-plus**: Login con Google nativo
- **Capacitor**: Puente nativo para móviles

## 📋 Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Ionic CLI: `npm install -g @ionic/cli`
- Cuenta de Firebase con proyecto configurado

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd tienda-online-fsg
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase**
   - Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilitar Authentication (Email/Password y Google)
   - Habilitar Firestore Database
   - Copiar las credenciales al archivo `src/environments/environment.ts`

4. **Configurar Capacitor (para móvil)**
   ```bash
   npx cap add android
   npx cap add ios
   ```

## 📱 Uso

### Desarrollo Web
```bash
ionic serve
```

### Desarrollo Móvil
```bash
ionic capacitor run android
# o
ionic capacitor run ios
```

### Build de Producción
```bash
ionic build --prod
npx cap sync
```

## 📁 Estructura del Proyecto

```
tienda-online-fsg/
├── src/
│   ├── app/
│   │   ├── app-routing.module.ts      # Configuración de rutas principales
│   │   ├── app.component.*             # Componente raíz
│   │   ├── app.module.ts               # Módulo principal
│   │   ├── Login/                      # Página de login
│   │   │   ├── login.page.html
│   │   │   ├── login.page.ts
│   │   │   ├── login.page.scss
│   │   │   └── login.module.ts
│   │   ├── Fotos/                      # Página de productos
│   │   │   ├── fotos.page.html
│   │   │   ├── fotos.page.ts
│   │   │   ├── fotos.page.scss
│   │   │   └── fotos.module.ts
│   │   ├── Carrito/                    # Página del carrito
│   │   │   ├── Cart.page.html
│   │   │   ├── Cart.page.ts
│   │   │   ├── Cart.page.scss
│   │   │   └── Cart.module.ts
│   │   ├── tabs/                       # Navegación por tabs
│   │   │   ├── tabs.page.html
│   │   │   ├── tabs.page.ts
│   │   │   └── tabs-routing.module.ts
│   │   ├── services/                   # Servicios de la aplicación
│   │   │   ├── auth.service.ts         # Autenticación
│   │   │   ├── auth.guard.ts           # Protección de rutas
│   │   │   ├── product.service.ts      # Gestión de productos
│   │   │   ├── cart.service.ts         # Gestión del carrito
│   │   │   └── foto.ts                 # Servicio de fotos (cámara)
│   │   └── models/                     # Interfaces y tipos
│   ├── assets/                         # Recursos estáticos
│   ├── environments/                   # Configuración por entorno
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── theme/                          # Tema global
├── capacitor.config.ts                 # Configuración de Capacitor
├── ionic.config.json                   # Configuración de Ionic
├── firebase.json                       # Configuración de Firebase
└── package.json                        # Dependencias
```

## 🔧 Servicios y API

### AuthService
- `loginWithEmail(email, password)`: Inicio de sesión
- `registerWithEmail(email, password)`: Registro de usuario
- `loginWithGoogle()`: Login con Google
- `resetPassword(email)`: Restablecer contraseña
- `logout()`: Cerrar sesión
- `getCurrentUser()`: Usuario actual (Observable)
- `isLoggedIn()`: Verificar sesión activa

### ProductService
- `getProducts()`: Obtener todos los productos
- `addProduct(product)`: Agregar producto (usuario autenticado)
- `deleteProduct(id)`: Eliminar producto (solo propietario)

### CartService
- `addToCart(product)`: Agregar al carrito
- `removeFromCart(product)`: Remover del carrito
- `getCart()`: Obtener carrito actual
- `clearCart()`: Vaciar carrito
- `getTotal()`: Calcular total

## 🧪 Testing

### Ejecutar Tests
```bash
npm test
```

### Ejecutar Linter
```bash
npm run lint
```

## 🚀 Despliegue

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Capacitor (Apps Móviles)
```bash
ionic build --prod
npx cap sync
npx cap open android  # o ios
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Fernando Sandoval García**: Estudiante de la Fundación Universitaria UCompensar - Semestre 7 - Desarrollo de Apps Híbridas

