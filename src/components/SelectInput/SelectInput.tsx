import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { TextInput, Menu } from 'react-native-paper';
import { styles } from './styles';

export interface SelectInputOption {
  label: string;
  value: any;
}

interface SelectInputProps {
  label: string;
  placeholder: string;
  options: SelectInputOption[];
  value: SelectInputOption | null;
  onChange: (option: SelectInputOption | null) => void;
  error?: string;
}

export function SelectInput({
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
}: SelectInputProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const inputRef = useRef();

  const showMenu = () => {
    // onChange(null);
    setMenuVisible(true);
  };

  const hideMenu = () => {
    setMenuVisible(false);
    inputRef.current?.blur();
  };

  const handleSelect = (option: SelectInputOption) => {
    onChange(option);
    hideMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={menuVisible}
        anchor={
          <TextInput
            mode="outlined"
            label={label}
            placeholder={placeholder}
            value={value?.label || ''}
            right={<TextInput.Icon icon="menu-down" />}
            onFocus={showMenu}
            showSoftInputOnFocus={false}
            ref={inputRef}
          />
        }
        style={styles.menu}
        contentStyle={styles.menuContent}
      >
        {options.map((option) => (
          <Menu.Item key={option.label} onPress={() => handleSelect(option)} title={option.label} />
        ))}
      </Menu>
    </View>
  );
}
