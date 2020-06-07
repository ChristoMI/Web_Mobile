import React from 'react';
import Item from "./Item";
import {FlatList, Platform, RefreshControl, StatusBar, StyleSheet, TouchableOpacity, View} from "react-native";
import Loading from "../Common/Loading";
import Error from "../Common/Error";

const List = ({properties, refresh, openProperty}) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = async () => {
      setRefreshing(true);
      await refresh();
      setRefreshing(false);
    };
    return (
        <View style={styles.list}>
            <FlatList
                      data={properties}
                      keyExtractor={item => item.id}
                      ListFooterComponent={<View style={{height: 24}}></View>}
                      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                      renderItem={({item}) =>
                          <TouchableOpacity style={styles.item}
                                            onPress={() => openProperty(item)}>
                              <Item item={item}/>
                          </TouchableOpacity>}
            />
        </View>


    );
};

const styles = StyleSheet.create({
    list: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#E5E5E5",

    },
    item: {
        flex: 1,
        height: 140,
        marginHorizontal: 33,
        marginVertical: 18,
        shadowColor: 'rgba(0, 0, 0, 0.14)',
        elevation: Platform.OS === 'ios' ? 0 : 3,
        borderRadius: 5
    }
});

export default List;
