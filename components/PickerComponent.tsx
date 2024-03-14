import { Image } from "react-native";
import { Text, TextProps, View } from "./Themed";
import { MutableRefObject, useRef } from "react";
import { Picker } from "@react-native-picker/picker";

type Props = {
  pickerValue: string;
  setPickerValue: React.Dispatch<React.SetStateAction<any>>;
  labels: string[];
  pickerRef: MutableRefObject<any>;
};

export function PickerComponent(props: Props) {
  return (
    <Picker
      ref={props.pickerRef}
      selectedValue={props.pickerValue}
      onValueChange={(itemValue, itemIndex) => props.setPickerValue(itemValue)}
    >
      {props.labels.map((l, i) => {
        return <Picker.Item key={`${i}-picker-${l}`} label={l} value={l} />;
        // <Picker.Item label="Action" value="action" />
      })}
    </Picker>
  );
}
