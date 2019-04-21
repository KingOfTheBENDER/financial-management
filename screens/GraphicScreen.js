import React, { Component } from 'react';
import { ScrollView, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit'
import {operationFetch} from '../actions/OperationAction';
import {connect} from 'react-redux';
import _ from "lodash";


const screenWidth = Dimensions.get('window').width;

class GraphicScreen extends Component{

    componentWillMount(){
        this.props.operationFetch();
    }


    render(){


        let graphicProfit=_.map(this.props.operations,'profit').map(parseFloat);
        let sumProfit=_.reduce(graphicProfit, function (memo, item) {
            return memo + item;
        }, 0);

        let graphicAmountIncome=_.map(this.props.operations,'amountIncome').map(parseFloat);
        let sumAmountIncome=_.reduce(graphicAmountIncome, function (memo, item) {
            return memo + item;
        }, 0);
        let graphicAmountOutcome=_.map(this.props.operations,'amountOutcome').map(parseFloat);
        let sumAmountOutcome=_.reduce(graphicAmountOutcome, function (memo, item) {
            return memo + item;
        }, 0);



        const data = {
            labels: ['Доход','Расход','Прибыль'],
            datasets:[{data:[sumAmountIncome,sumAmountOutcome,sumProfit,]}]
        };


        return(
            <ScrollView style={{marginTop: 50}}>
                <BarChart style={{marginLeft: 20}}
                    data={data}
                    width={screenWidth-50}
                    height={500}
                    chartConfig={chartConfig}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps=state=>{
    const operations=_.map(state.operations,(val)=>{
        return {...val};
    });

    return {operations};
};


const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2
};

export default connect(mapStateToProps,{operationFetch})(GraphicScreen);