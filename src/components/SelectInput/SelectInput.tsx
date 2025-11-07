import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Modal, ScrollView, Text, LayoutRectangle } from 'react-native';
import { TextInput } from 'react-native-paper';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
  const inputRef = useRef<View>(null);

  const handleSelect = (option: SelectInputOption) => {
    onChange(option);
    setModalVisible(false);
  };

  const openMenu = () => {
    if (inputRef.current) {
      inputRef.current.measureInWindow((x, y, width, height) => {
        setMenuPosition({
          top: y,
          left: x,
          width: width,
        });
        setModalVisible(true);
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openMenu} ref={inputRef}>
        <TextInput
          mode="outlined"
          label={label}
          placeholder={placeholder}
          value={value?.label || ''}
          right={<TextInput.Icon icon="menu-down" />}
          editable={false}
          showSoftInputOnFocus={false}
          error={!!error}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.menu,
              {
                top: menuPosition.top,
                left: menuPosition.left,
                width: menuPosition.width,
              },
            ]}
          >
            <ScrollView>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={
                    typeof option.value === 'string' || typeof option.value === 'number'
                      ? option.value
                      : `${option.label}-${index}`
                  }
                  onPress={() => handleSelect(option)}
                  style={styles.menuItem}
                >
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
