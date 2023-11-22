import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const items = [
  // this is the parent or 'item'
  {
    name: 'Tarjetas',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Caballo',
        id: 10,
      },
      {
        name: 'Montura',
        id: 17,
      },
      {
        name: 'Bajo Montura',
        id: 13,
      },
      {
        name: 'Aros',
        id: 14,
      },
      {
        name: 'Arrador',
        id: 15,
      },
      {
        name: 'Bandera',
        id: 16,
      },
    ],
  },
  

];

export default class AddCardCronograma extends Component {
    constructor() {
      super();
      this.state = {
        selectedItems: [],
      };
    }
    onSelectedItemsChange = (selectedItems) => {
      this.setState({ selectedItems });
    };
  
    render() {
      return (
        <View>
          <SectionedMultiSelect
            items={items}
            IconRenderer={Icon}
            uniqueKey="id"
            subKey="children"
            selectText="Seleccione una tarjeta..."
            confirmText="Confirmar"
            selectedText="Seleccionadas"
            searchPlaceholderText="Buscar"
            showDropDowns={true}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedItems}
          />
        </View>
      );
    }
  }