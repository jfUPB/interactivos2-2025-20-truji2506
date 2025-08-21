# Unidad 3


## 🤔 Fase: Reflect

### Actividad 4

### Arquitectura y flujo de datos: explica el flujo completo de datos desde que un cliente móvil envía información hasta que llega a la aplicación de visuales, incluyendo cómo implementaste la máquina de estados. ¿Cuál es el rol de cada componente en tu sistema?

En nuestro caso el mobile actua de control remoto y envia mensajes al servidor del socket.IO, este lo distribuye en tiempo real a la app de visuales en el PC, alli la maquina de estados interpreta el mensaje y actualiza la visualización, que toman como rol, mobile = input, servidor = process y pc = outputs

### Retos técnicos y aprendizajes: ¿Cuál fue la parte más desafiante de la implementación y cómo resolviste un problema técnico específico? ¿Cómo ha evolucionado tu comprensión de los sistemas distribuidos?

El problema estaba en separar los sketches según su función los resolvimos asignando roles claro, Aprendi que en sistemas distribuidos lo importante es el flujo de mensajes y la sincronización entre nodos, además las observaciones que nos dio el profesor con respecto a la actividad es que nos falta 3 en los 3 estados, los 3 parametros.

### Conexión teoría-práctica: ¿Cómo se reflejó el marco Input-Process-Output en tu arquitectura técnica y de qué manera tu implementación habilita la “agencia distribuida” de Future Narratives? ¿Tu infraestructura está preparada para las visuales generativas de la siguiente unidad?

Se refleja el Input-Process-Output: móvil = input, servidor = process, PC = output, la agencia distribuida aparece porque varios usuarios pueden influir en las visuales, la infraestructura ya está lista para integrar visuales generativas mas complejas en la siguiente unidad.

### Actividad 5

### Actividad 6

