import _ from 'lodash';
import React, { Component } from 'react';
import {Text, StyleSheet, ScrollView,View} from 'react-native';
import { Table, Row, Cols } from 'react-native-table-component';
import {operationFetch} from '../actions/OperationAction';
import {connect} from 'react-redux';
import { Button } from 'react-native-elements';


class TableScreen extends Component{

    componentWillMount(){
        this.props.operationFetch();
    }

    componentWillReceiveProps(nextProps){
        this.constructor(nextProps);
    }


    constructor(props) {

        const elementButton = (value) => (
            <Button
                title={value}
                type='clear'
                titleStyle={{fontSize:14}}
                onPress={this.onButtonPress}
            />
        );

        super(props);
        this.state = {
            tableHead: [elementButton('Дата'),elementButton('Прибыль'), elementButton('Приход'), elementButton('Расход')],
            tableData: [
                _.map(this.props.operations,'dateTime'),
                _.map(this.props.operations,'profit'),
                _.map(this.props.operations,'amountIncome'),
                _.map(this.props.operations,'amountOutcome'),
            ],
        }

    }

    onButtonPress=()=>{

    };


    render() {
        const heightArr=[];
        for (let i = 0; i < this.props.operations.length; i += 1) {
            heightArr.push(30);
        }

        let sumProfit=_.reduce(this.state.tableData[1].map(parseFloat), function (memo, item) {
            return memo + item;
        }, 0);
        let sumAmountIncome=_.reduce(this.state.tableData[2].map(parseFloat), function (memo, item) {
            return memo + item;
        }, 0);
        let sumAmountOutcome=_.reduce(this.state.tableData[3].map(parseFloat), function (memo, item) {
            return memo + item;
        }, 0);


        return (
            <ScrollView style={styles.container}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                    <Cols  data={this.state.tableData}
                           heightArr={heightArr}
                           textStyle={styles.text}
                    />
                </Table>
                <View style={{marginTop: 10}}>
                    <Text style={styles.text}>Сумма прибыли:{sumProfit}</Text>
                    <Text style={styles.text}>Сумма прихода:{sumAmountIncome}</Text>
                    <Text style={styles.text}>Сумма расхода:{sumAmountOutcome}</Text>
                </View>
            </ScrollView>
        )

    }

}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 3 }
});

const mapStateToProps=state=>{
    const operations=_.map(state.operations,(val)=>{
        return {...val};
    });

    return {operations};
};


export default connect(mapStateToProps,{operationFetch}) (TableScreen);
