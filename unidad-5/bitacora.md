## Evidencia 1: concepto de visuales en vivo

> 1.	Estructura Escénica (vista frontal, Maze Runner)  
> 
>•	Dos columnas laterales,  Material (Ladrillo), geometrías altas, sombreadas, mientras que va evolucionando el tema se va quebrando más.  
>•	Cascada central, flujo de partículas para simular caída infinita, se tiene en cuenta el "Viento" y la "Turbulencia" además la idea es que cuando llegue a los picos el tema aumente el cauce.  
>•	Parte superior antenas digitales que se van generando a medida que el público se conecta y el público pueda elegir qué tipo de color tenga en la punta de la antena.  
>   
>2.	Narrativa Temporal Sincronizada con la Canción  
>  
>Tiempo 	Visual 	Procesamiento  
>0:00 – 0:41 	•	Oscuridad inicial, cascada tenue (Azul oscuro)  
>•	Columnas apenas visibles  
>•	El público generando antenas 	Ruido bajo en partículas, densidad controlada. FFT → mínima actividad.  
>0:41 – 1:17 	•	Cascada empieza a tener mayor caudal  
>•	Columnas se hacen más visibles  
>•	Ya el público conectado "Antenas" 	FFT medios → velocidad de caída ↑. Columnas iluminadas desde atrás.  
>1:17 – 1:47 	•	Cascada cambia de color (Azul más claro)  
>•	Ya habría mayor luz en el ambiente  
>•	Las columnas tienen toda la luz, y empieza a quebrace de una forma leve  	Envelope CHOP modula intensidad.  
>1:47 – 2:22 	•	Cascada muy densa, color azul casi transparente, cae el agua al piso como si fueran chispas  
>•	Las columnas empiezan a quebrarse más como si se fuera a salir el caudal del agua   
>•	Las antenas se mueven de una forma vertical, con las ondas sonoras  	Graves ↑ densidad, agudos ↑ chispas.   
>2:22 – 3:10 	•	Cascada multicolor con la colorimetría de las estaciones del año   
>•	Las columnas se evidencian desgastadas y muy quebradas  
>•	Las antenas pierden tamaño  	Script DAT decide estación activa (visualista controla con slider).   
>3:10 – 3:51 	•	La cascada vuelve a su estado inicial con su color predeterminado   
>•	Las columnas quedan igual que en climax    
>•	Las antenas van aumentando tu tamaño hasta el final del tema 	FFT agudos → partículas ascienden.   
>   
>Fase 1:  
>Génesis (0:00 – 1:17)   
>Sensación: Misterio, surgimiento, expectativa.   
>Inputs   
>•	Audio: FFT bajos y medios muy suaves.    
>•	Público: primeras conexiones → generan antenas digitales.    
>•	Visualista: setea estado inicial (oscuridad + cascada tenue).   
>   
>Process   
>•	FFT bajos → controlan densidad mínima de partículas en cascada.  
>•	FFT medios → ligeros brillos en columnas.  
>•	Conexiones vía socket.io → instancing de antenas.  
>•	Noise muy bajo en columnas para apenas dar textura.   
>   
>Outputs   
>•	Cascada tenue en azul oscuro.  
>•	Columnas apenas visibles (siluetas).  
>•	Antenas comienzan a aparecer con colores seleccionados por el público.  
>•	Atmósfera oscura, expectativa creciente.  
>   
>   
>Fase 2:  
>Clímax y Ruptura (1:17 – 2:22)  
>Sensación: Explosión de energía, caos controlado, quiebre estructural.  
>Inputs  
>•	Audio: FFT graves (densidad), FFT agudos (chispas), Envelope CHOP (intensidad global).  
>•	Público: antenas ya generadas, vibran con la música.  
>•	Visualista: puede disparar efectos de fractura más intensos.  
> 
>Process  
>  
>•	Graves - Más caudal de cascada (más partículas y velocidad).  
>•	Agudos -  Aparición de chispas al pie de la cascada.  
>•	Envelope CHOP - modula brillo global.  
>•	Noise TOP - Displace TOP en columnas, fracturas dinámicas.  
>•	Antenas - vibración vertical sincronizada con ondas sonoras.  
>  
>Outputs  
>•	Cascada muy densa y clara, con chispas impactando el suelo.  
>•	Columnas iluminadas, agrietadas, fracturándose progresivamente.  
>•	Antenas vibrando, respondiendo directamente al ritmo.  
>•	Escena cargada, sensación de desbordamiento.  
> 
> 
>Fase 3:  
>Resolución y Transformación (2:22 – 3:51)  
>Sensación: Catarsis, transformación, cierre.  
>Inputs  
>•	Audio: FFT agudos dominantes (ascenso), Script DAT para colorimetría (estaciones).  
>•	Público: antenas reducidas, vuelven a crecer en cierre.  
>•	Visualista: controla el cambio de paleta estacional.  
>  
>Process  
>•	Script DAT - Cambia paleta cromática de la cascada según estación (invierno, primavera, verano, otoño).  
>•	FFT agudos - Partículas ascienden en cascada (reverse flow).  
>•	Noise más intenso en columnas - Desgaste visual.  
>•	LFO + FFT - Escalado progresivo de antenas.  
> 
>Outputs  
>•	Cascada multicolor (ciclo de estaciones), luego regresa al azul inicial.  
>•	Columnas desgastadas, fracturadas, marcadas por el paso del agua.  
>•	Antenas reducidas, crecen al cierre, formando un skyline digital.  
>•	Escena final: sensación de que todo ha cambiado, cierre poético  
>  
>
> Ideación en clase:
> <img width="1600" height="900" alt="image" src="https://github.com/user-attachments/assets/862d0b16-a4cf-4b7b-9056-af689eff29da" />



## Evidencia 2: diseño de inputs de clientes

> Diagrama de red:  
> <img width="1012" height="571" alt="image" src="https://github.com/user-attachments/assets/29fa045d-d426-4a73-8cbe-863171f203f7" />

## Evidencia 3: código del proyecto

[ ] Marca esta casilla con una "x" cuando hayas subido el código completo a la carpeta proyecto 
de este repositorio.

### Evidencia 4: video demo del sistema funcionando

[ESTE ES MI DEMO](https://www.youtube.com/watch?v=HQWNMD-YU44)

### Evidencia 5: interpretación en tiempo real

[ ] Esta casilla la marcará el profesor cuando realices la interpretación en tiempo real.










