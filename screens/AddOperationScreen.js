import React, { Component } from 'react';
import { View,Text} from 'react-native';
import {connect} from 'react-redux';
import { Button, Input } from 'react-native-elements';
import {operationCreate,operationUpdate} from "../actions/OperationAction";
import MyDatePicker from '../components/DataPicker'

class AddOperationScreen extends Component{



    onButtonPress=()=>{
        if(this.props.dateTime!==undefined && !isNaN(this.props.amountIncome)&&!isNaN(this.props.amountOutcome) &&!isNaN(this.props.profit) ) {
            const {dateTime, amountIncome, amountOutcome, profit} = this.props;
            this.props.operationCreate({dateTime, amountIncome, amountOutcome, profit});
            this.props.navigation.navigate('operation');
        }
    }

    render(){
        return(
            <View>
                <View style={{marginLeft: 10,marginBottom: 10}}>
                    <Text style={{marginBottom: 10,fontSize:16,color:'#86939e',fontWeight:'bold'}}>Дата</Text>
                    <MyDatePicker
                        {...this.props}
                    />
                </View>
                <Input
                    label="Приход денег"
                    value={this.props.amountIncome}
                    keyboardType='numbers-and-punctuation'
                    onChangeText={value=>this.props.operationUpdate({prop:'amountIncome',value})}
                />
                <Input
                    label="Расход денег"
                    value={this.props.amountOutcome}
                    keyboardType='numbers-and-punctuation'
                    onChangeText={value=>this.props.operationUpdate({prop:'amountOutcome',value})}
                />
                <Input
                    label="Прибыль"
                    value={this.props.profit}
                    keyboardType='numbers-and-punctuation'
                    onChangeText={value=>this.props.operationUpdate({prop:'profit',value})}
                />
                <View style={{marginTop: 10}}>
                    <Button
                        title='Сохранить'
                        onPress={this.onButtonPress}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps=state=>{
    return{
        dateTime:state.operationForm.dateTime,
        amountIncome:state.operationForm.amountIncome,
        amountOutcome:state.operationForm.amountOutcome,
        profit:state.operationForm.profit
    }
};


export default connect(mapStateToProps,{operationCreate,operationUpdate})(AddOperationScreen);