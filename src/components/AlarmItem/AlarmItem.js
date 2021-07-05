import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  Switch,
  View,
  Keyboard,
} from 'react-native';
import styles from './styles';

const AlarmItem = ({
  id, date, time, description, isActive, handlers,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [descriptionText, setDescriptionText] = useState(description);

  const { activeChangedHandler, descriptionChangedHandler, timeChangePress } = handlers;

  const saveHandler = () => {
    setIsEditing(false);
    descriptionChangedHandler(id, date, descriptionText);
    Keyboard.dismiss();
  };

  const cancelHandler = () => {
    setIsEditing(false);
    setDescriptionText(description);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.alarmContainer}>
        <Pressable
          style={styles.timeWrapper}
          onPress={() => { timeChangePress(id, date); }}
        >
          <Text style={styles.timeText}>
            {time}
          </Text>
        </Pressable>
        <Switch
          value={isActive}
          onValueChange={(value) => { activeChangedHandler(id, date, value); }}
        />
      </View>

      <View style={styles.descriptionWrapper}>
        <TextInput
          style={styles.descriptionText}
          defaultValue={descriptionText}
          onChangeText={setDescriptionText}
          onFocus={() => { setIsEditing(true); }}
          placeholder="Press to add description..."
        />
      </View>

      {isEditing && (
      <View style={styles.editButtonsContainer}>
        <Pressable
          style={[styles.editButtons, styles.cancelButton]}
          onPress={cancelHandler}
        >
          <Text style={styles.buttonsText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.editButtons, styles.saveButton]}
          onPress={saveHandler}
        >
          <Text style={styles.buttonsText}>Save</Text>
        </Pressable>
      </View>
      )}
    </View>
  );
};

export default AlarmItem;
