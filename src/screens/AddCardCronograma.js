import React, { Component } from 'react'
import { Button, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import { SCHEDULE_CARDS_EDIT } from '../screens'

const items = [
  // this is the parent or 'item'
  {
    name: 'Seleccionar Tarjetas',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        id: 1,
        name: "AROS",
        description: "Estructura de 1,5 metros de alto, con aro de red en la parte superior que permite embocar pelotas (tanto desde arriba como abajo del caballo).",
        audio: "Aros.ogg",
        image: "aros"
      },
      {
        id: 2,
        name: "ARREADOR",
        description: " - ",
        audio: "Arreador.ogg",
        image: "arreador"
      },
      {
        id: 3,
        name: "BAJO MONTURA",
        description: " - ",
        audio: "Bajo Montura.ogg",
        image: "bajomontura"
      },
      {
        id: 4,
        name: "BANDERA",
        description: " - ",
        audio: "Bandera.ogg",
        image: "bandera"
      },
      {
        id: 5,
        name: "BOZAL",
        description: " - ",
        audio: "Bozal.ogg",
        image: "bozal"
      },
      {
        id: 6,
        name: "BROCHES",
        description: "Elemento plástico, de tamaño pequeño, que al presionar con los dedos índice y pulgar se abre y permite colgarlo (por ejemplo a las crines del caballo), o enganchar hojas, telas.",
        audio: "Broches.ogg",
        image: "broches"
      },
      {
        id: 7,
        name: "CABALLO",
        description: "El caballo (Yeguaivan) es un mamífero perisodáctilo domesticado de la familia de los équidos.",
        audio: "Caballo.ogg",
        image: "caballo"
      },
      {
        id: 8,
        name: "CABEZADA",
        description: " - ",
        audio: "Cabezada.ogg",
        image: "cabezada"
      },
      {
        id: 9,
        name: "CASCO",
        description: " - ",
        audio: "Casco.ogg",
        image: "casco"
      },
      {
        id: 10,
        name: "CEPILLO",
        description: " - ",
        audio: "Cepillo.ogg",
        image: "cepillo"
      },
      {
        id: 11,
        name: "CONOS",
        description: " - ",
        audio: "Conos.ogg",
        image: "conos"
      },
      {
        id: 12,
        name: "CUERDA",
        description: " - ",
        audio: "Cuerda.ogg",
        image: "cuerda"
      },
      {
        id: 13,
        name: "ESCARBA VASOS",
        description: " - ",
        audio: "Escarba Vasos.ogg",
        image: "escarbavasos"
      },
      {
        id: 14,
        name: "FUSTA",
        description: " - ",
        audio: "Fusta.ogg",
        image: "fusta"
      },
      {
        id: 15,
        name: "LIMPIEZA",
        description: " - ",
        audio: "Limpieza.ogg",
        image: "limpieza"
      },
      {
        id: 16,
        name: "MATRA",
        description: " - ",
        audio: "Matra.ogg",
        image: "matra"
      },
      {
        id: 17,
        name: "MONTURA",
        description: " - ",
        audio: "Montura.ogg",
        image: "montura"
      },
      {
        id: 18,
        name: "MONTURIN",
        description: " - ",
        audio: "Monturin.ogg",
        image: "monturin"
      },
      {
        id: 19,
        name: "PALENQUE",
        description: " - ",
        audio: "Palenque.ogg",
        image: "palenque"
      },
      {
        id: 20,
        name: "PASTO",
        description: " - ",
        audio: "Pasto.ogg",
        image: "pasto"
      },
      {
        id: 21,
        name: "PELOTA DE PATO",
        description: " - ",
        audio: "Pelota de Pato.ogg",
        image: "pelotadepato"
      },
      {
        id: 22,
        name: "PELOTAS",
        description: " - ",
        audio: "Pelotas.ogg",
        image: "pelotas"
      },
      {
        id: 23,
        name: "PICADERO",
        description: " - ",
        audio: "Picadero.ogg",
        image: "picadero"
      },
      {
        id: 24,
        name: "PISTA DE ADIESTRAMIENTO",
        description: " - ",
        audio: "Pista de Adiestramiento.ogg",
        image: "pistadeadiestramiento"
      },
      {
        id: 25,
        name: "RAMPA",
        description: " - ",
        audio: "Rampa.ogg",
        image: "rampa"
      },
      {
        id: 26,
        name: "RASQUETA",
        description: " - ",
        audio: "Rasqueta.ogg",
        image: "rasqueta"
      },
      {
        id: 27,
        name: "RIENDAS",
        description: " - ",
        audio: "Riendas.ogg",
        image: "riendas"
      },
      {
        id: 28,
        name: "SOMBRERITOS",
        description: " - ",
        audio: "Sombreritos.ogg",
        image: "sombreritos"
      },
      {
        id: 29,
        name: "SUDADERA",
        description: " - ",
        audio: "Sudadera.ogg",
        image: "sudadera"
      },
      {
        id: 30,
        name: "TAMBOR",
        description: " - ",
        audio: "Tambor.ogg",
        image: "tambor"
      },
      {
        id: 31,
        name: "TERMINE",
        description: " - ",
        audio: "Termine.ogg",
        image: "termine"
      },
      {
        id: 32,
        name: "TRANQUERA",
        description: " - ",
        audio: "Tranquera.ogg",
        image: "tranquera"
      },
      {
        id: 33,
        name: "VALLAS",
        description: " - ",
        audio: "Vallas.ogg",
        image: "vallas"
      },
      {
        id: 34,
        name: "ZANAHORIA",
        description: " - ",
        audio: "Zanahoria.ogg",
        image: "zanahoria"
      },
    ],
  },
  

]

export default class AddCardCronograma extends Component {
  constructor() {
    super()
    this.state = {
      selectedItems: [],
    }
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems })
  }

  SaveCardsToSort = () => {
    console.log('Guardar tarjetas:', this.state.selectedItems);
    this.props.navigation.navigate(SCHEDULE_CARDS_EDIT, {
      selectedItems: this.state.selectedItems,
    });
  }
  
  render() {
    return (
      <View>
        <SectionedMultiSelect
          items={items}
          IconRenderer={Icon}
          uniqueKey="id"
          subKey="children"
          selectText="Seleccione una tarjeta..."
          confirmText="Confirmar Selección"
          selectedText="Seleccionadas"
          searchPlaceholderText="Buscar"
          showDropDowns={false}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
        />
        <Button
          title="Agregar Tarjetas"
          onPress={this.SaveCardsToSort}
        />
      </View>
    )
  }
}