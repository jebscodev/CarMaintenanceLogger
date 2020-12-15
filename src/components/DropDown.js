import React from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = (props) => {
    return(
        <DropDownPicker
            items={props.data}
            defaultValue={props.default}
            onChangeItem={props.onChange}
            containerStyle={{height: 40}}
            style={styles.main}
            itemStyle={styles.item}
            dropDownStyle={styles.dropDown}
        />
    );
};

const styles = StyleSheet.create({
    main: {backgroundColor: '#fff'},
    item: {justifyContent: 'flex-start'},
    dropDown: {
        backgroundColor: '#fff',
        elevation: 8,
    }
});

export default DropDown;