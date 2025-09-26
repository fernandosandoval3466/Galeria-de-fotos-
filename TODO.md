# TODO: Implementar lógica de login con mensaje de éxito, botón de logout y carrito de compras

## Cambios realizados:
- [x] Actualizar login.page.ts para usar ToastController en lugar de AlertController para mensajes de éxito
- [x] Agregar método showToast en login.page.ts
- [x] Cambiar mensajes de éxito a toast en onLogin, onRegister, onGoogleLogin
- [x] Actualizar tabs.page.ts para agregar lógica de autenticación
- [x] Agregar header global en tabs.page.html con botón Login/Logout
- [x] Importar dependencias necesarias (map, Observable, etc.)
- [x] Crear cart.service.ts con métodos para agregar, remover, actualizar cantidad, obtener total
- [x] Actualizar fotos.page.ts y fotos.page.html para mostrar productos con botones de agregar al carrito
- [x] Crear Cart.page.ts, Cart.page.html, Cart.module.ts, Cart-routing.module.ts
- [x] Agregar pestaña de carrito en tabs.page.html y tabs-routing.module.ts

## Próximos pasos:
- [ ] Probar el login y verificar que el toast aparezca después de login exitoso
- [ ] Verificar que el botón en el header cambie entre Login y Logout según el estado de autenticación
- [ ] Probar el logout y que redirija o actualice el estado
- [ ] Probar agregar productos al carrito y ver el carrito
- [ ] Implementar checkout si es necesario
