import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import Colors from "../common/Colors";
import GoalManager from "../managers/GoalManager";
import DateUtils from "../utils/DateUtils";

class CalendarDayElement extends React.Component {
    key = 0;

    constructor(props) {
        super(props);
        let day = DateUtils.formattedStringToDate(props.date).getDate();
        this.state = {
            date: props.date,
            day,
            successGoalIdList: props.successGoalIdList
        };
        console.log(`CalendarDayElement.constructor: date="${props.date}"`);
    }

    render() {
        return (
            <TouchableOpacity style={styles.calendarRowItem} onPress={() => { this.props.onPress(this.props.date) }}>
                <View style={[styles.calendarRowItemContainer, this.props.selected ? styles.selectedContainer : null]}>
                    <Text style={[
                        styles.dayText,
                        this.props.selected ? styles.selectedText : null,
                        this.props.today ? styles.todayText : null
                    ]}>
                        {this.state.day}
                    </Text>
                    <View style={styles.markContainer}>
                        {
                            this.state.successGoalIdList.map(
                                (goalId, index) =>
                                    <View
                                        key={this.key++}
                                        style={{
                                            ...styles.mark,
                                            backgroundColor: GoalManager.getGoalById(goalId).getMainColor(),
                                            marginRight: index < this.state.successGoalIdList.length - 1 ? 3 : 0
                                        }}></View>

                            )
                        }
                    </View>
                </View>
            </TouchableOpacity >
        );
    }

    static rootStyle() {
        return styles.calendarRowItem;
    }
}

const styles = StyleSheet.create({
    calendarRowItem: {
        flex: 1,
        textAlign: "center",
    },
    calendarRowItemContainer: {
        width: 36,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        paddingTop: 5,
        paddingHorizontal: 6,
        paddingBottom: 17
    },
    dayText: {
        fontSize: 16,
        marginBottom: 3
    },
    selectedContainer: {
        backgroundColor: Colors.primary02,
        borderRadius: 10,
    },
    selectedText: {
    },
    todayText: {
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    markContainer: {
        height: 5,
        flexDirection: "row",
    },
    mark: {
        width: 5,
        height: 5,
        borderRadius: 100,
    }
});

export default CalendarDayElement;