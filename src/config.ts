import { IAnimal } from "greenpeace";

const config: {
  animals: IAnimal[],
} = {
  animals: [{
    name: 'Puma',
    label: 'puma',
    picture: 'puma.png',
    description: 'El puma mide entre 85 a 150 cm de largo y pesa entre 34 y 105kg. Este felino tiene un pelaje suave de color uniforme, y tanto su tamaño como su coloración varían geográficamente. Los ejemplares más grandes pueden ser vistos en la Patagonia. Con sus grandes patas, logran grandes saltos y una admirable carrera corta.',
    group: 'A',
  }, {
    name: 'Yaguareté',
    label: 'yaguarete',
    picture: 'yaguarete.png',
    description: 'El yaguareté mide entre 150 y 170 cm de largo, siendo así el felino más grande de América y el tercero del mundo. Similar al leopardo, el jaguareté comparte un pelaje de color amarillo y el bayo fuerte en el lomo. Sin embargo, es de mayor tamaño, con la cola más corta y la cabeza más robusta.',
    group: 'A',
  }, {
    name: 'Ballena Franca Austral',
    label: 'ballena_franca',
    picture: 'ballena_franca.png',
    description: 'La ballena franca austral es un cetáseo de un peso medio de 40 toneladas. Miden de 13 a 15 metros de longitud en caso de los machos y 16 en las hembras. Tienen barbas en el interior de la boca, fundamentales para su alimentación a base de zooplancton. Viven en el hemisferio sur, localizándose en aguas frías, y realizan dos tipos de migraciones: por alimentación o con fines reproductivos.',
    group: 'B',
  }, {
    name: 'Orca',
    label: 'orca',
    picture: 'orca.png',
    description: 'La orca suele habitar en diversos mares alrededor del mundo. Son cetáceos del género ORCINUS, del cual es la única especie existente. Pueden medir unos 10 metros. Pueden comer ballenas, tiburones, tortugas marinas, focas, atunes y salmones entre otros. Una hembra lidera la manada y pueden llegar a vivir más de 100 años.',
    group: 'B',  
  }, {
    name: 'Pinguino de Magallanes',
    label: 'pinguino',
    picture: 'pinguino.png',
    description: 'Con un peso de 6kg en adultos, miden casi 50 cm de alto y machos y hembras se ven iguales. Ambos padres crían al pichón. Se estiman 1.100.000 parejas reproductivas, aunque se vieron disminuciones sostenidas en la reproducción debido a la extracción off-shore de petróleo y su transfporte que ponen en peligro a la especie. También la actividad pesquera y el cambio climático colaboran con ello. Migran durante el invierno (estación no reproductiva) hacia la provincia de Buenos aires, Uruguay y el sur de Brasil.',
    group: 'C',
  }, {
    name: 'Tatú Carreta',
    label: 'tatu_carreta',
    picture: 'tatu_carreta.png',
    description: 'El Tatú Carreta es el armadillo más grande. Tiene fuertes extremidades y presenta uñas largas que usa para realizar cuevas con gran velocidad. Las hembras suelen parir entre una y dos crías en las cámaras subterráneas cavadas por ellas mismas. Los tatús solo salen de sus cuevas para alimentarse o buscar parejas.',
    group: 'C',
  }, {
    name: 'Ñandú',
    label: 'nandu',
    picture: 'nandu.png',
    description: 'Suelen encontrarse en grupos de 10 a 100 individuos. El macho construye el nido en el suelo, escondido entre la flora, donde varias hembras depositan sus huevos. Éstos pueden pesar hasta 600 gramos. Su alimentación es vegetariana y a pesar de tener plumas no vuela pero es un buen corredor. Puede superar los 60 km/h.',
    group: 'D',
  }, {
    name: 'Corzuela',
    label: 'corzuela',
    picture: 'corzuela.png',
    description: 'La corzuela colorada alcanza una altura aproximada de 65 a 75 a la cruz, y hasta 140 cm de longitud. El adulto pesa entre 20 a 30 kg. El lomo tiene un aspecto ligeramente encorvado y el anca es visiblemente alta en comparación con los hombros. En ambos sexos el color es pardorojizo a pardogrisáceo y posee una coloración más clara en la parte inferior de la mandíbula, pecho, vientre y zona perineal. A partir del año de vida los machos desarrollan un par de cuernos simples, cortos, rectos y dirigidos hacia atrás.',
    group: 'D',
  }, {
    name: 'Carpincho',
    label: 'carpincho',
    picture: 'caprincho.png',
    description: 'El carpincho es el roedor más grande del mundo y se encuentran cerca de estanques, lagos, arroyos, ríos y pantanos en Sudamérica. Suelen vivir en grupos de 10 o veinte. También, tienen una piel muy gruesa para poder soportar el frío acuático, ya que suelen pasar mucho de su tiempo adentro del agua.',
    group: 'E',
  }, {
    name: 'Tucán Toco',
    label: 'tucan_toco',
    picture: 'tucan_toco.png',
    description: 'Tiene un plumaje muy llamativo con el cuerpo muy negro, garganta muy blanca y un anillo ocular muy azul. La característica más destacable es su enorme pico amarillo con una mancha negra, el cual pese a parecer pesado es increíblemente ligero dado que su interior es prácticamente hueco. La esperanza de vida del tucán toco es entre 10 y 15 años.',
    group: 'E',
  }]
};

export default config;
